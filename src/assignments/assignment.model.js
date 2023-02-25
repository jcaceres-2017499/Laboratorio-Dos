'use strict'

const mongoose = require('mongoose')

const assignmentSchema = mongoose.Schema({
    idUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    idCourseOne: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },
    idCourseTwo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },
    idCourseThree: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    }
    
});

module.exports = mongoose.model('Assignment', assignmentSchema);