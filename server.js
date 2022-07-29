
const express = require('express');
const path = require('path');
const app = express();
const mysql =require("mysql")
const server = require('http').createServer(app);
const socketio = require('socket.io');
const io = socketio(server);
const port = process.env.PORT || 3000

/*

//for mysql database connection
const connection=mysql.createConnection({
  host: "localhost",
  user:"root",
  password: "",
  database:"chat_application",
});

connection.connect((err)=>{
  if(err){
    console.log("error occured",err);

  }
  else{
    console.log('connected to the mysql server');
  }
});



//retrieve data from mysql database
connection.query('select * from chat_application.friend_list where id =7',(err,res)=>{
  
  if(err){
    console.log('error occured',err);

  }
  else{

  return console.log(res);
  }
})
*/




//for ejs view Engine
app.set('view engine','ejs');

app.get("/", (req,res) =>{

  const incomemsg ="message";
  res.render("index");
});






//set a static folder
//import path among other dependencies.
app.use(express.static(path.join(__dirname + '/public')));



//run when client connect
io.on('connection', socket => {

   console.log('someone is just connect..');
   // welcome current user
   socket.emit('message','welcome to chat-app');
   
   //Broadcast when the user connect.
   socket.broadcast.emit('message','user '+socket.id+' connect to the chat');
   
   //sending socketId to the coient side
   socket.broadcast.emit('socketid',socket.id);

   
   //run when user disconnect
   socket.on('disconnect',()=>{
    io.emit('message','user has disconnect the chat');
   });

   //listen chatMessage
   socket.on('chatMessage', msg =>{
    io.emit('chatMessage',msg);

   console.log(msg);
   
 
   });

  
});




//run when the server is runing
server.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});

