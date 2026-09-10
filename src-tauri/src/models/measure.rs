use serde::{Deserialize, Serialize};
use sqlx::FromRow;

#[derive(Debug, Serialize, FromRow)]
#[serde(rename_all = "camelCase")]
pub struct Measure {
    pub l_value: f64,
    pub m_value: f64,
    pub s_value: f64,
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
