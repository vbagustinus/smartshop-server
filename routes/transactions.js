const express = require('express')
const router = express.Router()
const Transaction =  require('../controllers/transactionControllers')
//
// /* GET Transactions listing. */
router.get('/',  Transaction.getAllTransactions);
router.post('/', Transaction.createTransaction);
router.delete('/:id', Transaction.deleteTransaction);
router.get('/:id', Transaction.getTransactionDetails);
router.put('/:id', Transaction.backBooking);

module.exports = router
