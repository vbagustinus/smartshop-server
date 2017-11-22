const router = require('express').Router()
const Product =  require('../controllers/productControllers')

/* GET Products listing. */
router.get('/',  Product.getAllProducts);
router.post('/', Product.createProduct);
router.delete('/:id', Product.deleteProduct);
router.put('/:id',  Product.updateProduct);

module.exports = router
