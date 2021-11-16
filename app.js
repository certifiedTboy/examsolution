"use strict";
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const flash = require("connect-flash");
const ObjectId = require('mongodb').ObjectId;
const moment = require('moment');
const date = moment()
const questionRoutes = require("./routes/questionRoutes");
const { formatMessage } = require("./utils/messages");
const { getCurrentUser, userJoin, getRoomUsers } = require("./utils/users");
const middleware = require('./middleware/index')
const indexRoutes = require("./routes/index");
const passwordResetRoutes = require('./routes/passwordReset')
const materialRoutes = require('./routes/materialRoutes')
const authRoutes = require('./routes/AuthRoutes')
const adminRoutes = require('./routes/adminRoutes')
const Material = require("./models/material")
const User = require("./models/user");
const questionComment = require('./models/questionComment')
const question = require('./models/question')
const comment = require("./models/comment");
const path = require('path');
const fs = require('fs')
const upload = require('./config/multer')
const $ = require('jquery');
const app = express();
const dbconnect = require('./config/dbconnect')
const httpServer = require("http").createServer(app);
const socketIO = require("socket.io");
const async = require("async");
const PORT = process.env.PORT || 3000;




app.set('view engine', 'ejs');
app.use('/jquery', express.static(path.join(__dirname + '/node_modules/jquery/dist/')));
app.set("views", path.resolve(__dirname, 'views'));
const picPath = path.resolve(__dirname, 'public');
global.__basedir = __dirname;
app.locals.moment = require('moment');
app.use(express.static(picPath));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(indexRoutes);
app.use(questionRoutes);
app.use(passwordResetRoutes)
app.use(materialRoutes)
app.use(authRoutes)
app.use(adminRoutes)
app.use(flash());


const server = app.listen(PORT, () => console.log(`Listening on ${PORT}`));

const io = socketIO(server);




// MATERIAL DOWNLOAD ROUTE
app.get('/download/:id', async (req, res) => {
	try {
		const material = await Material.findById(req.params.id, (err, data) => {
			if (err) {
				console.log(err)
			} else {
				let path = __dirname + '/public/' + data.picspath;
				res.download(path);
			}
		})

	} catch (error) {
		res.json({ message: 'Something went Wrong' })
	}
})

// stream pdf files on web-browser
app.get('/:id', async (req, res) => {
	try {
		const material = await Material.findById(req.params.id, (err, data) => {
			if (err) {
				console.log(err)
			} else {
				let path = __dirname + '/public/' + data.picspath;
				if (fs.existsSync(path)) {
					res.contentType("application/pdf");
					fs.createReadStream(path).pipe(res)
				} else {
					res.status(500)
					console.log('File not found')
					res.send('File not found')
				}
			}
		})

	} catch (error) {
		res.json({ message: 'Something went Wrong' })
	}
})


//socket configuration
// Run when client connects
io.on("connection", (socket) => {
	socket.on("joinRoom", ({ username, room }) => {
		const user = userJoin(socket.id, username, room);
		socket.join(user.room);
	});

	// Listen for chatMessage
	socket.on("chatMessage", (msg) => {
		const user = getCurrentUser(socket.id);
		io.to(user.room).emit("message", formatMessage(user.username, msg));
		dbconnect.then((db) => {
			let commnts = new comment({
				text: msg,
				user: {
					username: user.username,
				}
			});
			commnts.save();
			Material.findOne({ _id: user.room }, (err, material) => {
				material.comments.push(commnts);
				material.save();
			});
		});
	});

	socket.on('chatMessage2', (msg) => {
		const user = getCurrentUser(socket.id);
		io.to(user.room).emit('message2', formatMessage(user.username, msg));
		dbconnect.then((db) => {
			let commnts = new questionComment({
				text: msg,
				user: {
					username: user.username
				}
			});
			commnts.save();
			console.log(commnts)
			question.findOne({ _id: user.room }, (err, questions) => {
				console.log(questions)
				questions.questionComments.push(commnts)
				questions.save()
			})
		})

	})

});


