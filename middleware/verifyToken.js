const jwt = require('jsonwebtoken')

exports.verifyToken = (req, res, next) => {
  const Authorization = req.header('Authorization')
  if (!Authorization)
    res.json({
      messenger: 'Bạn chưa đăng nhập'
    })
  const token = Authorization.replace('Bearer ', '')
  const { userID } = jwt.verify(token, process.env.APP_SECERT)
  req.user = { userID }
  next()
}
