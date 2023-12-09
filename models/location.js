const mongoose = require('mongoose')

const locationSchema = new mongoose.Schema(
  {
    locationName: { type: String, require: true },
    image: { type: String, require: true },
    lat: { type: String },
    description: { type: String, require: true },
    address: { type: String, require: true }
  },
  { timestamps: true }
)

const Location = mongoose.model('location', locationSchema)

module.exports = Location
