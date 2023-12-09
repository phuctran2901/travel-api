require('dotenv').config()
// Connect db
const { connectDB } = require('./untils/db')
connectDB()

const express = require('express')
const cors = require('cors')
const app = express()
const upload = require('./untils/multer')
const productsRouter = require('./routers/productsRoute')
const authRouter = require('./routers/authRoute')
const userRouter = require('./routers/userRoute')
const ordersRouter = require('./routers/ordersRoute')
const codeRouter = require('./routers/codeRoute')
const tnRouter = require('./routers/tnRoute')
const postRouter = require('./routers/postRoute')
const locationRouter = require('./routers/locationRoute')
// Cors
var corsOptions = {
  origin: [
    'https://bookstore-client-user.vercel.app',
    'https://bookstore-client-dashboard.vercel.app',
    'http://localhost:3000'
  ],
  optionsSuccessStatus: 200 // For legacy browser support
}
app.use(cors(corsOptions))
//body parse
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
//Mount the router
app.use('/api/products', upload.array('image'), productsRouter)
app.use('/api/auth', authRouter)
app.use('/api/user', upload.array('userImage'), userRouter)
app.use('/api/orders', ordersRouter)
app.use('/api/code', codeRouter)
app.use('/api/tn', tnRouter)
app.use('/api/post', upload.array('postImage'), postRouter)
app.use('/api/location', upload.array('locationImage'), locationRouter)

// Not found router
app.use('*', function () {
  console.log('not found')
})

const port = process.env.PORT || 5000

app.listen(port, () => {
  console.log(`server running is port ${port}`)
})
