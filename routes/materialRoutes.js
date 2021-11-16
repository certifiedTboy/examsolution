const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ObjectId = require("mongodb").ObjectId;
const passport = require("passport");
const expressSanitizer = require("express-sanitizer");
const User = require("../models/user");
const comment = require("../models/comment");
const fs = require('fs')
const question = require("../models/question");
const Material = require("../models/material");
const {
    isLoggedIn,
    checkPostOwnership,
    checkPostOwnership2,
    checkCommentOwnership,
} = require("../middleware");
const async = require("async");
const upload = require("../config/multer");
const fileWorker = require("../controllers/file.controller.js");
const router = express.Router();

const picPath = path.resolve(__dirname, "public");
router.use(express.static(picPath));
router.use(bodyParser.urlencoded({ extended: false }));
router.use(expressSanitizer());

router.use(methodOverride("_method"));

// MATERIAL PAGE ROUTES
router.get("/materials", isLoggedIn, (req, res) => {
    res.render("materials/materials");
});

router.get("/materials2", isLoggedIn, async (req, res) => {
    try {
        const currentUser = req.user;
        const materials = await Material.find();
        const questions = await question.find();
        let allPost = [...materials, ...questions];
        if (!allPost) {
            res.status(404).json({ message: "No post found" });
        } else {
            res.json({ msg: "success", material: allPost, user: currentUser });
        }
    } catch (error) {
        res.status(404).json({ msg: 'Something went wrong' })
    }
});

// MATERIAL POST ROUTE

router.post("/materials", upload.single("pic"), fileWorker.uploadFile);
router.put("/materials/:id", upload.single("pic"), fileWorker.uploadFile);

//SHOW PAGE ROUTES
router.get("/materials/:id", isLoggedIn, async (req, res) => {
    try {
        const material = await Material.findById(req.params.id)
            .populate("comments")
            .exec();
        if (!material) {
            res.status(404).json({ message: "No blog found" });
        } else {
            res.render("materials/show", { material });
        }
    } catch (error) {
        res.status(404).json({ message: "Something went wrong" });
    }
});

// MATERIAL DELETE ROUTE
router.delete('/materials/deletepost/:id', isLoggedIn, checkPostOwnership2, async (req, res) => {
    try {
        const material = await Material.findByIdAndRemove(req.params.id, (err, mat) => {
            if (err) {
                res.status(404).json({ message: 'something went wrong' })
            } else {
                res.redirect('/materials')
            }
        })

    } catch (error) {
        res.status(404).json({ message: 'something went wrong' })
    }
})


router.delete(
    "/materials/deletepost",
    isLoggedIn,
    checkPostOwnership,
    (req, res) => {
        Material.removeTask2(req.body.id, (err, data) => {
            if (err) {
                res.json({ msg: "error" });
            } else {
                res.json({ msg: "success" });
            }
        });
    }
);

// GET MATERIAL EDIT FORM ROUTE
router.get(
    "/materials/:id/edit",
    isLoggedIn,
    async (req, res) => {
        try {
            const material = await Material.findById(req.params.id);
            if (!material) {
                res.status(404).json({ message: "No post found" });
            } else {
                res.json({ msg: 'success', material });
            }
        } catch (error) {
            res.status(404).json({ message: "something went wrong" });
        }
    }
);

// EDIT MATERIAL ROUTES
router.put(
    "/materials/:id",
    isLoggedIn,
    checkPostOwnership2,
    upload.single("pic"),
    async (req, res) => {
        const newFile = {
            desc: req.body.desc,
            course: req.body.course,
            code: req.body.code,
            topic: req.body.topic,
            picss: "upload/" + req.file.originalname,
            user: {
                username: req.user.username,
                id: req.user._id,
            },
        };
        try {
            const material = await Material.findByIdAndUpdate(req.params.id, newFile);
            material.save();
            if (!material) {
                res.status(404).json({ message: "something went wrong" });
            } else {
                res.redirect("back");
            }
        } catch (error) {
            res.status(404).json({ message: "something went wrong" });
        }
    }
);

// COMMENT DELETE ROUTE
router.delete(
    "/comment/:id",
    isLoggedIn,
    checkCommentOwnership,
    async (req, res) => {
        try {
            const comments = await comment.findByIdAndDelete(
                req.params.id,
                (err, cmt) => {
                    if (err) {
                        res.status(404).json({ message: "something went wrong" });
                    } else {
                        // res.redirect('back')
                        res.json({ msg: "success" });
                    }
                }
            );
        } catch (error) {
            res.status(404).json({ message: "something went wrong" });
        }
    }
);

module.exports = router;
