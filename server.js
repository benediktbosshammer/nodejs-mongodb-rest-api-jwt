const express = require('express');
const app = express();
const mongoose = require('mongoose');

// environment variables
require('dotenv').config();

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connection opened'));

app.listen(3000);
// ROUTES

app.use(express.json())

const notesRouter = require('./routes/notes');
app.use('/notes', notesRouter);

const authRouter = require('./routes/auth');
app.use('/auth', authRouter);

app.get('/', (req, res) => {
    res.send("Hello world")
});

app.get('/notes', (req, res) => {
    res.send("These are the notes")
});