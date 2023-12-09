const express = require('express');
const {
    createType,
    getAllType,
    deleteType,
    createNXB,
    getAllNXB,
    deleteNXB
} = require('../controllers/tnController');
const { verifyToken } = require('../middleware/verifyToken');
const Router = express.Router();
// type
Router.route('/type').post(verifyToken, createType);

Router.route('/type').get(getAllType);

Router.route('/type/:id').delete(verifyToken, deleteType);

// nxb

Router.route('/nxb').post(verifyToken, createNXB);

Router.route('/nxb').get(getAllNXB);

Router.route('/nxb/:id').delete(verifyToken, deleteNXB);

module.exports = Router;