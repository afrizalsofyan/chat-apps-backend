const user = require('./user')

const router = require('express').Router()

router.use('/', require('./user'))
router.use('/message/', require('./message'))

module.exports = router
