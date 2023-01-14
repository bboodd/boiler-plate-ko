const express = require('express')
const app = express()
const port = 5000

const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://bboodd:qwlcvt15698@cluster0.mk4udkx.mongodb.net/?retryWrites=true&w=majority')
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err))



app.get('/', (req, res) => res.send('Hello World~~¾È³çÇÏ¼¼¿ä ~'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))