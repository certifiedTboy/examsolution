const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const privacySchema = new Schema({
    isPrivacy: false,
    user: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user"
        },
        username: String
    }
});


const privacy = mongoose.model("privacy", privacySchema);

module.exports = privacy;