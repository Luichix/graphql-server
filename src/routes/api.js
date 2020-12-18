const router = require('express').Router()
const middlewares = require('./middlewares')

const apiFilmsRouter = require('./api/films')
const apiUsersRouter = require('./api/users')
const apiStaffRouter = require('./api/staff')

router.use('/staff', apiStaffRouter)
router.use('/films', middlewares.checkToken ,apiFilmsRouter)
router.use('/users', apiUsersRouter)

module.exports = router
