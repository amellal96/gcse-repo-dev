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
    }
});

module.exports = Question = mongoose.model('question', QuestionSchema); 