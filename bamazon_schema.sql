drop database if exists bamazon;

create database bamazon;

use bamazon;

create table products(
id int not null auto_increment,
product_name varchar (100) not null,
department_name varchar(50) not null,
price decimal(10, 2) not null,
stock_quantity int (11) null,
primary key (id)
);

insert into products(product_name, department_name, price, stock_quantity)
values
("Wireless Earbuds", "Electronics", 59.99, 80),
("1,000 thread count sheet set", "Home", 35.90, 62),
("Coffee Table", "Furniture", 44.99, 20),
("1000 mAh Battery Pack", "Electronics", 22.98, 50),
("Stuffed Animal pillow", "Home", 9.99, 25),
("Work Boots", "Shoes", 36.70, 24),
("Casio Calculator Watch", "Electronics", 19.99, 35),
("USB-c Adapter", "Electronics", 5.99, 70),
("Gone With The Wind", "Books", 10.59, 50),
("Toaster", "Appliances", 25.95, 15),
("Lava Lamp", "Appliances", 17.99, 30);