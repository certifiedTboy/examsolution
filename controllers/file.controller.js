const uploadFolder = '/public/uploads/';
const fs = require('fs');
const { isLoggedIn, checkPostOwnership, } = require('../middleware/index')
const Material = require('../models/material.js')
const async = require('async')

exports.uploadFile = async (req, res) => {
	const user = req.user;
	const x = 'uploads/' + req.file.filename;
	try {
		const material = new Material({
			picspath: x,
			course: req.body.course,
			code: req.body.code,
			topic: req.body.topic,
			desc: req.body.desc,
			faculty: req.body.faculty,
			department: req.body.department,
			user: {
				username: user.username,
				id: user._id,
			},
		})
		material.save()
		user.materials.push(material);
		user.save();
		// res.redirect("/materials");
		res.json({ msg: 'success' })
	} catch (error) {
		res.status(404).json({ message: 'something went wrong' })
	}
}
