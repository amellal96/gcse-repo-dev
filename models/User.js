const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    dateJoined: {
        type: Date,
        required: true,
        default: Date.now
    },
    school: {
        type: String
    },
    accountType: {
        type: String,
        enum: ['student', 'teacher'],
        required: true
    },
    savedQuestions: [{
        type: Object,
        required: true,
        default: []
    }]
});

module.exports = User = mongoose.model('user', UserSchema);