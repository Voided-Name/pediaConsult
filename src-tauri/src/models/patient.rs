use serde::{Deserialize, Serialize};
use sqlx::FromRow;

#[derive(Debug, Serialize, FromRow)]
#[serde(rename_all = "camelCase")]
pub struct Patient {
    pub id: i64,
    pub first_name: String,
    pub last_name: String,
    pub middle_name: Option<String>,
    pub date_of_birth: String,
    pub sex: String,
    pub created_at: String,
}

#[derive(Debug, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct CreatePatient {
    pub first_name: String,
    pub last_name: String,
    pub middle_name: Option<String>,
    pub date_of_birth: String,
    pub sex: String,
}

#[derive(Debug, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct UpdatePatient {
    pub first_name: String,
    pub last_name: String,
    pub middle_name: Option<String>,
    pub date_of_birth: String,
    pub sex: String,
}
