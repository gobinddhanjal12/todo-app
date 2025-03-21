const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// Test the connection
const testConnection = async () => {
  try {
    const client = await pool.connect();
    console.log('Successfully connected to database');
    client.release();
    return true;
  } catch (err) {
    console.error('Error connecting to the database:', err.stack);
    return false;
  }
};

// Test connection on startup
testConnection();

module.exports = {
  query: (text, params) => {
    console.log('Executing query:', text, params);
    return pool.query(text, params)
      .catch(err => {
        console.error('Database query error:', err);
        throw err;
      });
  },
  testConnection
}; 