var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table');
var colors = require("colors");

// Ininiate a connection with MySQL database
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Toby329!',
  database: 'bamazon'
});

connection.connect(function(error) {
  if(error) {
    console.error('error!!!', error);
    return;
  }
  console.log('connection made!', connection.threadId);
  // If there is a connection, call this function
  start();
});

var start = function(){
	connection.query("SELECT id, product_name, price FROM products", function(err, res){
			if (err) throw err;
			var table = new Table({
				head: ['Product ID', 'Product Name', 'Price']
			})
			for (i=0;i<res.length;i++){
				table.push(
				[res[i].id, res[i].product_name, res[i].price]
				)
		}
			console.log("Welcome to Bamazon - a CLI storefront");
			console.log(table.toString());
			buy();
		})
	
};

var buy = function(){
	inquirer.prompt({
		name: "enterId",
		type: "input",
		message: "Enter the ID of your desired product"
	})
	.then(function(answer) {
		// console.log(answer.enterId)
		connection.query("select product_name FROM products WHERE ID ="+answer.enterId,
			function(err, res){
				// console.log(res[0].stock_quantity)
				purchase(answer.enterId)
			})
	})
}
var purchase = function(prodId) {
	inquirer.prompt({
		name:"amount",
		type:"input",
		message:"How many would you like to buy?"
	})
	.then(function(answer) {
		connection.query("select stock_quantity from products WHERE ID="+prodId, function(err, res){
			var stockQuantity = parseInt(res[0].stock_quantity);
			var desiredAmt = answer.amount;
			if(desiredAmt > stockQuantity){
				console.log("Sorry, there are "+stockQuantity+" left :(");
				start();
				if (stockQuantity === 0){
					console.log("Try another item :)");
					start();
				}
			}
			else{
				newStock = stockQuantity - desiredAmt;
				connection.query("UPDATE products SET stock_quantity="+newStock+" where id="+prodId, 
					function(err, res){
						console.log("Thank You For your Purchase")
						start();

				})

			}
		})
		
	})
};

