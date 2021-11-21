const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const flash = require("connect-flash");
const LocalStrategy = require("passport-local");
const ObjectId = require("mongodb").ObjectId;
const passport = require("passport");
const { transport } = require("../utils/nodeMailer");
const expressSanitizer = require("express-sanitizer");
const Material = require('../models/material')
const question = require('../models/question')
const User = require("../models/user");
const privacy = require("../models/privacy");
const {
  isLoggedIn,
  notLoggedIn,
  checkQuestionCommentOwnership,
  checkQuestionOwnership,
  blogFormView,
} = require("../middleware");
const async = require("async");
const router = express.Router();


const picPath = path.resolve(__dirname, "public");
router.use(express.static(picPath));
router.use(bodyParser.urlencoded({ extended: false }));
router.use(expressSanitizer());

router.use(
  require("express-session")({
    secret: "fasttrack is the best in the whole of Nigera",
    resave: false,
    saveUninitialized: false,
  })
);

router.use(methodOverride("_method"));
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

router.use(passport.initialize());
router.use(passport.session());
router.use(flash());
router.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
});

// HOME ROUTE
router.get('/', (req, res) => {
  res.render('index', { user: req.user })
})
router.get('/home', (req, res) => {
  res.json({ msg: 'success', user: req.user })
})

// LOGIN ROUTE
router.get("/login", notLoggedIn, (req, res) => res.render("user/login"));



// REGISTERATION ROUTE
router.get("/register", notLoggedIn, (req, res) => res.render("user/register"));


// HOME ROUTE
router.get("/", (req, res) => res.render("index"));

// TERMS AND CONDITIONS ROUTE
router.get('/terms', (req, res) => {
  res.json({ msg: 'success' })
})

// ABOUT DEVELOPER ROUTE
router.get('/about2', (req, res) => {
  res.json({ msg: 'success' })
})

router.get('/about', (req, res) => res.render('generalPage'))


router.get('/contact', (req, res) => {
  res.json({ msg: 'success' })
})



// USER PRIVACY
router.post('/privacy/:id', isLoggedIn, async (req, res) => {
  const privacyState = req.body.privacy;
  try {
    const user = await User.findById(req.params.id)
    if (privacyState === 'privacy') {
      user.isPrivate = true;
      user.save()
      res.redirect('back')
    }
  } catch (error) {
    console.log(error)
  }
})

// //USER PUBLIC PROFILE
router.post('/public/:id', isLoggedIn, async (req, res) => {
  const privacyState = req.body.privacy
  try {
    const user = await User.findById(req.params.id)
    if (privacyState === 'public') {
      user.isPrivate = false;
      user.save()
      res.redirect('back')
    }
  } catch (error) {
    console.log(error)
  }
})

// // USER PROFILE / USER POST PAGE ROUTE
router.get('/userprofile/user/:id', isLoggedIn, async (req, res) => {
  try {
    const users = await User.findById(req.params.id).populate('materials').populate('questions').exec((err, user) => {
      if (err) {
        res.status(404).json({ message: 'User not found' })
      } else {
        const allPosts = [...user.materials, ...user.questions]
        res.render("user/userprofile", { user, allPosts })
      }
    })
  } catch (error) {
    res.status(404).json({ message: 'something went wrong' })
  }
})

// USER PROFILE / USER POST PAGE ROUTE
router.get('/userprofile/username/:username', isLoggedIn, async (req, res) => {
  try {
    const users = await User.findOne({ 'username': req.params.username }).populate('materials').populate('questions').exec((err, user) => {
      if (err) {
        res.status(404).json({ message: err })
      } else {
        const allPosts = [...user.materials, ...user.questions]
        res.render("user/userprofile", { user, allPosts })
      }
    })
  } catch (error) {
    res.status(404).json({ message: 'something went wrong' })
  }
})

// SEARCH ROUTE
router.get("/search", async (req, res) => {
  try {
    const material = await Material.find({ $or: [{ course: { $regex: req.query.dsearch } }, { code: { $regex: req.query.dsearch } }, { topic: { $regex: req.query.dsearch } }, { desc: { $regex: req.query.dsearch } }, { faulty: { $regex: req.query.dsearch } }, { department: { $regex: req.query.dsearch } },] })
    const questions = await question.find({ $or: [{ course: { $regex: req.query.dsearch } }, { code: { $regex: req.query.dsearch } }, { topic: { $regex: req.query.dsearch } }, { desc: { $regex: req.query.dsearch } }, { faulty: { $regex: req.query.dsearch } }, { department: { $regex: req.query.dsearch } },] })
    let foundData = [...material, ...questions];
    console.log(foundData)
    if (!foundData) {
      res.json({ msg: 'error' })
    } else {
      res.render('search', { foundData })
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
