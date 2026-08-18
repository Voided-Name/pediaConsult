use anyhow::{Context, Result};
use serde::{Deserialize, Serialize};
use sqlx::{
    sqlite::{SqliteConnectOptions, SqliteJournalMode, SqlitePoolOptions},
    FromRow, SqlitePool,
};
use std::{path::PathBuf, time::Duration};
use tauri::{Manager, State};

struct AppState {
    db: SqlitePool,
}

#[derive(Debug, Serialize, FromRow)]
#[serde(rename_all = "camelCase")]
struct Patient {
    id: i64,
    first_name: String,
    last_name: String,
    middle_name: Option<String>,
    date_of_birth: String,
    sex: String,
    created_at: String,
}

#[derive(Debug, Serialize, FromRow)]
#[serde(rename_all = "camelCase")]
struct Measure {
    l_value: f64,
    m_value: f64,
    s_value: f64,
}

impl Measure {
    pub fn interpolate(&self, other: &Self, t: f64) -> Self {
        dbg!(t);
        let lerp = |a: f64, b: f64| a + (t * (b - a));

        Self {
            l_value: lerp(self.l_value, other.l_value),
            m_value: lerp(self.m_value, other.m_value),
            s_value: lerp(self.s_value, other.s_value),
        }
    }
}

#[derive(Debug, Deserialize)]
#[serde(rename_all = "camelCase")]
struct CreatePatient {
    first_name: String,
    last_name: String,
    middle_name: Option<String>,
    date_of_birth: String,
    sex: String,
}

#[derive(Debug, Deserialize)]
#[serde(rename_all = "camelCase")]
struct UpdatePatient {
    first_name: String,
    last_name: String,
    middle_name: Option<String>,
    date_of_birth: String,
    sex: String,
}

async fn init_database(db_path: PathBuf) -> Result<SqlitePool> {
    let options = SqliteConnectOptions::new()
        .filename(db_path)
        .create_if_missing(true)
        .foreign_keys(true)
        .journal_mode(SqliteJournalMode::Wal)
        .busy_timeout(Duration::from_secs(5));

    let pool = SqlitePoolOptions::new()
        .max_connections(5)
        .connect_with(options)
        .await
        .context("Failed to connect to database")?;

    sqlx::migrate!("./migrations")
        .run(&pool)
        .await
        .map_err(|err| {
            eprintln!("Migration error: {err:#?}");
            err
        })
        .context("Failed to run migrations")?;

    Ok(pool)
}

async fn find_patient_by_id(db: &SqlitePool, id: i64) -> Result<Option<Patient>> {
    let patient = sqlx::query_as::<_, Patient>(
        r#"
        SELECT
            id,
            first_name,
            last_name,
            middle_name,
            date_of_birth,
            sex,
            created_at
        FROM patient
        WHERE id = ?
        "#,
    )
    .bind(id)
    .fetch_optional(db)
    .await
    .context("Failed to find patient")?;

    Ok(patient)
}

#[tauri::command]
async fn create_patient(
    state: State<'_, AppState>,
    patient: CreatePatient,
) -> Result<Patient, String> {
    let result = sqlx::query(
        r#"
        INSERT INTO patient(
            first_name,
            last_name,
            middle_name,
            date_of_birth,
            sex
        )
        VALUES (?, ?, ?, ?, ?)
        "#,
    )
    .bind(&patient.first_name)
    .bind(&patient.last_name)
    .bind(&patient.middle_name)
    .bind(&patient.date_of_birth)
    .bind(&patient.sex)
    .execute(&state.db)
    .await
    .map_err(|error| error.to_string())?;

    let id = result.last_insert_rowid();

    find_patient_by_id(&state.db, id)
        .await
        .map_err(|error| error.to_string())?
        .ok_or_else(|| "Patient was created but could not be retrieved".to_string())
}

#[tauri::command]
async fn list_patients(state: State<'_, AppState>) -> Result<Vec<Patient>, String> {
    sqlx::query_as::<_, Patient>(
        r#"
        SELECT
            id,
            first_name,
            last_name,
            middle_name,
            date_of_birth,
            sex,
            created_at
        FROM patient
        ORDER BY last_name, first_name
        "#,
    )
    .fetch_all(&state.db)
    .await
    .map_err(|error| error.to_string())
}

#[tauri::command]
async fn get_patient(state: State<'_, AppState>, id: i64) -> Result<Option<Patient>, String> {
    find_patient_by_id(&state.db, id)
        .await
        .map_err(|error| error.to_string())
}

