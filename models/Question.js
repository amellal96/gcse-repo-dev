const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    answer: {
        type: String,
        required: true
    },
    marks: {
        type: String,
        required: true
    },
    difficulty: {
        type: String,
        required: true
    },
    examBoards: {
        type: [String],
        required: true,
        default: []
    },
    topics: [{
        type: String,
        required: true
    }],
    dateSubmitted: {
        type: Date,
        required: true,
        default: Date.now
    },
    submittedBy: {
        type: String,
        required: true,
        default: 'Unknown User'
    },
    rating: {
        type: Number,
        required: true,
        default: 0,
        max: 5
    },
    ratings: [{
        userID: String,
        rating: Number
    }]
});

module.exports = Question = mongoose.model('question', QuestionSchema); 