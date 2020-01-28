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

// @route   POST api/questions
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

// @route   POST api/questions
// @desc    Publish/unpublish question
// router.get('/:publish', async (req, res) => {
//     try {
//         const questions = await Question.findById(req.params.id);
//         res.json(questions);
//     } catch(err) {
//         console.error(err.message);
//         res.status(500).send('Server Error');
//     }
// })

// @route    DELETE api/posts/:id
// @desc     Delete a post
// @access   Private
// router.delete('/:id', auth, async (req, res) => {
//     try {
//       const question = await Question.findById(req.params.id);
  
//       // Check for ObjectId format and post
//       if (!req.params.id.match(/^[0-9a-fA-F]{24}$/) || !question) {
//         return res.status(404).json({ msg: 'Question not found' });
//       }
  
//       // Check user
//     //   if (question.user.toString() !== req.user.id) {
//     //     return res.status(401).json({ msg: 'User not authorised' });
//     //   }
  
//       await question.remove();
  
//       res.json({ msg: 'Post removed' });
//     } catch (err) {
//       console.error(err.message);
  
//       res.status(500).send('Server Error');
//     }
// });

module.exports = router;