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

// @route   PUT api/questions
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

// @route   PUT api/questions
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

// @route PUT api/questions
// @desc Rate question
router.put('/rate', async (req, res) => {
    console.log("Rating Questions DB");
    try {
        const question = await Question.findById(req.body.questionId);
        
        if (!(question.ratings.some(rating => rating.userID === req.body.userID))) {
            // User has not rated the question
            console.log("User has not rated this question");
            
            question.ratings.unshift({
                userID: req.body.userID,
                rating: req.body.rating
            })

            console.log(`Rating before change: ${question.rating}`);
            // question.rating = req.body.rating == 1 ? question.rating++ : question.rating--;
            question.rating = parseInt(question.rating) + parseInt(req.body.rating);
            console.log(`Rating after change: ${question.rating}`);
        }
        else {
            console.log("User has already rated question");
            userRating = question.ratings.find(rating => 
                rating.userID === req.body.userID
            );

            const updateIndex = question.ratings.indexOf(userRating);
            
            if (userRating.rating == req.body.rating) {
                // User is removing their rating
                console.log("User is removing their rating");
                question.ratings.splice(updateIndex, 1);
                question.rating = parseInt(question.rating) - req.body.rating;
            }
            else {
                // User is switching their rating (e.g. upvote to downvote)
                console.log("User is switching their vote");
                userRating.rating = userRating.rating == 1 ? -1 : 1;
                question.ratings[updateIndex] = userRating;

                question.rating = parseInt(question.rating) + (2 * parseInt(req.body.rating));
            }
        }

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