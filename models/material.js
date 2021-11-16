const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const materialSchema = new Schema({
    createdAt: {
        type: Date,
        default: Date.now,
    },
    picspath: String,
    course: String,
    code: String,
    topic: String,
    desc: String,
    faculty: String,
    department: String,
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "comments"
        }
    ],
    user: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }
});

const Material = mongoose.model('Material', materialSchema)

module.exports = Material;
module.exports.removeTask2 = (id, cb) => {
    Material.deleteOne({ '_id': id }, (err, data) => {
        if (err) {
            cb(err, null);
        } else {
            cb(null, data);
        }
    });
}




