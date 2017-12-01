const express = require('express')
const router = express.Router()
const Admin =  require('../controllers/adminControllers')

/* GET Admins listing. */
router.post('/', Admin.checkLogin);

module.exports = router
