const express = require('express');
const Recipe = require('../models/recipe');

const router = express.Router();

router.get('/recipe', (req, res) => {
    Recipe.find().sort({ createdAt: -1 })
        .then(result => {
            res.render('index', { title: 'All Recipes', recipes: result });
        })
        .catch(err => {
            console.log(err);
        });
});

router.post('/recipe', (req, res) => {
    const recipe = new Recipe(req.body);
    
    recipe.save()
        .then(result => {
            res.redirect('/recipe');
        })
        .catch(err => {
            console.log(err);
        });
});

router.get('/recipe/create', (req, res) => {
    res.render('create', { title: 'Create A New Recipe'});
});

router.get('/recipe/:id', (req, res) => {
    const id = req.params.id
    Recipe.findById(id)
        .then(result => {
            res.render('details', { recipe: result, title: 'Recipe Details' });
        })
        .catch(err => {
            console.log(err);
        });
});

module.exports = router;