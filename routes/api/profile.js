const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator/check');

// @route    GET api/profile/me
// @desc     Get current user's profile
// @access   Private
router.get('/', auth, (req, res) => res.send('Profile route'));



module.exports = router;