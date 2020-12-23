var mysql = require('mysql');
var methods = {
    connection: [],
    createConnection: function () {
        connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'computadora',
            database: 'store'
        });
    },
    conn: function () {
        connection.connect();
        console.log('exito')
    },
    queryTest: function () {
        connection.query('SELECT * FROM products', function (error, results, fields) {
            if (error)
                throw error;

            results.forEach(result => {
                console.log(result.id);
            });
        });
    },
    arrayProducts:[],
    getCatalog: connection.query('SELECT * FROM products', function (error, results, fields) {
            if (error)
                throw error;
            
            results.forEach(result => {
                console.log(result.id);
                let user = {
                    id:result.id,
                    name: result.name,
                    price:result.price,
                    category: result.category
                }
                arrayProducts.push(user);                
            });            
            console.log("1",arrayProducts);
    }),
    getProducts: function(){
        console.log("2");
        return [1,2,3];
    },
    closeconn: function(){
        connection.end();
    }
}

exports.data = methods;

 