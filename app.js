const express = require('express');
const app = require('express')();
const bodyParser = require('body-parser')
const logger = require('morgan');
const index = require('./routes/index');
const products = require('./routes/products');
const customers = require('./routes/customers');
const transactions = require('./routes/transactions');
const path = require('path');
const cors = require('cors')

app.use(cors())
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')));

//route
app.use('/', index);
app.use('/products', products);
app.use('/customers', customers);
app.use('/transactions', transactions);

app.listen(3000,(err)=>{
  if(!err){
    console.log('Jalan di port 3000');
  } else {
    console.log(err);
  }
})
