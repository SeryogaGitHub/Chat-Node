const express = require('express');
const app = express();
const server = require('http').createServer(app);
// const io = require('socket.io').listen(server);

server.listen(3000);

app.get('/', function (request, respons) {
  respons.sendFile(__dirname + '/index.html');
})

// io.on('connection', (socket) => {
//   console.log('a user connected');
//   socket.on('disconnect', () => {
//     console.log('user disconnected');
//   });
// });