const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator/check');

const auth = require('../../middleware/auth');

const User = require('../../models/User');

// @route   POST api/users
// @desc    Register users
// @access  Public
router.post('/', [
    check('firstName', 'First Name is required').not().isEmpty(),
    check('surname', 'Surname is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
    ], 
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { firstName, surname, email, password, accountType } = req.body;

        try {
            let user = await User.findOne({ email });
            if(user) {
                return res.status(400).json({ erros: [ { msg: 'User already exists' } ] });
            }
            user = new User({
                firstName,
                surname,
                email,
                password,
                accountType
            });

            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);

            await user.save();

            const payload = {
                user: {
                    id: user.id
                }
            }

            jwt.sign(
                payload, 
                config.get('jwtSecret'), 
                { expiresIn: 360000 },
                (err, token) => {
                    if(err) throw err;
                    res.json({ token });
                });

        }   
        catch(err) { 
            console.error(err.message);
            res.status(500).send('Server error');
        }
    }
);

// @route   POST api/users
// @desc    Save question
// @access  Public
router.post('/save/:questionId', auth,  async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.user.id });
        user.savedQuestions.unshift(req.params.questionId);

        await user.save();
        res.json(user);
    }   catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    } 
});

// @route   DELETE api/users
// @desc    Unsave question
// @access  Public
router.delete('/unsave/:questionId', auth,  async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.user.id });

        // Get remove index
        const removeIndex = user.savedQuestions.indexOf(req.params.questionId);

        user.savedQuestions.splice(removeIndex, 1);

        await user.save();

        res.json(user);
    }   catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    } 
});

module.exports = router;