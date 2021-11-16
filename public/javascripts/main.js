const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const likeForm = document.getElementById('like-form')
const userLikes = document.querySelector('.user-likes')




// Get username and room from URL
const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

const socket = io();

// Join chatroom
socket.emit('joinRoom', { username, room });
// send material comment to server
socket.on('message', (message) => {
  outputMessage(message);
});

// Message submit
chatForm.addEventListener('submit', (e) => {
  e.preventDefault();
  // Get message text
  let msg = e.target.elements.msg.value;

  msg = msg.trim();

  if (!msg) {
    return false;
  }
  // Emit comment to server
  socket.emit('chatMessage', msg);

  // Clear input
  e.target.elements.msg.value = '';
  e.target.elements.msg.focus();
});

const outputMessage = (message) => {
  const commentDiv = document.getElementById('comment')
  commentDiv.innerHTML += ` <div class="comment_div">
  <div style="display: inline;">
    <h5 class="comment_username"><i class="far fa-user-circle"></i><a href="/userprofile/username/${message.username}" class="comment_usernamelink"> ${message.username}</a></h5>
    <div class="dropdown_div">
      <div class="dropdown">
        <button class="dropdown-toggle dropdown_btn2" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
        <span class="dropdown_btndot"><a class="dropdownbtn_link" href="" title="Delete Comment"> ...</a></span> 
        </button>
        <ul class="dropdown-menu dropdown-menu2" aria-labelledby="dropdownMenuButton1">
           
        <li style="padding-left: 13px; color:black;">
        <form action="/comment/${message._id}?_method=DELETE" method="POST"> 
          <input type="submit" value="Delete" style="background: none;  border: none; font-weight: 600; ">
        </form>	
      </li>       
        </ul>
        </div>
    </div>
  
  </div>
  <h5  class="comment_time"> ${message.time} </h5>
  <pre class="comment_text"> ${message.text}
  

</div> `
}





