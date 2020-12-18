const express = require ('express');
const morgan = require ('morgan');
const cors = require('cors');
const apiRouter = require('./routes/api')

// Initializations
const app = express();

// Settings 
app.set ('port', process.env.PORT || 8081);
var  corsOptions = { origin: "http://localhost:8080" };

// Middlewares 
app.use (morgan ('dev'));
app.use (express.urlencoded({extended : false}));
app.use (express.json ());
app.use(cors(corsOptions));

// |Routes
app.use ('/api',apiRouter); 

//  Database
const db = require("./models");

// Starting the server   
app.listen (app.get('port'), () => {
    console.log ('Server on port', app.get('port'));

});