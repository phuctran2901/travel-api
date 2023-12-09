const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DB_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false
    })
    console.log('DB connect successfully')
  } catch (err) {
    console.log('DB connect failed')
    process.exit(1)
  }
}

module.exports = { connectDB }
