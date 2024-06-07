const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app =  express()
app.use(cors());
const port = 8001;

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'mskvy'
  });

  connection.connect()

app.get('/data', (req, res) =>{
    connection.query('SELECT * FROM tblclustersummery', (error, results)=>{
        if(error) throw error;
        res.json(results);
    })
})  
app.listen(port, () => {
    console.log("Listening...")
})