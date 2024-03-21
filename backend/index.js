const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');


const app = express();
const port = process.env.PORT || 5000;


app.use(bodyParser.json());
app.use(cors());

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Adarsh@2',
  database: 'code_snippets'
});

connection.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
    return;
  }
  console.log('Connected to MySQL database');
  

  const createTableQuery = `CREATE TABLE IF NOT EXISTS snippets (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    language VARCHAR(50) NOT NULL,
    stdin TEXT,
    code TEXT NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )`;
  
  connection.query(createTableQuery, err => {
    if (err) {
      console.error('Error creating table:', err);
      return;
    }
    console.log('Table created successfully');
  });
});

app.post('/submit', (req, res) => {
    const { username, language, stdin, code } = req.body;
    
    const sql = 'INSERT INTO snippets (username, language, stdin, code, timestamp) VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)';
    const values = [username, language, stdin, code];
    
    connection.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error inserting data into MySQL database:', err);
        res.status(500).json({ error: 'Failed to submit code snippet' });
        return;
      }
      console.log('Code snippet submitted successfully');
      res.status(200).json({ message: 'Code snippet submitted successfully' });
    });
  });

app.get('/snippets', (req, res) => {
  const sql = 'SELECT * FROM snippets';
  
  connection.query(sql, (err, results) => {
    if (err) {
      console.error('Error retrieving data from MySQL database:', err);
      res.status(500).json({ error: 'Failed to retrieve code snippets' });
      return;
    }
    res.status(200).json(results);
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
