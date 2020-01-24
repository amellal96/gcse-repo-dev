const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');

const Question = require('../../models/Question');

// @route   POST api/questions
// @desc    Upload question
// @access  Private
router.post('/', [],
async(req, res) => {
    console.log(req.body);
    const { question, answer, marks, difficulty, examBoards, topics } = req.body;
    try {
        questionUpload = new Question({
            question,
            answer,
            marks,
            difficulty,
            examBoards,
            topics
        })
        
        await questionUpload.save();
    }
    catch(err) {
        console.error(err.message);
        console.error("THIS DIDN'T WORK");
        res.status(500).send('Server error');
    }
}
);

// @route   POST api/questions
// @desc    Get question
// @access  Private
router.get('/', async (req, res) => {
    console.log("GETTING QUESTIONS - FIRST LOGGING");
    try {
        const questions = await Question.find();
        res.json(questions);
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

module.exports = router;