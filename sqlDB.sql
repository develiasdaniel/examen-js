create database store;
use store;

CREATE TABLE IF NOT EXISTS repository (
  id int(11) NOT NULL AUTO_INCREMENT,
  name varchar(50),
  price int(10),
  category varchar(50),
  quantity int(10),
  PRIMARY KEY (id)
);
INSERT INTO repository (name, price, category, quantity) VALUES ("Leche",25,"Bebidas", 20);
INSERT INTO repository (name, price, category, quantity) VALUES ("Sopa",50,"Alimentos", 50);
INSERT INTO repository (name, price, category, quantity) VALUES ("Coca cola",30,"Bebidas", 78);
INSERT INTO repository (name, price, category, quantity) VALUES ("Gel",30,"AseoPersonal", 58);
INSERT INTO repository (name, price, category, quantity) VALUES ("Crema",30,"AseoPersonal",10);

select * from repository where name = 'Leche';
    
CREATE TABLE IF NOT EXISTS orders (
  id int(11) NOT NULL AUTO_INCREMENT,
  id_product int(11),
  ticket int(11),
  quantity int(10),
  PRIMARY KEY (id)
);
ALTER TABLE orders ADD CONSTRAINT fk_order FOREIGN KEY (id_product) REFERENCES repository(id);


select * from orders;
select * from repository;

DELIMITER //
CREATE TRIGGER tr_updStock AFTER INSERT ON orders
 FOR EACH ROW BEGIN
 UPDATE repository SET quantity = quantity - NEW.quantity 
 WHERE repository.id = NEW.id_product;
END
//
DELIMITER ;

INSERT INTO orders (id_product, ticket, quantity) VALUES (1,1,2);
INSERT INTO orders (id_product, ticket, quantity) VALUES (7,1,10);


    