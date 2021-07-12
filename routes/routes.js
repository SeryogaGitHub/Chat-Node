const {Router} = require('express')
const Chat = require('../models/Chat')
const router = Router()

router.get('/', async (req, res) => {
  const todos = await Chat.find({}).lean()
  res.render('index', {
    title: 'Головна сторінка',
    isIndex: true,
    todos: todos
  })
})

router.get('/login', async (req, res) => {
  const login = await Chat.find({}).lean()
  res.render('login', {
    title: 'Сторвінка авторизація',
    isIndex: true,
    todos: login
  })
})

router.get('/create', (req, res) => {
  res.render('create', {
    title: 'Create сторінка',
    isCreate: true
  })
})

router.post('/create', async (req, res) => {
  const todo = new Chat({
    title: req.body.title
  })

  await todo.save();
  res.redirect('/')
})

router.post('/complete', async (req, res) => {
  const todo = await Chat.findById(req.body.id)

  todo.completed = !!req.body.completed
  await todo.save();
  res.redirect('/')
})

module.exports = router