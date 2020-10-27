const express = require('express');
const app = express();
const server = require('http').Server(app)
const path = require('path');
const io = require('socket.io')(server)

app.use('/', express.static(path.join(__dirname, 'client/dist/client')))

io.on('connection', socket => {
    console.log('new connection made');
    socket.on('newmessage', data => {
        let obj = {text: data, time: getCurrentDate()}
        io.sockets.emit('securetunnel', obj);
    })
})


server.listen(8080, () => {
    console.log("Listening on port " + 8080);
});

function getCurrentDate() {
    let d = new Date();
    return d.toLocaleString();
  }