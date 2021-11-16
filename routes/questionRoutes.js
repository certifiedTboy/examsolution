const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const flash = require("connect-flash");
const ObjectId = require("mongodb").ObjectId;
const User = require("../models/user");
const questionComment = require("../models/questionComment");
const questions = require("../models/question");
//MIDDLEWARES REQUIREMENT
const {
  isLoggedIn,
  checkQuestionOwnership,
  checkQuestionOwnership2,
  checkQuestionCommentOwnership,
} = require("../middleware/index");
const router = express.Router();

//LOOK UP QUESTIONS ROUTES
router.get("/question", isLoggedIn, async (req, res) => {
  try {
    const question = await questions.find({});
    if (!question) {
      res.status(404).json({ message: "No question found" });
    } else {
      res.render("question/question", { question });
    }
  } catch (error) {
    res.status(404).json({ message: "something went wrong" });
  }
});

// SINGLE QUESTION ROUTE
router.get("/questions/:id", isLoggedIn, async (req, res) => {
  try {
    const question = await questions
      .findById(req.params.id)
      .populate("questionComments")
      .exec();
    if (!question) {
      res.status(404).json({ message: "No question found" });
    } else {
      res.render("question/questionShow", { question });
    }
  } catch (error) {
    res.status(404).json({ message: "something went wrong" });
  }
});

// QUESTION DELETE ROUTE
router.delete("/questions/deletequestion/:id", isLoggedIn, checkQuestionOwnership2, async (req, res) => {
  try {
    const question = await questions.findByIdAndDelete(
      req.params.id,
      (err, data) => {
        if (err) {
          res.status(404).json({ message: "something went wrong" });
        } else {
          res.redirect("back");
          // res.json({ msg: "success" });
        }
      }
    );
  } catch (error) {
    res.status(404).json({ message: "something went wrong" });
  }
});

router.delete('/questions/deletepost', isLoggedIn, checkQuestionOwnership, (req, res) => {
  questions.removeTask(req.body.id, (err, data) => {
    if (err) {
      res.json({ msg: 'error' });
    } else {
      res.json({ msg: 'success' });
    }
  });
});

//QUESTIONS POST ROUTES
router.post("/questions", isLoggedIn, async (req, res) => {
  const user = req.user;
  try {
    const question = await new questions({
      desc: req.body.desc,
      course: req.body.course,
      code: req.body.code,
      topic: req.body.topic,
      department: req.body.department,
      faculty: req.body.faculty,
      question: req.body.question,
      user: {
        username: user.username,
        id: user._id,
      },
    });
    question.save();
    if (!question) {
      res.status(404).json({ message: "something went wrong" });
    } else {
      user.questions.push(question);
      user.save();
      // res.redirect("back");
      res.json({ msg: 'success' });
    }
  } catch (error) {
    res.status(404).json({ message: "something went wrong" });
  }
});



// QUESTION EDIT ROUTE
router.get(
  "/questions/:id/edit",
  isLoggedIn, checkQuestionOwnership2,
  async (req, res) => {
    try {
      const question = await questions.findById(req.params.id);
      if (!question) {
        res.status(404).json({ message: "question not found" });
      } else {
        res.json({ msg: 'success', question });
      }
    } catch (error) {
      res.status(404).json({ message: "something went wrong" });
    }
  }
);

// QUESTION EDIT POST ROUTE
router.put(
  "/questions/:id",
  isLoggedIn,
  checkQuestionOwnership2,
  async (req, res) => {
    const newQuestion = {
      course: req.body.course,
      code: req.body.code,
      topic: req.body.topic,
      question: req.body.question,
      user: {
        username: req.user.username,
        id: req.user._id,
      },
    };
    try {
      const question = await questions.findByIdAndUpdate(
        req.params.id,
        newQuestion,
        (err, question) => {
          if (err) {
            res.status(404).json({ message: "something went wrong" });
          } else {
            res.json({ msg: 'success' })
          }
        }
      );
    } catch (error) {
      res.status(404).json({ message: "something went wrong" });
    }
  }
);

// QUESTION COMMENT DELETE ROUTE
router.delete(
  "/questions/:id/comments/:id",
  isLoggedIn,
  checkQuestionCommentOwnership,
  async (req, res) => {
    try {
      const comments = await questionComment.findByIdAndDelete(
        req.params.id,
        (err, cmt) => {
          if (err) {
            res.status(404).json({ message: "something went wrong" });
          } else {
            res.json({ msg: 'success' })
          }
        }
      );
    } catch (error) {
      res.status(404).json({ message: "something went wrong" });
    }
  }
);

module.exports = router;
