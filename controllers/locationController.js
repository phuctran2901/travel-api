const Location = require('../models/location')
const User = require('../models/user')
const { ROLE } = require('../common/index')
const cloudinary = require('../untils/cloudinary')
const fs = require('fs')

exports.getAllLocation = async (req, res) => {
  try {
    const location = await Location.find({})
    res.json({
      status: 'success',
      location
    })
  } catch (err) {
    res.json({
      status: 'failed',
      errors: err
    })
  }
}

exports.createLocation = async (req, res) => {
  try {
    const { userID } = req.user
    const admin = await User.findById(userID)
    const file = req.files[0]
    const uploader = async (path) => await cloudinary.uploads(path, 'image')
    if (admin.role === ROLE.ADMIN) {
      const { path } = file
      const newPath = await uploader(path)
      fs.unlinkSync(path)
      const location = await Location.create({
        ...req.body,
        image: newPath?.url
      })
      res.json({
        status: 'success',
        location
      })
    } else
      res.json({
        messenger: 'Không đủ quyền'
      })
  } catch (err) {
    res.json({
      status: 'failed',
      errors: err.message
    })
  }
}

exports.deleteLocation = async (req, res) => {
  try {
    const { userID } = req.user
    const admin = await User.findById(userID)
    if (admin.role === ROLE.ADMIN) {
      await Location.findByIdAndDelete(req.params.id)
      res.json({
        status: 'success'
      })
    } else {
      res.json({
        messenger: 'Không đủ quyền'
      })
    }
  } catch (err) {
    res.json({
      messenger: err.message
    })
  }
}

exports.getLocation = async (req, res) => {
  try {
    const { id } = req.params
    const location = await Location.findById(id)
    res.json({
      status: 'success',
      location
    })
  } catch (err) {
    res.json({
      status: 'failed'
    })
  }
}

exports.editLocation = async (req, res) => {
  try {
    const { id } = req.params
    await Location.findByIdAndUpdate(
      id,
      { ...req.body },
      { runValidators: true, new: true }
    )
    res.json({
      status: 'success'
    })
  } catch (err) {
    res.json({
      message: err.message
    })
  }
}
