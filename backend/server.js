const express = require('express');
const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv');
const mysql = require('mysql2');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from frontend/dist
const staticPath = path.join(__dirname, '../frontend/dist');
app.use(express.static(staticPath));

// MySQL connection configuration
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'chaind_db'
};

// Create MySQL connection pool
const pool = mysql.createPool(dbConfig);

// Test database connection
pool.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err.message);
    console.log('Server will continue but database operations will fail.');
  } else {
    console.log('Successfully connected to MySQL database');
    connection.release();
  }
});

// Routes

// Optionally, serve index.html for all non-API routes (SPA fallback)
app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(staticPath, 'index.html'));
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Sample API endpoint that uses database
app.get('/api/data', (req, res) => {
  pool.query('SELECT 1 + 1 AS result', (error, results) => {
    if (error) {
      return res.status(500).json({ error: 'Database query failed', details: error.message });
    }
    res.json({ data: results, message: 'Sample data from database' });
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
