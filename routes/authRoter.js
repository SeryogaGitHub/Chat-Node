const Router = require('express')
const router = new Router()
const authController = require('../controller/authController')

router.post('/registration', authController.registration)
router.post('/login', authController.login)
router.get('/auth', authController.getUsers)

module.exports = router;