const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const questionSchema = new Schema({
    course: String,
    code: String,
    topic: String,
    question: String,
    faculty: String,
    department: String,
    createdAt: {
        type: Date,
        default: Date.now()
    },
    questionComments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "questionComment"
        }
    ],
    user: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user"
        },
        username: String
    }
})

const questions = mongoose.model("questions", questionSchema)

module.exports = questions;

module.exports.removeTask = (id, cb) => {
    questions.deleteOne({ '_id': id }, (err, data) => {
        if (err) {
            cb(err, null);
        } else {
            cb(null, data);
        }
    });
}