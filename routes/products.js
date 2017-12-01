const router = require('express').Router()
const Product =  require('../controllers/productControllers')
const images = require('../helpers/uploadImages')
const upload = images.multer.single('image');

/* GET Products listing. */
router.get('/',  Product.getAllProducts);
// router.post('/', Product.createProduct);
router.post('/', (req, res, next) => {
  console.log('KE ROUTER')
  upload(req, res, function (err) {
    if (err) {
      return res.status(400).json({
        error: 'err'
      });
    }
    next();
  });
}, images.sendUploadToGCS, (req, res, next) => {
  // console.log('INI REQ', req)
  Product.createProduct(req, res, next)
});
router.delete('/:id', Product.deleteProduct);
router.put('/:id',  Product.updateProduct);

module.exports = router