#[tauri::command]
async fn get_z_score(
    state: State<'_, AppState>,
    indicator: String,
    x_variable: i64,
    value: f64,
    sex: String,
) -> Result<Option<f64>, String> {
    let measure = get_stat_measures(&state.db, indicator.clone(), x_variable, sex)
        .await
        .map_err(|error| format!("{error:#}"))?;

    let Some(measure) = measure else {
        return Ok(None);
    };

    dbg!(&measure);

    let z_score: f64;

    if measure.l_value == 0.0 {
        z_score = ((value / measure.m_value).ln()) / measure.s_value;
    } else {
        z_score = ((value / measure.m_value).powf(measure.l_value) - 1.0)
            / (measure.l_value * measure.s_value);
    }

    Ok(Some(z_score))
}

async fn get_stat_measures(
    db: &SqlitePool,
    indicator: String,
    x_variable: i64,
    sex: String,
) -> Result<Option<Measure>> {
    let actual_indicator: String;
    let is_months: bool;
    let measure: Option<Measure>;
    let measure_lower: Option<Measure>;
    let measure_upper: Option<Measure>;

    let (actual_indicator, is_months) = match (indicator.as_str(), x_variable) {
        ("WFA", x) if x < 1857 => (indicator.to_string(), false),
        ("HFA", x) if x < 1857 => (String::from("LHFA"), false),
        ("WFA", x) if (x as f64 / 30.4375) <= 120.0 => ("WFAMonth".to_string(), true),
        ("HFA", x) if (x as f64 / 30.4375) <= 228.0 => ("HFAMonth".to_string(), true),
        _ => return Ok(None),
    };

    if is_months {
        let x_variable_months = (x_variable as f64) / 30.4375;
        let x_variable_lower = x_variable_months.floor();
        let x_variable_higher = x_variable_months.ceil();

        println!("Months Old: {}", x_variable_months);

        measure_lower = sqlx::query_as::<_, Measure>(
            r#"
        SELECT
            l_value,
            m_value,
            s_value
        FROM growth_reference
        WHERE
        indicator = ?
        AND
        x_variable = ?
        AND
        sex = ?
        "#,
        )
        .bind(&actual_indicator)
        .bind(&x_variable_lower)
        .bind(&sex)
        .fetch_optional(db)
        .await
        .context("Failed to find z_score")?;

        measure_upper = sqlx::query_as::<_, Measure>(
            r#"
        SELECT
            l_value,
            m_value,
            s_value
        FROM growth_reference
        WHERE
        indicator = ?
        AND
        x_variable = ?
        AND
        sex = ?
        "#,
        )
        .bind(&actual_indicator)
        .bind(&x_variable_higher)
        .bind(&sex)
        .fetch_optional(db)
        .await
        .context("Failed to find z_score")?;

        dbg!(&measure_lower);
        dbg!(&measure_upper);

        measure = measure_lower
            .zip(measure_upper)
            .map(|(lower, upper)| lower.interpolate(&upper, x_variable_months - x_variable_lower))
    } else {
        measure = sqlx::query_as::<_, Measure>(
            r#"
        SELECT
            l_value,
            m_value,
            s_value
        FROM growth_reference
        WHERE
        indicator = ?
        AND
        x_variable = ?
        AND
        sex = ?
        "#,
        )
        .bind(&actual_indicator)
        .bind(&x_variable)
        .bind(&sex)
        .fetch_optional(db)
        .await
        .context("Failed to find z_score")?;
    }

    Ok(measure)
}

#[tauri::command]
async fn update_patient(
    state: State<'_, AppState>,
    id: i64,
    patient: UpdatePatient,
) -> Result<Option<Patient>, String> {
    let result = sqlx::query(
        r#"
        UPDATE patient
        SET
            first_name = ?
            last_name = ?
            middle_name = ?
            date_of_birth = ?
            sex = ?
        "#,
    )
    .bind(&patient.first_name)
    .bind(&patient.last_name)
    .bind(&patient.middle_name)
    .bind(&patient.date_of_birth)
    .bind(&patient.sex)
    .execute(&state.db)
    .await
    .map_err(|error| error.to_string())?;

    if result.rows_affected() == 0 {
        return Ok(None);
    }

    find_patient_by_id(&state.db, id)
        .await
        .map_err(|error| error.to_string())
}

#[tauri::command]
async fn delete_patient(state: State<'_, AppState>, id: i64) -> Result<bool, String> {
    let result = sqlx::query(
        r#"
        DELETE FROM patient
        WHERE id = ?
        "#,
    )
    .bind(id)
    .execute(&state.db)
    .await
    .map_err(|error| error.to_string())?;

    Ok(result.rows_affected() > 0)
}

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .setup(|app| {
            let app_data_dir = app.path().app_data_dir()?;

            std::fs::create_dir_all(&app_data_dir)?;

            let db_path = app_data_dir.join("pediaconsult.db");

            println!("Database path: {}", db_path.display());

            let pool = tauri::async_runtime::block_on(init_database(db_path))?;

            app.manage(AppState { db: pool });

            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            greet,
            create_patient,
            list_patients,
            get_patient,
            update_patient,
            delete_patient,
            get_z_score
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
