const express = require('express')
const router = express.Router()
const Customer =  require('../controllers/customerControllers')

/* GET Customers listing. */
router.get('/',  Customer.getAllCustomers);
router.post('/', Customer.createCustomer);
router.delete('/:id', Customer.deleteCustomer);
router.put('/:id',  Customer.updateCustomer);

module.exports = router
