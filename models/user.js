const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema({
	username: String,
	institution: String,
	faculty: String,
	department: String,
	level: String,
	phoneNumber: {
		type: Number,
		unique: true,
		required: true
	},
	isPrivate: {
		type: Boolean,
		default: false
	},
	resetPasswordToken: String,
	resetPasswordExpires: Date,
	email: {
		type: String,
		unique: true,
		required: true
	},
	password: String,
	materials: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Material"
		}
	],
	comments: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "comments"
		}
	],
	questions: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "questions"
		}
	],
	questionComments: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "questionComment"
		}
	],

	blogs: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "blog"
		}
	]


});

userSchema.plugin(passportLocalMongoose);
const User = mongoose.model("User", userSchema);

module.exports = User;