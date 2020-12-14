const express = require ('express');
const { route } = require('.');
const router = express.Router();
const passport = require('passport');
const {isLoggedIn, isNotLoggedIn} = require('../lib/auth');


router.get ('/signup', isNotLoggedIn,(req, res) => {
    console.log('Hola Mundo');  
    // res.render('auth/signup');
});

router.post('/signup', (req,res) => {
    console.log ('Prueba')
});

module.exports = router;
