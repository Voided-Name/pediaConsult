CREATE TABLE patient (
  id INT PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  middle_name VARCHAR(100) NULL,
  date_of_birth DATE,
  sex VARCHAR(1),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
