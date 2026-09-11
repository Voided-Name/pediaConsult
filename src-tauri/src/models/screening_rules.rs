use serde::Deserialize;

pub struct ScreeningRules {
    pub rules: RulesFile,
    pub year_ages: Vec<(AgeBracket, u32)>,
    pub month_ages: Vec<(AgeBracket, u32)>,
    pub day_ages: Vec<(AgeBracket, u32)>,
}

#[derive(Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct RulesFile {
    pub age_brackets: Vec<AgeBracket>,
    pub rules: Vec<Rule>,
}

#[derive(Deserialize, Debug, Clone)]
pub struct AgeBracket {
    pub id: String,
    pub label: String,
    pub age: Age,
}

#[derive(Deserialize, Debug, Clone)]
#[serde(rename_all = "camelCase")]
pub struct Age {
    pub unit: String,
    pub at: Option<u32>,
    pub min: Option<u32>,
    pub max_inclusive: Option<u32>,
    pub max_exclusive: Option<u32>,
}

#[derive(Deserialize)]
pub struct Rule {
    pub section: String,
    pub when: When,
    pub fields: Vec<Field>,
}

#[derive(Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct When {
    pub age_brackets: Vec<String>,
}

#[derive(Deserialize)]
pub struct Field {
    pub id: String,
    pub label: String,
    #[serde(rename = "type")]
    pub field_type: String,
}
