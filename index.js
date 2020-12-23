const express = require('express');
const mysql = require('mysql');
const app = express();
app.use(express.json());

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'computadora',
  database : 'store'
});

connection.connect(error => {
    if (error) throw error
    console.log("connection db succesfull")
});

app.listen(3000, () => {
    console.log("el servidor esta ok");
});

app.get('/', function (req, res) {
    res.send('welcome to store')
})

app.get('/repository',(req, res) => {
    const sql = 'SELECT * FROM repository';
    connection.query(sql, (error, results) => {
        if (error) throw error; 
        if(results.length > 0){
            res.json(results);
        }else{
            res.send('Sin resultados')
        }
    });
});

app.get('/repository/:field/:value',(req, res) => {
    const field = req.params.field;
    const value = req.params.value;
    const sql = `SELECT * FROM repository where ${field}="${value}"`;
    connection.query(sql, (error, results) => {
        if (error) throw error; 
        if(results.length > 0){
            res.json(results);
        }else{
            res.send('Sin resultados')
        }
    });
});

app.post('/repository',(req, res) => {
    const sql = `INSERT INTO repository set ?`;
    const newProduct ={
        name: req.body.name,
        price: req.body.price,
        category: req.body.category,
        quantity: req.body.quantity,
    }
    connection.query(sql, newProduct, error => {
        if (error) throw error; 
        res.send('Producto creado');
    });
});


// app.put('/repository/:id',(req, res) => {
//     res.send('buscar por campo y valor')
// });


app.delete('/repository/:id',(req, res) => {
    res.send('buscar por campo y valor')
});


