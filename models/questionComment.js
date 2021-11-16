const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const questionCommentSchema = new Schema({
    text: String,
    createdAt: {
        type: Date,
        default: Date.now()
    },
    user: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user"
        },
        username: String
    }
})

const questionComment = mongoose.model("questionComment", questionCommentSchema)

module.exports = questionComment;