const express = require('express');
const app = express()
const http = require('http');
const mongoose = require('mongoose')
const path = require('path')
const exphbs = require('express-handlebars')
const chatRouters = require('./routes/routes')
// const server = http.createServer(app);
// const { Server } = require("socket.io");
// const io = new Server(server);

const PORT = process.env.PORT || 3000

const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs'
});

app.engine('hbs', hbs.engine) // двіжок для рендиренга сторінок
app.set('view engine', 'hbs')
app.set('views', 'views') // реєстрація папки де сберігаються види(сторінки)

app.use(express.urlencoded({extended: true}))  //для рооти body
app.use(express.static(path.join(__dirname, 'styles')))

app.use(chatRouters)

async function start(){
  try {
    await mongoose.connect('mongodb+srv://Seryoga:serg123456789@cluster0.a1low.mongodb.net/Chat', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    });

    app.listen(PORT, () => {
      console.log('Сервер запущений');
    });
  } catch(e) {
    console.log(e);
  }
}

// io.on('connection', (socket) => {
//   console.log('Підключений');
//   connections.push(socket);
//
//   socket.on('disconnect', () => {
//     connections.slice(connections.indexOf((socket)), 1)
//     console.log('Відключений');
//   });
//
//   socket.on('send mess', function (data){
//
//     const nameId = `SELECT * FROM users WHERE name=?`;
//     const filter = [data.nameNew];
//
//     //шукаємо корустувача
//     connection.query(nameId, filter, function(err, results) {
//       if(err) console.log(err);
//
//       if(results.length){
//         newUser(data)
//       } else {
//         console.log("Користувач відсутній");
//       }
//     });
//   })
// });

start();