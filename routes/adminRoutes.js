const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const expressSanitizer = require('express-sanitizer')
const methodOverride = require('method-override')
const ObjectId = require("mongodb").ObjectId;
const Blog = require("../models/blog");
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
router.use(methodOverride("_method"));



// BLOGS ROUTE
router.get('/blogs', async (req, res) => {
  try {
    blog = await Blog.find({})
    if (!blog) {
      res.status(404).json({
        message: 'No blog found'
      })
    } else {
      // res.render('blogs/blog', { blog })
      res.json({ msg: 'success', blog })
    }
  } catch (error) {
    res.status(404).json({ message: 'something went wrong' })
  }
})


router.get('/blogs/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id)
    if (!blog) {
      res.status(404).json({ message: 'No blog found' })
    } else {
      // res.render('blogs/blogShow', { blog })
      res.json({ msg: 'success', blog })
    }
  } catch (error) {
    res.status(404).json({ message: 'something went wrong' })
  }
})

// BLOGS POST ROUTE
router.post('/blogs', async (req, res) => {
  const user = req.user;
  try {
    const blog = new Blog({
      text: req.body.text,
      topic: req.body.topic,
      image: req.body.image,
      user: {
        username: req.user.username,
        id: req.user._id
      }
    })
    blog.save()
    user.blogs.push(blog)
    user.save()
    console.log(blog)
    console.log(user)
    res.redirect('/blogs')
  } catch (error) {
    res.status(404).json({ message: 'something went wrong' })
  }
})



router.get("/secret", (req, res) => res.render("blogs/blogForm"));


module.exports = router;
