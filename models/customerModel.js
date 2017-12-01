const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const customerSchema = new Schema({
  name : String,
  memberid: String,
  address: String,
  zipcode: String,
  phone: {
    type: String,
    validate: {
      validator: function(v) {
        return /^.{6,}$/.test(v);
      },
      message: 'Not a valid phone number!'
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Customers', customerSchema);;
