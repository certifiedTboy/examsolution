const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const LocalStrategy = require("passport-local");
const ObjectId = require('mongodb').ObjectId;
const passport = require("passport");
const { transport } = require('../utils/nodeMailer')
const expressSanitizer = require('express-sanitizer');
const User = require("../models/user");
const async = require("async");
const crypto = require("crypto");
const router = express.Router();


router.use(bodyParser.urlencoded({ extended: false }))
router.use(require("express-session")({
    secret: "fasttrack is the best in the whole of Nigera",
    resave: false,
    saveUninitialized: false
}));

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

router.use(passport.initialize());
router.use(passport.session());


// // //PASSWORD RESET
router.get('/forgot', (req, res) => {
    res.render('user/forgot');
});

router.post('/forgot', (req, res, next) => {
    async.waterfall([
        function (done) {
            crypto.randomBytes(20, (err, buf) => {
                let token = buf.toString('hex');
                done(err, token);

            });

        },
        function (token, done) {
            User.findOne({ email: req.body.email }, (err, user) => {
                if (!user) {
                    req.flash('error', 'No account with the email address exist.');
                    return res.redirect('/forgot');
                }

                user.resetPasswordToken = token;
                user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

                user.save((err) => {
                    console.log(user)
                    done(err, token, user);
                });
            });
        },
        function (token, user, done) {
            const mailOptions = {
                to: user.email,
                from: 'urinfo.examssolutions12@gmail.com',
                subject: 'Request for Password reset',
                html: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
                    'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                    'http://' + req.headers.host + '/reset/' + token + '\n\n' +
                    'If you did not request this, please ignore this email and your password will remain unchanged.\n'
            };
            transport.sendMail(mailOptions, (err) => {
                req.flash('success', 'An e-mail has been sent to ' + user.email + ' with further instructions.');
                done(err, 'done');
            });
        }
    ], function (err) {
        if (err) return next(err);
        res.redirect('/forgot');
    });
});

router.get('/reset/:token', (req, res) => {
    User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, (err, user) => {
        if (!user) {
            req.flash('error', 'Password reset token is invalid or has expired.');
            return res.redirect('/forgot');
        }
        res.render('user/reset', { token: req.params.token });
    });
});

router.post('/reset/:token', (req, res) => {
    async.waterfall([
        function (done) {
            User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, (err, user) => {
                if (!user) {
                    req.flash('error', 'Password reset token is invalid or has expired.');
                    return res.redirect('back');
                }
                if (req.body.password === req.body.confirm) {
                    user.setPassword(req.body.password, (err) => {
                        user.resetPasswordToken = undefined;
                        user.resetPasswordExpires = undefined;

                        user.save(function (err) {
                            req.logIn(user, (err) => {
                                done(err, user);
                            });
                        });
                    })
                } else {
                    req.flash("error", "Passwords do not match.");
                    return res.redirect('back');
                }
            });
        },
        function (user, done) {

            const mailOptions = {
                to: user.email,
                from: 'urinfo.examssolutions12@gmail.com',
                subject: 'Your password has been changed',
                text: 'Hello,\n\n' +
                    'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n'
            };
            transport.sendMail(mailOptions, (err) => {
                req.flash('success', 'Success! Your password has been changed.');
                done(err);
            });
        }
    ], function (err) {
        res.redirect('/materials');
    });
});




module.exports = router;