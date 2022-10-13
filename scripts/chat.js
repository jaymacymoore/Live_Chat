class Chatroom {
  constructor(room, username){
    this.room = room;
    this.username = username;
    this.chats = db.collection('Live_Chat');
    this.unsub; 
  };
  async addChat(message){
    // Format Chat Object
    const now = new Date();
    const chat = {
      message,
      username : this.username,
      room: this.room,
      created_at: firebase.firestore.Timestamp.fromDate(now)
    };
    // Save Chat Document
    const response = await this.chats.add(chat);
    return response;
  };
  getChats(callback){
    this.unsub = this.chats
      .where('room', '==', this.room)
      .orderBy('created_at')
      .onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
          if(change.type === 'added'){
            // Update UI
            callback(change.doc.data());
          };
        });
    });
  };
  updateName(username){
    this.username = username;
    localStorage.setItem('username', username);
  };
  updateRoom(room){
    this.room = room;
    console.log('Room Updated');
    if(this.unsub){
      this.unsub();
    };
  };
};

// setTimeout(() => {
//   chatroom.updateRoom('gaming');
//   chatroom.updateName('Steve Rodgers');
//   chatroom.getChats((data) => {
//     console.log(data);
//   });
//   chatroom.addChat('hello');
// }, 3000);