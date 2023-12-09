const Post = require("../models/post");
const cloudinary = require('../untils/cloudinary');
const User = require("../models/user");
const Comment = require("../models/comment");
exports.getAllPost = async (req, res) => {
    try {
        const posts = await Post.find({})
            .populate("author", "firstName lastName")
            .populate("comment")
            .sort("-createdAt");
        res.json({
            status: "success",
            posts
        })
    }
    catch (err) {
        res.json({
            status: "failed",
            err
        })
    }
}

exports.getPostByPage = async (req, res) => {
    try {
        let limit = Math.abs(req.query.limit) || 5;
        let page = (Math.abs(req.query.page) || 1) - 1;
        const Posts = await Post.find({})
            .limit(limit)
            .skip(page * limit)
            .populate("author", "firstName lastName")
            .populate("comment")
            .sort('-createdAt');
        let slPosts = await Post.find({});
        let totalPage = Math.ceil(slPosts.length / limit);
        res.json({
            status: "success",
            Posts,
            totalPage
        })
    }
    catch (err) {
        res.json({
            status: 'failed',
            err
        })
    }
}


exports.createOnePost = async (req, res) => {
    try {
        const { userID } = req.user;
        const uploader = async (path) => await cloudinary.uploads(path, 'postImage');
        const data = JSON.parse(req.body.post);
        const file = req.files[0];
        if (file) {
            const { path } = file;
            const res = await uploader(path);
            data.image = res.url;
        }
        data.author = userID;
        await Post.create(data, function (err, result) {
            if (err) {
                res.json({
                    status: "failed",
                    err
                })
                return;
            }
            res.json({
                status: "success",
                post: result
            })
        })
    }
    catch (err) {
        res.json({
            status: 'failed',
            err
        })
    }
}

exports.updatePost = async (req, res) => {
    try {
        const { id } = req.params;
        const data = JSON.parse(req.body.post);
        const file = req.files[0];
        const uploader = async (path) => await cloudinary.uploads(path, 'postImage');
        if (file) {
            const { path } = file;
            const res = await uploader(path);
            data.image = res.url;
        }
        await Post.findByIdAndUpdate(id, data, (err, result) => {
            if (err) return;
            res.json({
                status: "success"
            })
        })
    }
    catch {

    }
}


exports.getOnePost = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await Post.findById(id)
            .populate("author", "firstName lastName")
            .populate({
                path: "comment._id",
                populate: {
                    path: "author",
                    select: "firstName lastName image"
                }
            })
            .populate({
                path: "comment._id",
                populate: {
                    path: "reply._idReply",
                    populate: {
                        path: "author",
                        select: "firstName lastName image"
                    }
                }
            });
        res.json({
            status: "success",
            post
        })
    }
    catch (err) {
        res.json({
            status: "failed",
            err
        })
    }
}

exports.deletePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { userID } = req.user;
        const admin = await User.findById(userID);
        if (admin.role === "admin") {
            await Post.findByIdAndDelete(id, (err, result) => {
                if (err) return;
                res.json({
                    status: "success",
                })
            })
        } else {
            res.json({
                status: "failed",
                messenger: "Bạn không phải admin"
            })
        }
    }
    catch {

    }
}

exports.findPostByTitle = async (req, res) => {
    try {
        const { keyword } = req.body;
        const result = await Post.find({
            title: { $regex: keyword, $options: "i" }
        })
            .populate("author", "firstName lastName")
            .populate("comment")
            .limit(5);
        res.json({
            status: "success",
            posts: result
        })
    }
    catch {

    }
}


exports.addCommentToPost = async (req, res) => {
    try {
        const { userID } = req.user
        const { id } = req.params;
        const comment = await Comment.create({ ...req.body, author: userID });
        const post = await Post.findById(id);
        post.comment.unshift(comment._id);
        post.save(function (err, result) {
            if (err) {
                res.json({
                    status: "failed",
                    err
                })
            } else {
                res.json({
                    status: "success",
                    result,
                    idCmt: comment._id
                })
            }
        })
    }
    catch (err) {
        res.json({
            status: "failed",
            err
        })
    }
}

exports.replyComment = async (req, res) => {
    try {
        const { id } = req.params;
        const { content, userID } = req.body;
        const cmt = await Comment.findById(id);
        const replyCmt = await Comment.create({
            content: content,
            author: userID
        })
        cmt.reply.unshift({ _idReply: replyCmt._id });
        cmt.save(function (err, result) {
            if (err) res.json({
                status: "failed",
                err
            })
            else {
                res.json({
                    status: "success",
                    replyCmt
                })
            }
        });
    }
    catch (err) {
        if (err) res.json({
            status: "failed",
            err
        })
    }
}

exports.deleteComment = async (req, res) => {
    try {
        const { idPost, idCmt } = req.params;
        const post = await Post.findById(idPost);
        post.comment = post.comment.filter(cmt => {
            id = cmt._id.toString();
            return id !== idCmt;
        });
        post.save((err, result) => {
            if (err) return res.json({
                status: "failed",
                messenger: "Xóa bình luận thất bại"
            })
            Comment.findByIdAndDelete(idCmt, {}, function (err, result) {
                if (err) return res.json({
                    status: "failed",
                    messenger: "Xóa bình luận thất bại"
                })
                res.json({
                    status: "success",
                    messenger: "Xóa bình luận thành công"
                })
            })
        })
    }
    catch (err) {
        res.json({
            status: "failed",
            messenger: "Xóa bình luận thất bại",
            err
        })
    }
}