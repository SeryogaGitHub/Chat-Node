const express = require('express');
const app = express()
const mongoose = require('mongoose') // потрібно для роботи з базою данних mongodb
const path = require('path')
const exphbs = require('express-handlebars')
const PORT = process.env.PORT || 3000

// const chatRouters = require('./routes/routes')
const authRouter = require('./routes/authRoter')

const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs'
});

app.engine('hbs', hbs.engine) // двіжок для рендиренга сторінок
app.set('view engine', 'hbs')
app.set('views', 'views') // реєстрація папки де сберігаються види(сторінки)

app.use(express.json())
app.use(express.urlencoded({extended: true}))  //для рооти body

app.use(express.static(path.join(__dirname, 'styles'))) // підключення стилів
// app.use(chatRouters)

app.use("/", authRouter)

const start = async () => {
  try {
    await mongoose.connect('mongodb+srv://Seryoga:serg123456789@cluster0.a1low.mongodb.net/Chat', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    });

    app.listen(PORT, () => {
      console.log(`Сервер запущений по лінку http://localhost:${PORT}/`);
    });
  } catch(e) {
    console.log(e);
  }
}

start();