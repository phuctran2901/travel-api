const mongoose = require('mongoose');

const nxbSchema = new mongoose.Schema({
    name: { type: String, require: true }
}, { timestamps: true })

const NXB = mongoose.model('nxb', nxbSchema);

module.exports = NXB;