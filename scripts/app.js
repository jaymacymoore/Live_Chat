// Dom Queries
const chatList = document.querySelector('.chat-list');
const newChatForm = document.querySelector('.new-chat');
const newNameForm = document.querySelector('.new-name');
const updateMssg = document.querySelector('.update-mssg');
const rooms = document.querySelector('.chat-rooms');
const clear = document.querySelector('.btn-clear')

// Add a New Chat
newChatForm.addEventListener('submit', e => {
  e.preventDefault();
  const message = newChatForm.message.value.trim();
  chatroom.addChat(message)
    .then(() => newChatForm.reset())
    .catch(err => console.log(err));
});

// Update Userame
newNameForm.addEventListener('submit', e => {
  e.preventDefault();
  // Update Name via Chatroom Class
  const newName = newNameForm.name.value.trim();
  chatroom.updateName(newName);
  // Reset Form
  newNameForm.reset();
  // Show/Hide Update Message
  updateMssg.classList.remove('d-none');
  updateMssg.innerText = `Your name was updated to: ${newName}`;
  setTimeout(() => updateMssg.innerText = '', 3000);
  setTimeout(() => updateMssg.classList.add('d-none'), 3000);
});

// Update Chatroom
rooms.addEventListener('click', e => {
  e.preventDefault()
  if(e.target.tagName === 'BUTTON'){
    chatUI.clear();
    chatroom.updateRoom(e.target.getAttribute('id'));
    chatroom.getChats(chat => chatUI.render(chat));
  }
});

// Clear Chats
clear.addEventListener('click', e => {
  e.preventDefault();
  const id = e.target.parentElement.getAttribute('data-id');
  db.collection('Live_Chat').doc(id).delete().then(() => {
    console.log('Chats Cleared');
  });
});

// Check Local Storage for Data
const username = localStorage.username ? localStorage.username : 'anon';

// Class Instances
const chatUI = new ChatUI(chatList);
const chatroom = new Chatroom('general', username);

// Get Chats and Render
chatroom.getChats(data => chatUI.render(data));