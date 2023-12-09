const express = require('express');

const Router = express.Router();
const { register, login, getCurrentUser, loginAdmin } = require('../controllers/authController');
const { checkCurrentUser } = require('../middleware/checkCurrentUser');

Router.route('/register').post(register);
Router.route('/login').post(login)
Router.route('/').get(checkCurrentUser, getCurrentUser);
Router.route('/admin/login').post(loginAdmin);

module.exports = Router;