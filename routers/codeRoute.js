const express = require('express');
const { getAllCode, createCode, deleteOneCode, getOneCode, editOneCode, checkCode } = require('../controllers/codeController');
const { verifyToken } = require('../middleware/verifyToken');
const Router = express.Router();

Router.route("/check").post(checkCode);

Router.route('/').get(getAllCode);

Router.route('/').post(verifyToken, createCode);

Router.route('/:id').delete(verifyToken, deleteOneCode);

Router.route('/:id').get(getOneCode);

Router.route('/:id').post(verifyToken, editOneCode)


module.exports = Router;