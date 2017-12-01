const mongoose = require('mongoose').connect('mongodb://vbagustinus:anakjalanan@smartshop-shard-00-00-hibsb.mongodb.net:27017,smartshop-shard-00-01-hibsb.mongodb.net:27017,smartshop-shard-00-02-hibsb.mongodb.net:27017/ecommerce?ssl=true&replicaSet=smartshop-shard-0&authSource=admin');
const ObjectId = require('mongodb').ObjectID;
const Customer = require('../models/customerModel');

let getAllCustomers = (req, res) => {
  Customer.find({}, (err, dataCustomers) => {
    if(err) res.status(500).send(err);
    res.send(dataCustomers)
  })
}

let createCustomer = (req, res) => {
  console.log(req.body);
  let input = req.body
  let inputCustomer = new Customer(
  {
    name : input.name,
    memberid: input.memberid,
    address: input.address,
    zipcode: input.zipcode,
    phone: input.phone
  });
  //save customer
  inputCustomer.save((err, customerSaved)=>{
    if(err) res.status(500).send(err);
    res.send({
      customer: customerSaved,
      messages : 'Input customer successed'
    })
  })
}

let deleteCustomer = (req, res) => {
  console.log(req.params.id);
  let id = {
    _id : ObjectId(req.params.id)
  }
  Customer.findByIdAndRemove(id)
  .then(customerRemoved =>{
    res.send({
      customer: customerRemoved,
      messages: 'Remove customer successed'
    })
  })
  .catch(err=>{
    res.status(500).send(err)
  })
}

let updateCustomer = (req, res) => {
  console.log(req.params.id);
  let edit = req.body
  let id = {
    _id: ObjectId(req.params.id)
  }
  let customer = {
    name : edit.name,
    memberid: edit.memberid,
    address: edit.address,
    zipcode: edit.zipcode,
    phone: edit.phone
  }
  Customer.findByIdAndUpdate(id, customer)
  .then(customerUpdated=>{
    res.send({
      customer: customerUpdated,
      messages: 'Update customer successed'
    })
  })
  .catch(err=>{
    console.log(err);
    res.status(500).send(err)
  })
}

module.exports = {
  createCustomer,
  getAllCustomers,
  deleteCustomer,
  updateCustomer
}
