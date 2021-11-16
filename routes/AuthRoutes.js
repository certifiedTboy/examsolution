const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const flash = require("connect-flash");
const LocalStrategy = require("passport-local");
const { regValidation, tncCheck, checkFormInput } = require('../middleware/index')
const ObjectId = require("mongodb").ObjectId;
const passport = require("passport");
const { body, validationResult } = require('express-validator');
const expressSanitizer = require('express-sanitizer');
const { transport } = require("../utils/nodeMailer");
const User = require("../models/user");
const async = require("async");
const router = express.Router();


const picPath = path.resolve(__dirname, "public");
router.use(express.static(picPath));
router.use(bodyParser.urlencoded({ extended: false }));

// express-session configuration
router.use(
    require("express-session")({
        secret: "fasttrack is the best in the whole of Nigera",
        resave: false,
        saveUninitialized: false,
    })
);

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

router.use(passport.initialize());
router.use(passport.session());
router.use(flash());
router.use(expressSanitizer());
router.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});



// //REGISTERATION ROUTE
router.post("/register", body('email').isEmail(), regValidation, tncCheck, checkFormInput, (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        req.flash("error", "Invalid Email Address " + ", " + "Email field can't be empty!");
        res.redirect("back");
    } else {
        User.register(
            new User({
                username: req.body.username,
                institution: req.body.institution,
                email: req.body.email,
                department: req.body.dept,
                faculty: req.body.faculty,
                level: req.body.level,
                phoneNumber: req.body.phoneNumber,
            }),
            req.body.password,
            function (err, user) {
                if (err) {
                    req.flash("error", err.message);
                    res.redirect("back");
                }
                req.flash("success", "Your Account is Registered Successfully!!!");
                passport.authenticate("local")(req, res, function () {
                    res.redirect("/materials");
                });
            }
        );
    }
});

// //LOGIN ROUTE
router.post(
    "/login",
    passport.authenticate("local", {
        successRedirect: "/materials",
        failureRedirect: "/login",
        failureFlash: true,
    }),
    function (req, res) { }
);



// // LOGOUT ROUTE
router.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/login");
});





module.exports = router;
