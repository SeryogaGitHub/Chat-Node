const {Router} = require('express')
const Chat = require('../models/Chat')
const router = Router()

router.get('/', async (req, res) => {
  const chat = await Chat.find({}).lean()

  console.log(chat);
  res.render('index', {
    title: 'Чат',
    isIndex: true,
    chat: chat,
    name: chat.length ? chat[0].name : false
  })
})

router.get('/login', async (req, res) => {
  const login = await Chat.find({}).lean()
  res.render('login', {
    title: 'Сторвінка логіна',
    isLogin: true
  })
})

router.post('/login', (req, res) => {
  const chat = new Chat({
    name: req.body.name
  })

  const query  = Chat.where({ name: chat.name });
  query.findOne(async function (err, name) {
    if (err) return handleError(err);
    if (name === chat.name) {
      res.redirect('/login')
    } else {
      console.log('Немає співпадіння - ' + chat.name);
      res.redirect('/login')
    }
  });

  // await chat.save();
  // res.redirect('/login')
  // console.log(req);
})

router.get('/signup', async (req, res) => {
  const login = await Chat.find({}).lean()
  res.render('signup', {
    title: 'Сторвінка реєстрації',
    isSignUp: true
  })
})

router.post('/sign-up', (req, res) => {
  const chat = new Chat({
    name: req.body.name
  })

  const query  = Chat.where({ name: chat.name });
  query.findOne(async function (err, name) {
    if (err) return handleError(err);
    if (name === chat.name) {
      console.log('Такий користувач вже є');
    } else {
      console.log('Зареєстрований новий користувач ' + chat.name);
      await chat.save();
      res.redirect('/')
    }
  });

  // await chat.save();
  // res.redirect('/login')
  // console.log(req);
})

// router.post('/login', async (req, res) => {
//   const todo = new Chat({
//     name: req.body.name,
//     pass: req.body.pass,
//     passTo: req.body.passTo
//   })
//
//   console.log(req.body);
//   console.log(req.body.name);
//   console.log(req.body.pass);
//   console.log(req.body.passTo);
//
//   await todo.save();
//   res.redirect('/')
// })

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