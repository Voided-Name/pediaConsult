CREATE TABLE IF NOT EXISTS growth_reference (
    indicator VARCHAR(50)  NOT NULL,
    sex VARCHAR(1) NOT NULL,
    age_days INTEGER NOT NULL,
    l_value REAL NOT NULL,
    m_value REAL NOT NULL,
    s_value REAL NOT NULL,

    PRIMARY KEY (
        indicator,
        sex,
        age_days
    )
);

CREATE INDEX IF NOT EXISTS idx_growth_lookup ON growth_reference (
    indicator, sex, age_days
);
