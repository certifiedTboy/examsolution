const User = require("../models/user");
const Blog = require("../models/blog")
const comment = require("../models/comment");
const questionComment = require("../models/questionComment")
const questions = require("../models/question");
const Material = require("../models/material")

module.exports = {
    isLoggedIn: (req, res, next) => {
        if (req.isAuthenticated()) {
            return next();
        }
        req.flash("error", "You must be signed in first!");
        res.redirect("/login");
    },
    notLoggedIn: (req, res, next) => {
        if (!req.isAuthenticated()) {
            return next();
        }

        res.redirect("back");
    },

    checkPostOwnership: (req, res, next) => {
        if (req.isAuthenticated()) {
            Material.findById(req.body.id, (err, data) => {
                console.log(data)
                if (err) {
                    req.flash("error", "You do not have permission to delete or edit this post");
                    res.redirect("back")
                } else {
                    if (data.user.id.equals(req.user._id)) {

                        next();
                    } else {
                        req.flash("error", "You do not have permission to delete or edit this post");
                        res.redirect("back")
                    }
                }

            });
        } else {
            req.flash("error", "You do not have permission to delete or edit this post");
            res.redirect("back")
        }
    },
    checkPostOwnership2: (req, res, next) => {
        if (req.isAuthenticated()) {
            Material.findById(req.params.id, (err, data) => {
                console.log(data)
                if (err) {
                    req.flash("error", "You do not have permission to delete or edit this post");
                    res.redirect("back")
                } else {
                    if (data.user.id.equals(req.user._id)) {

                        next();
                    } else {
                        req.flash("error", "You do not have permission to delete or edit this post");
                        res.redirect("back")
                    }
                }

            });
        } else {
            req.flash("error", "You do not have permission to delete or edit this post");
            res.redirect("back")
        }
    },
    checkCommentOwnership: (req, res, next) => {
        if (req.isAuthenticated()) {
            comment.findById(req.params.id, (err, comments) => {
                if (err) {
                    req.flash("error", "You do not have permission to delete or edit this Comment");
                    res.redirect("back")
                } else {

                    if (comments.user.username === req.user.username) {

                        next();
                    } else {
                        req.flash("error", "You do not have permission to delete or edit this Comment");
                        res.redirect("back")
                    }
                }

            });
        } else {
            req.flash("error", "You do not have permission to delete or edit this post");
            res.redirect("back")
        }
    },


    checkQuestionOwnership: (req, res, next) => {
        if (req.isAuthenticated()) {
            questions.findById(req.body.id, (err, data) => {
                console.log(data)
                if (err) {
                    req.flash("error", "You do not have permission to delete or edit this question");
                    res.redirect("back")
                } else {
                    if (data.user.id.equals(req.user._id)) {

                        next();
                    } else {
                        req.flash("error", "You do not have permission to delete or edit this question");
                        res.redirect("back")
                    }
                }

            });
        } else {
            req.flash("error", "You do not have permission to delete or edit this question");
            res.redirect("back")
        }
    },

    checkQuestionOwnership2: (req, res, next) => {
        if (req.isAuthenticated()) {
            questions.findById(req.params.id, (err, data) => {
                if (err) {
                    req.flash("error", "You do not have permission to delete or edit this question");
                    res.redirect("back")
                } else {
                    if (data.user.id.equals(req.user._id)) {

                        next();
                    } else {
                        req.flash("error", "You do not have permission to delete or edit this question");
                        res.redirect("back")
                    }
                }

            });
        } else {
            req.flash("error", "You do not have permission to delete or edit this question");
            res.redirect("back")
        }
    },
    checkQuestionCommentOwnership: (req, res, next) => {
        if (req.isAuthenticated()) {
            questionComment.findById(req.params.id, (err, comments) => {
                if (err) {
                    req.flash("error", "You do not have permission to delete or edit this Comment");
                    res.redirect("back")
                } else {

                    if (comments.user.username === req.user.username) {

                        next();
                    } else {
                        req.flash("error", "You do not have permission to delete or edit this Comment");
                        res.redirect("back")
                    }
                }

            });
        } else {
            req.flash("error", "You do not have permission to delete or edit this post");
            res.redirect("back")
        }
    },


    regValidation: function (req, res, next) {
        if (req.body.password !== req.body.confirmPassword || req.body.password.trim().length < 8) {
            req.flash("error", "Password is too short or Does not match !!! Use a minimum of 8 characters")
            res.redirect("back")
        } else {
            next()
        }
    },
    tncCheck: function (req, res, next) {
        if (req.body.tnc === "tnc") {
            next()
        } else {
            req.flash("error", "You have to accept our terms and conditions!")
            res.redirect("back")

        }
    },

    checkFormInput: function (req, res, next) {
        if (req.body.institution.trim().length <= 0 || req.body.username.trim().length <= 0 || req.body.phoneNumber.trim().length <= 0 || req.body.level.trim().length <= 0 || req.body.dept.trim().length <= 0 || req.body.faculty.trim().length <= 0) {
            req.flash("error", "Form Fields cant't be empty!")
            res.redirect("back")
        } else {
            next()

        }
    }
}
