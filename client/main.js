var socket = io.connect('http://127.0.0.1:8080', {forceNew: true})

socket.on('messages', function(data){
  console.log(data)
  render(data);
})

function render(data){
  let html = `<div>
    <strong>${data.author}</strong>
    <em>${data.text}</em>
  </div>`;

  document.getElementById('messages').innerHTML = document.getElementById('messages').innerHTML + html;
}

function addMessages(form){
  let payload = {
    author: document.getElementById('username').value,
    text: document.getElementById('text').value,
  }

  socket.emit('new-message', payload)

  return false;
}
