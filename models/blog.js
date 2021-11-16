
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const blogSchema = new Schema({
    text: String,
    topic: String,
    image: String,
    createdAt: {
        type: Date,
        default: Date.now()
    },
    user: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }
});

const Blog = mongoose.model("blog", blogSchema);

module.exports = Blog;