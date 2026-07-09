require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const recipeRoutes = require('./routes/recipeRoutes');

// express app
const app = express();

// register view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Connect to MongoDB
const dbURI = process.env.dbURI;
mongoose.connect(dbURI)
    .then(result => app.listen(3000))
    .catch(err => console.log(err));

// routing and rendering
app.get('/', (req, res) => {
    res.redirect('/recipe');
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About'});
});

// recipe routes
app.use('/recipe', recipeRoutes);

// 404 page
app.use((req, res) => {
    res.status(404).render('404', { title: '404'});
});