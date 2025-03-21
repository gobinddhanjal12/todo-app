const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.connect((err, client, release) => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
  } else {
    console.log('Successfully connected to database');
    release();
  }
});

module.exports = {
  query: (text, params) => {
    console.log('Executing query:', text, params);
    return pool.query(text, params)
      .catch(err => {
        console.error('Database query error:', err);
        throw err;
      });
  }
}; 