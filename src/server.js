const express = require ('express');
const morgan = require ('morgan');
const flash = require ('connect-flash');
const session = require('express-session');
const MySQLStore = require('express-mysql-session');
const passport = require('passport');
const cors = require('cors');
const bodyParser = require('body-parser');
const { database } = require('../database/db.keys');

// Initializations
const app = express();
require ('./lib/passport');

// Settings 
app.set ('port', process.env.PORT || 8081);
var  corsOptions = { origin: "http://localhost:8080" };

// Middlewares 
app.use (session({
    secret : 'faztmysqlnodesession',
    resave : false,
    saveUninitialized: false,
    store : new MySQLStore (database) 
}));
app.use (flash());
app.use (morgan ('dev'));
app.use (express.urlencoded({extended : false}));
app.use (express.json ());
app.use (passport.initialize());
app.use (passport.session());
app.use(cors(corsOptions));

// Global Variables
app.use ((req,res,next)=> {
    app.locals.success = req.flash ('success');
    app.locals.message = req.flash ('message');
    app.locals.user = req.user; 
    next();
});

// |Routes
app.use (require ('./routes')); 
app.use (require ('./routes/authentication'));


//  Database
const db = require("./models");
db.sequelize.sync({ force: false }).then(() => {
        console.log("Synchronized tables")
    // console.log("Drop and re-sync db.");
  });


// Starting the server   
app.listen (app.get('port'), () => {
    console.log ('Server on port', app.get('port'));

});