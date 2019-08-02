const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)

var message

app.use(express.static('client'))

app.get('/', function(req, res){
  res.status(200).send("Hola Mundo!!")
})

io.on('connection', function(socket){
  console.log('Alguien se ha conectado con Sockets')



  socket.on('new-message', function(data){
    io.sockets.emit('messages', data)
  })

})

server.listen(8080, function(){
  console.log("Run in 127.0.0.1:8080")
})

