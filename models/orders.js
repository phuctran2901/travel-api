const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema(
  {
    productDetail: [
      {
        productID: { type: mongoose.Schema.Types.ObjectId, ref: 'products' },
        quantity: { type: Number }
      }
    ],
    email: { type: String, required: true },
    userID: { type: String, required: true },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    note: { type: String },
    address: { type: String, required: true, trim: true },
    status: { type: Number, required: true },
    total: { type: Number, required: true },
    saleCode: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'code',
      require: true
    }
  },
  { timestamps: true }
)

const Order = mongoose.model('orders', OrderSchema)

module.exports = Order
