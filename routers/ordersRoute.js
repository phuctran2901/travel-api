const express = require('express');

const { verifyToken } = require('../middleware/verifyToken');
const Router = express.Router();

const { getAllOrders, createOrders, changeStatusOrders, deleteOneOrder, getListOrderByUser } = require('../controllers/ordersController');
Router.route('/').get(getAllOrders);
Router.route('/').post(createOrders);
Router.route('/status').post(verifyToken, changeStatusOrders);
Router.route('/:id').delete(verifyToken, deleteOneOrder);
Router.route("/user").get(verifyToken, getListOrderByUser);

module.exports = Router;