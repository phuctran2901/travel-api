const multer = require('multer')
const path = require('path')
const validImageTypes = ['image/gif', 'image/jpeg', 'image/png']
const store = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(process.cwd(), '/uploads'))
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
})

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true)
  } else {
    cb({ message: 'Upload file!!' }, false)
  }
}

const upload = multer({
  storage: store,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: fileFilter
})

module.exports = upload
