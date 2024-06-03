const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = 3000;


const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'my_firstdb',
  password: 'hello',
  port: 5432,
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req,res) => {
  pool.query('SELECT * FROM Employee', (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(result.rows);
  });
});



app.post('/', (req, res) => {
    const { name, employee_id, role, age } = req.body;
  
    pool.query('INSERT INTO Employee (name, employee_id, role, age) VALUES ($1, $2, $3, $4)', [name, employee_id, role, age], (err, result) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.status(201).send('Employee added successfully');
    });
});



app.delete('/:employee_id', (req, res) => {
    const { employee_id } = req.params;
  
    pool.query('DELETE FROM Employee WHERE employee_id = $1', [employee_id], (err, result) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.send('Employee deleted successfully');
    });
});
  


app.put('/:employee_id', (req, res) => {
    const { employee_id } = req.params;
    const { name, role, age } = req.body;
  
    pool.query('UPDATE Employee SET name = $1, role = $3, age = $4 WHERE employee_id = $2', [name, employee_id, role, age], (err, result) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.send('Employee updated successfully');
    });
});
  


app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});