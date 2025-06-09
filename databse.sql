CREATE TABLE
    users (
        id SERIAL PRIMARY KEY,
        name VARCHAR,
        email VARCHAR UNIQUE,
        password TEXT,
        role VARCHAR,
        created_at TIMESTAMP DEFAULT NOW ()
    );

CREATE TABLE
    appointments (
        id SERIAL PRIMARY KEY,
        student_id INTEGER REFERENCES users (id),
        teacher_id INTEGER REFERENCES users (id),
        appointment_time TIMESTAMP,
        status VARCHAR CHECK (status IN ('pending', 'approved', 'rejected')) DEFAULT 'pending',
        message TEXT,
        created_at TIMESTAMP DEFAULT NOW ()
    )
CREATE TABLE
    availability (
        id SERIAL PRIMARY KEY,
        teacher_id INTEGER REFERENCES users (id),
        available_from TIMESTAMP,
        available_to TIMESTAMP
    )