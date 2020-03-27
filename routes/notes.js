const express = require('express')
const router = express.Router()
const Note = require('../models/Note');
const verify = require('./verifyToken');

// Getting all
router.get('/', verify, async (req, res) => {
    try {
        const notes = await Note.find()
        res.status(200).json(notes);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// Getting one
router.get('/:id', verify, getNote, (req, res) => {
    res.json(res.note)
});

// Creating one
router.post('/', verify, async (req, res) => {
    const note = new Note({
        title: req.body.title,
        content: req.body.content
    });
    try {
        const newNote = await note.save();
        res.status(201).json(newNote)
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
});

// Updating one
router.patch('/:id', verify, getNote, async (req, res) => {
    if (req.body.title != null) {
        res.note.title = req.body.title
    }
    if (req.body.content != null) {
        res.note.content = req.body.content
    }

    try {
        const updatedNote = await res.note.save()
        res.json(updatedNote)
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }

});

// Deleting one
router.delete('/:id', verify, getNote, async (req, res) => {
    try {
        await res.note.remove()
        res.json({
            message: "Deleted note",
            details: res.note.id
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
});

async function getNote(req, res, next) {
    let note;
    try {
        note = await Note.findById(req.params.id);
        if (note == null) {
            return res.status(404).json({
                message: 'Can not find note',
                details: req.params.id
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
    res.note = note
    next()
}

module.exports = router;