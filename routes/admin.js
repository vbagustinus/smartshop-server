const express = require('express')
const router = express.Router()
const Admin =  require('../controllers/adminControllers')

/* GET Admins listing. */
router.post('/', Admin.createAdmin);
// router.delete('/:id', Admin.deleteAdmin);
// router.put('/:id',  Admin.updateAdmin);

module.exports = router
