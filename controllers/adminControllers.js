const mongoose = require('mongoose').connect('mongodb://vbagustinus:anakjalanan@smartshop-shard-00-00-hibsb.mongodb.net:27017,smartshop-shard-00-01-hibsb.mongodb.net:27017,smartshop-shard-00-02-hibsb.mongodb.net:27017/ecommerce?ssl=true&replicaSet=smartshop-shard-0&authSource=admin');
const ObjectId = require('mongodb').ObjectID;
const Admin = require('../models/adminModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

let createAdmin = (req, res) => {
  // console.log(req.body);
  const saltRounds = 10;
  let input = req.body
  bcrypt.hash(input.password, saltRounds).then(function(hash) {
    let obj = {
      name : input.name,
      username: input.username,
      password: hash
    }
    Admin.create(obj)
    .then(admin => {
      res.send(
      {
        msg: 'Success created account',
        data: admin
      })
    })
    .catch(err => {
      connsole.log(err)
    })
  });
}

let checkLogin = (req, res) => {
  // console.log('MASUK LOGIN', req.body);
  let signin = req.body
  Admin.findOne(
  {
    username: signin.username
  })
  .then(admin => {
    if(admin){
      bcrypt.compare(signin.password, admin.password)
      .then( result => {
        // console.log('<<<<<<<<',admin);
        if(result){
          jwt.sign(
          {
            id: admin._id,
            name : admin.name,
            username : admin.username
          },
            'process.env.SECRET_KEY',
            (err, token) => {
              // console.log('TOKEN', token);
              if(!err){
                console.log(
                  token, `Welcome ${admin.name}`, admin._id
                );
                res.send(
                {
                  token: token,
                  name : admin.name,
                  msg: `Welcome ${admin.name}`
                })
              } else {
                res.status(400).send(err)
              }
            })
        } else {
          res.send({msg: 'Wrong Password or username'})
        }
      });
    } else {
      res.send({msg: 'Wrong Password or username'})
    }
  })
  .catch(err => {
    res.status(500).send({msg: 'Wrong Password or username'})
  })
}

// let deleteAdmin = (req, res) => {
//   console.log(req.params.id);
//   let id = {
//     _id : ObjectId(req.params.id)
//   }
//   Admin.findByIdAndRemove(id)
//   .then(adminRemoved =>{
//     res.send({
//       admin: adminRemoved,
//       messages: 'Remove admin successed'
//     })
//   })
//   .catch(err=>{
//     res.status(500).send(err)
//   })
// }

// let updateAdmin = (req, res) => {
//   console.log(req.params.id);
//   let edit = req.body
//   let id = {
//     _id: ObjectId(req.params.id)
//   }
//   let admin = {
//     name : edit.name,
//     memberid: edit.memberid,
//     address: edit.address,
//     zipcode: edit.zipcode,
//     phone: edit.phone
//   }
//   Admin.findByIdAndUpdate(id, admin)
//   .then(adminUpdated=>{
//     res.send({
//       admin: adminUpdated,
//       messages: 'Update admin successed'
//     })
//   })
//   .catch(err=>{
//     console.log(err);
//     res.status(500).send(err)
//   })
// }

module.exports = {
  createAdmin,
  checkLogin
  // deleteAdmin,
  // updateAdmin
}
