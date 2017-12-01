const mongoose = require('mongoose').connect('mongodb://vbagustinus:anakjalanan@smartshop-shard-00-00-hibsb.mongodb.net:27017,smartshop-shard-00-01-hibsb.mongodb.net:27017,smartshop-shard-00-02-hibsb.mongodb.net:27017/ecommerce?ssl=true&replicaSet=smartshop-shard-0&authSource=admin');
// const mongoose = require('mongoose').connect('mongodb://localhost:27017/ecommerce');
const ObjectId = require('mongodb').ObjectID;
const Product = require('../models/productModel');

let getAllProducts = (req, res) => {
  Product.find()
  .then(dataProducts => {
    res.send(dataProducts)
  })
  .catch(err => {
    res.status(500).send(err);
  })
}

let createProduct = (req, res) => {
  let input = req.body
  // console.log('NAMA PRODUCT', input.products_name);
  // console.log(input.prices);
  // console.log(input.details);
  // console.log(input.category);
  // console.log(input.stocks);
  // console.log('URL PENTING',req.file.cloudStoragePublicUrl);
  let inputObj = {
    products_name: input.products_name,
    picture: req.file.cloudStoragePublicUrl,
    details: input.details,
    category: input.category,
    prices: input.prices,
    stocks: input.stocks
  }
  Product.create(inputObj)
  .then(data => {
    res.send({
      msg: 'Data Tersimpan',
      data: data
    })
  })
  .catch(err => {
    console.log(err);
  })
}

let deleteProduct = (req, res) => {
  console.log(req.params.id);
  let id = {
    _id : ObjectId(req.params.id)
  }
  Product.findByIdAndRemove(id)
  .then(ProductRemoved =>{
    res.send({
      Product: ProductRemoved,
      messages: 'Remove successed'
    })
  })
  .catch(err=>{
    res.status(500).send(err)
  })
}

let updateProduct = (req, res) => {
  console.log(req.params.id);
  let edit = req.body
  let id = {
    _id: ObjectId(req.params.id)
  }
  let Product = {
    isbn : edit.isbn,
    title: edit.title,
    author: edit.author,
    category: edit.category,
    stock: edit.stock
  }
  Product.findByIdAndUpdate(id, Product)
  .then(ProductUpdated=>{
    res.send({
      Product: ProductUpdated,
      messages: 'Update successed'
    })
  })
  .catch(err=>{
    res.status(500).send(err)
  })
}

module.exports = {
  createProduct,
  getAllProducts,
  deleteProduct,
  updateProduct
}
