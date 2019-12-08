const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');

const Question = require('../../models/Question');

// @route   POST api/questions
// @desc    Upload question
// @access  Public
router.post('/', [],
async(req, res) => {
    console.log(req.body);
    const { question, answer, marks, difficulty } = req.body;
    try {
        questionUpload = new Question({
            question,
            answer,
            marks,
            difficulty
        })
        console.log("I GOT UP TO THERE");
        // console.log(question);
        await questionUpload.save();
    }
    catch(err) {
        console.error(err.message);
        console.error("THIS DIDN'T WORK");
        res.status(500).send('Server error');
    }
}
);

module.exports = router;