const mysql = require('mysql')
const connection = mysql.createConnection({
  host:'127.0.0.1',
  user:'root',
  password:'navgurukul',
  database:'e_commereceDB'
})
module.exports = connection;
connection.connect(function(err){
  if (err){
    console.error('error connection: '+ err.stack)
    return;
  }
  console.log('connected as id ' + connection.threadId)
})



;
// conecting the databese with s update user set authentication_string=PASSWORD("navgurukul") where User='root';erver.
var knex = require('knex')({
  client: 'mysql',
  connection: {
    host: '127.0.0.1',
    user: 'root',
    password: 'navgurukul',
    database: 'e_commereceDB'
  }
}); 



const bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({
  extended: false
});

const config = require('./config.js');
const express = require('express');
var jwt = require('jsonwebtoken');


const app = express();

app.use(express.json());



var order = express.Router()
app.use('/order',order);
require('./routes/orders.js')(order, knex);



var attribute = express.Router()
app.use('/attribute',attribute);
require('./routes/attributes.js')(attribute, knex);


var category = express.Router()
app.use('/category',category);
require('./routes/category.js')(category, knex);


var department = express.Router()
app.use('/department',department);
require('./routes/department.js')(department, knex);


var shopping_cart = express.Router()
app.use('/shopping_cart',shopping_cart);
require('./routes/shopping_cart.js')(shopping_cart, knex,jwt,config);

//route for product
var product = express.Router()
app.use('/product',product);
require('./routes/product.js')(product, knex);


//route for tax
var tax = express.Router()
app.use('/tax',tax);
require('./routes/tax.js')(tax, knex);



//route for shipping
var shipping = express.Router()
app.use('/shipping',shipping);
require('./routes/shipping.js')(shipping, knex);


var customer = express.Router()
app.use('/customer',customer);
require('./routes/customer.js')(customer, knex, jwt,config);




app.listen(4000,()=> console.log('server is listening ..port 3000........'));
