use chrono::{Datelike, Months, NaiveDate};

#[derive(Debug, PartialEq, Eq)]
pub struct Age {
    years: u32,
    months: u32,
    days: i64,
}

pub fn age_between(from: NaiveDate, to: NaiveDate) -> Option<Age> {
    if to < from {
        return None;
    }

    // Initial number of calendar months between the Y/M components.
    let mut total_months = (to.year() - from.year()) * 12 + to.month() as i32 - from.month() as i32;

    // The day-of-month may mean the last month isn't complete yet.
    let candidate = from.checked_add_months(Months::new(total_months as u32))?;

    if candidate > to {
        total_months -= 1;
    }

    let anchor = from.checked_add_months(Months::new(total_months as u32))?;
    let days = to.signed_duration_since(anchor).num_days();

    Some(Age {
        years: (total_months / 12) as u32,
        months: (total_months % 12) as u32,
        days,
    })
}
