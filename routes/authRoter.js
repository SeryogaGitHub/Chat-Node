const Router = require('express')
const router = new Router()
const authController = require('../controller/authController')
const {check} = require('express-validator')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/registration', [
    check('username', 'Імя користувача неможе бути пустим').notEmpty(),
    check('password', 'Пароль повинен бути більше 4 і не більше 10').isLength({min: 4, max: 10})
],authController.registration)
router.post('/login', authController.login)
router.get('/', (reg, res) => {
    res.render('index')
})
router.get('/users', authMiddleware, authController.getUsers)

module.exports = router;