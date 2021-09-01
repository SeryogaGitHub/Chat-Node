const Router = require('express')
const router = new Router()
const authController = require('../controller/authController')
const {check} = require('express-validator')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/signup', [
    check('username', 'Імя користувача неможе бути пустим').notEmpty(),
    check('password', 'Пароль повинен бути більше 4 і не більше 10').isLength({min: 4, max: 10})
], authController.registration)

router.get('/signup', (req, res) => {
    res.render('signup',{
        isSignUp: true
    })
})

router.post('/login', authController.login)

router.get('/login', (req, res) => {
    res.render('login',{
        isLogin: true
    })
})

router.get('/', (req, res) => {

    const user = req.cookies.user
    console.log("index user = " + user);
    console.dir("req.params = " + req.params);

    if (user) {
        res.render('index',{
            isIndex: true,
            username: user
        })
    } else {
        res.redirect('login')
    }
})

router.post('/', (req, res) => {

    const username = req.body

    if (username) {
        console.log(username);
        res.render('index', {
            username: username,
            title: "Index page",
            isIndex: true
        })
    } else {
        res.redirect('login')
    }

})

router.get('/logout', authController.logout)

router.get('/users', authMiddleware, authController.getUsers)

module.exports = router;