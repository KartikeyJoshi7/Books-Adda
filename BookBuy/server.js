const express = require('express');
const path = require('path');
var session = require('express-session');

const app = express();

app.use(session({secret: 'kartikeycr7',resave: false, saveUninitialized: false }))
app.use(express.json())
app.use(express.urlencoded({extended: true}))


app.use('/', express.static(path.join(__dirname, 'public')))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
app.use('/api', require('./routes/api'))


app.listen(7000, () => console.log('Server started at http://localhost:7000'));
