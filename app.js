const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const mysql = require('mysql');
const config = require('./config.json');
const productDAO = require('./lib/models/productDAO');
const antiqueDAO = require('./lib/models/antiqueDAO');
const pictureDAO = require('./lib/models/pictureDAO');
const passport = require('passport');
const initializePassport = require('./passport-config');
const authenticationDAO = require('./lib/models/authenticationDAO.js');
const flash = require('express-flash');
const session = require('express-session');
const methodOverride = require('method-override');
const app = express();

const users = []

initializePassport(passport, authenticationDAO.getUserByEmail, authenticationDAO.getUserByID);

// Handlebars middleware
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(flash());
app.use(session({
   secret: config.sessionSecret,
   resave: false,
   saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'));

// Homepage route
app.get('/', checkAuthenticated, async (req, res) => {
   let antiques = await antiqueDAO.getAllProducts();
   let user = await req.user;

   //Without this code, user would be of type RowDataPacket, which doesn't enable the retrieval of data members
   user = JSON.parse(JSON.stringify(user));
   res.render('index', {
   antiques
});
});

// Detail route
app.get('/detail', checkAuthenticated, async (req, res) => {
   let id = await req.query.id;
   let antique = await antiqueDAO.getProductByID(id);
   antique = JSON.parse(JSON.stringify(antique))

   let pictures = await pictureDAO.getPictureByProductID(id);
   pictures = JSON.parse(JSON.stringify(pictures))

   res.render('detail', {
      antique,
      pictures
   });
});

// Register route
app.get('/register', checkNotAuthenticated, async (req, res) => {
   res.render('register');
});

// Register route
app.get('/login', checkNotAuthenticated, async (req, res) => {
   res.render('login');
});

// Privacy route
app.get('/privacy', async (req, res) => {
   res.render('privacy');
});

// Product API routes
app.use('/api/products', checkAuthenticated, require('./routes/api/products'));

// Authentication routes
app.use('/authentication', require('./routes/api/authentication'));

// Picture route
app.use(express.static('public'));

function checkAuthenticated(req, res, next){
   if(req.isAuthenticated()){
      return next();
   }

   res.redirect('/login');
}

function checkNotAuthenticated(req, res, next){
   if(req.isAuthenticated()){
      return res.redirect('/');
   }

   next();
}

const PORT = config.port || 3000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
