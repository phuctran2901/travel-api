const express = require("express");
const { getAllPost, createOnePost, deletePost, findPostByTitle, getOnePost, updatePost, getPostByPage, addCommentToPost, replyComment, deleteComment } = require("../controllers/postController");
const Router = express.Router();
const { verifyToken } = require("../middleware/verifyToken");

Router.route("/replyCmt/:id").post(verifyToken, replyComment);

Router.route("/comment/:id").post(verifyToken, addCommentToPost);

Router.route("/:idPost/comment/:idCmt").delete(deleteComment);

Router.route("/all").get(getAllPost);

Router.route("/search").post(findPostByTitle);

Router.route("/:id").post(verifyToken, updatePost);

Router.route("/").get(getPostByPage);

Router.route("/").post(verifyToken, createOnePost);

Router.route("/:id").delete(verifyToken, deletePost);

Router.route("/:id").get(getOnePost);

module.exports = Router;