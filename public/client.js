

const socket = io();


const user_send =document.querySelector(".send-btn");
const user_msg=document.querySelector(".input-msg");


//auto scroll to the down
var objDiv = document.getElementById("chats");
      objDiv.scrollTop = objDiv.scrollHeight;



//message from server

socket.on('message',message=>{
  console.log(message);
})

//getting socketid from server
socket.on('socketid',socketid=>{
  console.log(socketid);
  
});



//ading eventlistner in message send button
user_send.addEventListener("click",()=>{

    //get mesage from text filed
    const msg = user_msg.value;
    //emit message to server
    socket.emit('chatMessage',msg);
});


//output to the html file
socket.on('chatMessage',msg=>{
    outgoingmsg.innerHTML += '<div class="my-chat" id="mychat">' +msg + '</div>';
});
