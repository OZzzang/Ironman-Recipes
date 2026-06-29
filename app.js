const express = require('express');
const morgan = require('morgan');

// express app
const app = express();

// register view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public'));
app.use(morgan('dev'));

// routing and rendering
app.get('/', (req, res) => {
    const recipes = [
    {title: 'Arc Reactor Energy Bites', snippet: 'No‑bake oatmeal protein balls packed with peanut butter and honey. The snack that keeps your core running at 100%.'},
    {title: 'Repulsor Blast Spicy Wings', snippet: 'Crispy chicken wings tossed in a fiery sriracha‑honey glaze. One bite and you\'ll feel the power of a max‑output palm blast.'},
    {title: 'J.A.R.V.I.S. Sunday Gravy', snippet: 'Slow‑simmered tomato and meat sauce that practically cooks itself. Just set it and let your kitchen AI handle the rest.'},
    {title: 'Stark Industries Carbonara', snippet: 'Creamy, no‑cream carbonara with crispy pancetta and pecorino. High‑tech technique, old‑world soul.'},
    {title: 'House Party Protocol Sliders', snippet: 'Mini beef sliders with caramelized onions and a secret sauce. Because every great party needs backup (and backups of backups).'}
    ];
    res.render('index', { title: 'Home', recipes: recipes });
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About'});
});

app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'Create A New Recipe'});
});

// 404 page
app.use((req, res) => {
    res.status(404).render('404', { title: '404'});
});

// listen for requests
app.listen(3000);