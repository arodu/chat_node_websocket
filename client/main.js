var socket = io.connect('http://127.0.0.1:8080', {forceNew: true})

socket.on('messages', function(data){
  console.log(data)
  if(data.private==true){
    render_private(data)
  }else{
    render(data);
  }
})

function render(data){
  let html = `<div>
    <strong>${data.author}</strong>
    <em>${data.text}</em>
  </div>`;

  document.getElementById('messages').innerHTML = document.getElementById('messages').innerHTML + html;
}

function render_private(data){
  let html = `<div style="color:green">
    <strong>${data.author}</strong><small>Mensaje Privado</small>
    <em>${data.text}</em>
  </div>`;

  document.getElementById('messages').innerHTML = document.getElementById('messages').innerHTML + html;
}

function addMessages(form){
  let payload = {
    author: document.getElementById('username').value,
    text: document.getElementById('text').value,
    users: document.getElementById('users').value,
  }

  socket.emit('new-message', payload)

  return false;
}
