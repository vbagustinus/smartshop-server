  const mongoose = require('mongoose').connect('mongodb://vbagustinus:anakjalanan@smartshop-shard-00-00-hibsb.mongodb.net:27017,smartshop-shard-00-01-hibsb.mongodb.net:27017,smartshop-shard-00-02-hibsb.mongodb.net:27017/ecommerce?ssl=true&replicaSet=smartshop-shard-0&authSource=admin');
const ObjectId = require('mongodb').ObjectID;
const Transaction = require('../models/transactionsModel');

let getAllTransactions = (req, res) => {
  Transaction.find()
  .then(dataTransactions =>{
    res.send(dataTransactions)
  })
  .catch(err=>{
    res.status(500).send(err)
  })
}

let createTransaction = (req, res) => {
  console.log('BODY',req.body);
  let input = req.body
  let now = new Date();
  let inputTransaction = new Transaction(
  {
    products : input.id,
    total: input.total
  });
  //save book
  inputTransaction.save((err, transactionSaved)=>{
    if(err) res.status(500).send(err);
    res.send({
      transaction: transactionSaved,
      messages : 'Input successed'
    })
  })
}

let deleteTransaction = (req, res) => {
  console.log(req.params.id);
  let id = {
    _id : ObjectId(req.params.id)
  }
  Transaction.findByIdAndRemove(id)
  .then(transactionRemoved => {
    res.send({
      transaction: transactionRemoved,
      messages: 'Remove transaction successed'
    })
  })
  .catch(err => {
    res.status(500).send(err)
  })
}

let backBooking = (req, res) => {
  let id = {
    _id : ObjectId(req.params.id)
  }
  Transaction.findOne(id)
  .then(transaction => {
    let kembali = new Date().getDate()
    let batasKembali = transaction.due_date.getDate()
    // 17 - 14
    let fine = 0
    if(batasKembali < kembali){
      fine = (batasKembali - kembali) * 1000;
    }
    transaction.fine = fine,
    transaction.in_date = new Date()
    transaction.save((err, hasilEdit)=>{
      if(!err){
        res.send({
          denda : hasilEdit.fine,
          dataTransactions: hasilEdit
        })
      } else {
        console.log(err);
      }
    })
  })
  .catch(err=>{
    res.status(500).send(err)
  })
}

let getTransactionDetails = (req, res) => {
  let id = {
    _id: ObjectId(req.params.id)
  }
  Transaction.findOne(id)
  .populate('member')
  .populate('booklist')
  .exec((err, Details)=>{
    if(!err){
      res.send(Details)
    } else {
      res.status(500).send(err)
    }
  })
}
module.exports = {
  createTransaction,
  getAllTransactions,
  deleteTransaction,
  getTransactionDetails,
  backBooking
}
