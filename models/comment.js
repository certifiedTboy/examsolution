const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const commentSchema = new Schema({
    text: String,
    createdAt: {
        type: Date,
        default: Date.now()
    },
    // sender: String,
    user: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user"
        },
        username: String
    }
})

const comment = mongoose.model("comments", commentSchema)

module.exports = comment;