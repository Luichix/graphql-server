const router = require('express').Router();
const user = require('./../../controllers/users')
const { check } = require('express-validator')

router.get('/', user.findAll) 

router.post('/register',[
    check('username','El nombre de usuario es obligatorio').not().isEmpty(),
    check('password','El password es obligatorio').not().isEmpty(),
    check('email','El email debe estar correctamente').isEmail()
], user.create)

router.post('/login', user.findOne)

module.exports = router;