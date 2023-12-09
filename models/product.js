const mongoose = require('mongoose')

const productSchema = new mongoose.Schema(
  {
    title: { type: String, require: true },
    description: { type: String, require: true },
    urls: { type: Array, require: true },
    sale: { type: Number, default: 0 },
    startDate: { type: String, require: true },
    endDate: { type: String, require: true },
    departurePoint: { type: String, require: false },
    review: [
      {
        userID: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'user',
          required: true
        },
        stars: { type: Number, required: true },
        date: { type: Date, required: true },
        content: { type: String, required: true }
      }
    ],
    adress: { type: String, require: true },
    numberOfSeatsLeft: { type: Number, require: true },
    price: { type: Number, require: true },
    types: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'type',
      required: false
    },
    category: [{ type: String, require: true }],
    averagedStars: { type: Number, default: 0 },
    schedule: [
      {
        location: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'location',
          required: true
        },
        date: { type: String, require: true },
        index: { type: Number, require: true }
      }
    ]
  },
  { timestamps: true }
)
productSchema.index({ title: 'text' })
const product = mongoose.model('products', productSchema)

module.exports = product
