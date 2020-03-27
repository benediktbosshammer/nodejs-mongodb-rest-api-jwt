const mongoose = require('mongoose');

const notesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    createdDate: {
        type: String,
        required: true,
        default: Date.now
    }
})

module.exports = mongoose.model('Note', notesSchema)