'use strict'
const path = require('path');
const Storage = require('@google-cloud/storage');
const CLOUD_BUCKET = 'image-smartshop';
const storage = Storage({
  projectId: 'ecommerce',
  keyFilename: 'keyjson.json'
})
const bucket = storage.bucket(CLOUD_BUCKET);
const getPublicUrl = filename => {
  return `https://storage.googleapis.com/${CLOUD_BUCKET}/${filename}`;
}

const sendUploadToGCS = (req, res, next) => {
  if (!req.file) {
    return next()
  }

  const gcsname = Date.now() + req.file.originalname
  const file = bucket.file(gcsname)

  const stream = file.createWriteStream({
    metadata: {
      contentType: req.file.mimetype
    }
  })

  stream.on('error', (err) => {
    req.file.cloudStorageError = err
    next(err)
  })

  stream.on('finish', () => {
    req.file.cloudStorageObject = gcsname
    file.makePublic().then(() => {
      req.file.cloudStoragePublicUrl = getPublicUrl(gcsname)
      next()
    })
  })

  stream.end(req.file.buffer)
}

const Multer = require('multer'),
      
      multer = Multer({
        storage: Multer.MemoryStorage,
        limits: {
          fileSize: 5 * 1024 * 1024
        },
        fileFilter: function (req, file, cb) {
          var filetypes = /jpeg|jpg|png/;
          var mimetype = filetypes.test(file.mimetype);
          var extname = filetypes.test(path.extname(file.originalname).toLowerCase());

          if (mimetype && extname) {
            return cb(null, true);
          }
          console.log('KE MULTER')
          cb("Error: File type not supported");
        }
      })

module.exports = {
  getPublicUrl,
  sendUploadToGCS,
  multer
}
