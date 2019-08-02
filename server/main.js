const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)

var users = []
var i = 1;

app.use(express.static('client'))

app.get('/', function(req, res){
  res.status(200).send("Hola Mundo!!")
})

io.on('connection', function(socket){
  console.log('Alguien se ha conectado con Sockets')

  users[i] = socket
  i++

  socket.on('new-message', function(data){
    //console.log(data)
    if(data.users == 'all'){
      data.private = false
      io.sockets.emit('messages', data)
    }else{
      data.private = true
      if (typeof users[data.users] != "undefined"){
        socket.emit('messages', data)
        users[data.users].emit('messages', data)
      }
    }
  })

})

server.listen(8080, function(){
  console.log("Run in 127.0.0.1:8080")
})

