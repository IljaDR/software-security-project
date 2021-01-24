const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const mysql = require('mysql')
const config = require('./config.json');
const productDAO = require('./lib/models/productDAO.js');

const app = express();

// Handlebars middleware
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Homepage route
app.get('/', async (req, res) => {
   let products = await productDAO.getAllProducts();
   res.render('index', {
   title: 'Webshop',
   products
});
});

// Register route
app.get('/register', async (req, res) => {
   res.render('register');
});

// Privacy route
app.get('/privacy', async (req, res) => {
   res.render('privacy');
});

// Product API routes
app.use('/api/products', require('./routes/api/products'));

const PORT = config.port || 3000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
