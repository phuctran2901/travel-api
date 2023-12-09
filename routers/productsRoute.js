const express = require('express');
const Router = express.Router();
const {
    getOneProduct,
    createOneProducts,
    editProduct,
    deleteOneProduct,
    getProductByPage,
    addReviewToProduct,
    searchKeywordText,
    changeCategoryProduct,
    getAllProduct,
    searchProductByField,
    filterByPrice } = require('../controllers/productController');
const { verifyToken } = require('../middleware/verifyToken');

Router.route("/filter-price").post(filterByPrice);

Router.route("/all").get(getAllProduct);

Router.route('/category').post(verifyToken, changeCategoryProduct);

Router.route('/review/:productID').post(verifyToken, addReviewToProduct);

Router.route("/search-field").post(searchProductByField);

Router.route("/search").get(searchKeywordText);

Router.route('/').get(getProductByPage);

Router.route('/:productID').get(getOneProduct);

Router.route('/').post(verifyToken, createOneProducts);

Router.route('/:productID').post(verifyToken, editProduct).delete(verifyToken, deleteOneProduct);

module.exports = Router;