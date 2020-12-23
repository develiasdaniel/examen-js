const express = require('express');
const mysql = require('mysql');
const app = express();
app.use(express.json());

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'computadora',
    database: 'store'
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

app.get('/repository', (req, res) => {
    const sql = 'SELECT * FROM repository';
    connection.query(sql, (error, results) => {
        if (error) throw error;
        if (results.length > 0) {
            res.json(results);
        } else {
            res.send('Sin resultados')
        }
    });
});

app.get('/repository/:field/:value', (req, res) => {
    const field = req.params.field;
    const value = req.params.value;
    const sql = `SELECT * FROM repository where ${field}="${value}"`;
    connection.query(sql, (error, results) => {
        if (error) throw error;
        if (results.length > 0) {
            res.json(results);
        } else {
            res.send('Sin resultados')
        }
    });
});

app.post('/repository', (req, res) => {
    const sql = `INSERT INTO repository set ?`;
    const newProduct = {
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


app.put('/repository/:id', (req, res) => {
    const { id } = req.params;
    const { name, price, category, quantity } = req.body;
    const sql = `update repository set name ='${name}', price=${price},
        category='${category}', quantity=${quantity} where id=${id}`;
    connection.query(sql, error => {
        if (error) throw error;
        res.send('Producto actualizado');
    });
});


let cart = [];
app.get('/cart', (req, res) => {
    if (cart.length > 0) {
        res.json(cart);
    } else {
        res.send('No hay productos en el carrito')
    }
});


app.post('/cart', (req, res) => {
    const productToCart = {
        id_product: req.body.id_product,
        ticket: req.body.ticket,
        quantity: req.body.quantity,
    }
    cart.push(productToCart);
    res.send('Producto añadido al carrito de compras');
});


app.delete('/cart/:id_product', (req, res) => {
    const {id_product} = req.params;
    const index = cart.findIndex((element) => element.id_product == id_product);
    cart.splice(index, 1);
    res.send('Producto eliminado del carrito de compras');
});


app.post('/buy', (req, res) => {
    if (cart.length > 0) {
        const sql = `INSERT INTO orders set ?`;
        for (const product of cart) {
            connection.query(sql, product, error => {
                if (error) throw error;
            });   
        }     
        res.send('Compra hecha');   
    } else {
        res.send('No hay productos en el carrito')
    }
});


// app.delete('/repository/:id', (req, res) => {
//     const {id} = req.params;
//     const sql = `DELETE FROM repository where id=${id}`;
//     connection.query(sql, error => {
//         if (error) throw error;
//         res.send('Producto eliminado');
//     });
// });


