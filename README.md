# Data base 
- For the database create two tables (repository, orders), repository is the warehouse that contains each of the products and orders has the sales that have been made and each sale belongs to a specific ticket
- to create the database, you need to run the sqlDB.sql script found in the project
- For the part of subtracting the sold items create a trigger that is the following
```
CREATE TRIGGER tr_updStock AFTER INSERT ON orders
  FOR EACH ROW BEGIN
  UPDATE repository SET quantity = quantity - NEW.quantity
  WHERE repository.id = NEW.id_product;
END
```

# Api methods repository (almacen)
the actions that can be done in the repository are:
 - /repository
   (get) list all elements of the repository
 - /repository/:field/:value
   (get) filter the elements of the repository by a specific field and a value to search
 - /repository
  (post) insert a new product in repository with body as follows
```
 {
      "name": "Naranja",
      "price": 45,
      "category": "Alimentos",
      "quantity": 70
  }
```
- /repository/:id
 (put): update the fields of a product looking for its id with the body as follows
  
```
  {
      "name": "Arroz",
      "price": 18,
      "category": "Alimentos",
      "quantity": 78
    }
```

# Api methods cart (shopping cart)
- /cart
 (get) list the products contained in the shopping cart
- /cart
 (post)  add a new product to the shopping cart, you just have to add its id, and the quantity purchased, body:
 ```
{
    "id_product": 10,
    "quantity": 8
}
```
- /cart/:id_product
  (delete) remove a product from the cart by its id
- /cart/buy
  (post)  confirm the purchase and save each product in the shopping cart in the order table

# Api methods orders(sales)
- /orders
  (get) lists all the orders (sales) that have been made and shows the amount and the ticket to which they belong
- /orders/:ticket
 (get) list the products sold in a specific ticket

 # Testing
- `git clone https://github.com/develiasdaniel/examen-js`
- run script sqlDB.sql in mysql
- `npm install`
- `node index.js`
- test with postman
 
