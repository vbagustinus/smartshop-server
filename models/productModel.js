const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  products_name: String,
  picture: String,
  prices: Number,
  details: String,
  category: String,
  stocks: Number
});

module.exports = mongoose.model('Product', productSchema);;
