const mongoose = require("mongoose");


const CommentSchema = new mongoose.Schema({
    author: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "user" },
    content: { type: String, required: true },
    reply: [
        {
            _idReply: { type: mongoose.Schema.Types.ObjectId, ref: "Comment" }
        }
    ]
}, { timestamps: true })

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;