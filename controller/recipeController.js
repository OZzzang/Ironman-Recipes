const Recipe = require('../models/recipe');

// recipe_index, recipe_details, recipe_create_get, recipe_create_post

const recipe_index = (req, res) => {
    Recipe.find().sort({ createdAt: -1 })
        .then(result => {
            res.render('recipes/index', { title: 'All Recipes', recipes: result });
        })
        .catch(err => {
            console.log(err);
        });
};

const recipe_details = (req, res) => {
    const id = req.params.id
    Recipe.findById(id)
        .then(result => {
            res.render('recipes/details', { recipe: result, title: 'Recipe Details' });
        })
        .catch(err => {
            res.status(404).render('404', { title: 'Recipe not found' });
        });
};

const recipe_create_post = (req, res) => {
    const recipe = new Recipe(req.body);
    
    recipe.save()
        .then(result => {
            res.redirect('/recipe');
        })
        .catch(err => {
            console.log(err);
        });
};

const recipe_create_get = (req, res) => {
    res.render('recipes/create', { title: 'Create A New Recipe'});
};

module.exports = {
    recipe_index,
    recipe_details,
    recipe_create_get,
    recipe_create_post
};