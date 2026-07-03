require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Recipe = require('./models/recipe');

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
app.get('/recipe', (req, res) => {
    Recipe.find().sort({ createdAt: -1 })
        .then(result => {
            res.render('index', { title: 'All Recipes', recipes: result });
        })
        .catch(err => {
            console.log(err);
        });
});

app.post('/recipe', (req, res) => {
    const recipe = new Recipe(req.body);
    
    recipe.save()
        .then(result => {
            res.redirect('/recipe');
        })
        .catch(err => {
            console.log(err);
        });
});

app.get('/recipe/create', (req, res) => {
    res.render('create', { title: 'Create A New Recipe'});
});

app.get('/recipe/:id', (req, res) => {
    const id = req.params.id
    Recipe.findById(id)
        .then(result => {
            res.render('details', { recipe: result, title: 'Recipe Details' });
        })
        .catch(err => {
            console.log(err);
        });
});

// 404 page
app.use((req, res) => {
    res.status(404).render('404', { title: '404'});
});