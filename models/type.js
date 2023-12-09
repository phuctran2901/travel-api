const mongoose = require('mongoose');

const typeSchema = new mongoose.Schema({
    name: { type: String, require: true }
}, { timestamps: true })

const Type = mongoose.model('type', typeSchema);

module.exports = Type;