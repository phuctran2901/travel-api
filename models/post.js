const mogoose = require("mongoose");


const PostSchema = new mogoose.Schema({
    title: { type: String, require: true },
    author: { type: mogoose.Schema.Types.ObjectId, require: true, ref: "user" },
    image: { type: String },
    content: { type: String, require: true },
    comment: [
        {
            _id: { type: mogoose.Schema.Types.ObjectId, ref: "Comment" }
        }
    ],
    tags: { type: String, require: true }
}, { timestamps: true })


const Post = mogoose.model("Post", PostSchema);

module.exports = Post;