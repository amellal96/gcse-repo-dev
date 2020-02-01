const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');

const Question = require('../../models/Question');
// const ObjectId = require('mongodb');

// @route   POST api/questions
// @desc    Upload question
// @access  Private
router.post('/', [],
async(req, res) => {
    console.log(req.body);
    const { question, answer, marks, difficulty, examBoards, topics, submittedBy } = req.body;
    try {
        questionUpload = new Question({
            question,
            answer,
            marks,
            difficulty,
            examBoards,
            topics,
            submittedBy
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
// @desc    Get questions
// @access  Private
router.get('/', async (req, res) => {
    try {
        const questions = await Question.find();
        res.json(questions);
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

// @route   GET api/questions
// @desc    Get submitted questions
router.get('/:submitted', async (req, res) => {
    try {
        const questions = await Question.find({ submittedBy: req.params.submitted });
        res.json(questions);
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

// @route   GET api/questions
// @desc    Get saved questions
router.get('/getsaved/:questionIds', async (req, res) => {
    console.log("Saved Questions DB call");
    try {
        const questions = await Question.find({_id: {$in: req.query.questionIds}});
        res.json(questions);
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

// @route   POST api/questions
// @desc    Publish question
router.put('/publish/:questionId', async (req, res) => {
    try {
        const question = await Question.findById(req.params.questionId);
        question.published = true;
        await question.save();
        res.json(question);
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

// @route   POST api/questions
// @desc    Unpublish question
router.put('/unpublish/:questionId', async (req, res) => {
    console.log("Unpublish Question");
    try {
        const question = await Question.findById(req.params.questionId);
        question.published = false;
        await question.save();
        res.json(question);
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

// @route    DELETE api/posts/:id
// @desc     Delete a post
// @access   Private
router.delete('/:id', async (req, res) => {
    try {
      const question = await Question.findById(req.params.id);
  
      // Check for ObjectId format and post
      if (!req.params.id.match(/^[0-9a-fA-F]{24}$/) || !question) {
        return res.status(404).json({ msg: 'Question not found' });
      }
      
      await question.remove();
  
      res.json({ msg: 'Post removed' });
    } catch (err) {
      console.error(err.message);
  
      res.status(500).send('Server Error');
    }
});

module.exports = router;