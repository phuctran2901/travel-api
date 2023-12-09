const express = require('express')
const {
  getAllLocation,
  createLocation,
  deleteLocation,
  getLocation,
  editLocation
} = require('../controllers/locationController')
const { verifyToken } = require('../middleware/verifyToken')
const Router = express.Router()

Router.route('/').get(getAllLocation)

Router.route('/').post(verifyToken, createLocation)

Router.route('/:id').delete(verifyToken, deleteLocation)

Router.route('/:id').get(getLocation)

Router.route('/:id').post(verifyToken, editLocation)

module.exports = Router
