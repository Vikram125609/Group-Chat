const express = require('express')
const app = express();
const http = require('http')
const cors = require('cors');
const dotenv = require('dotenv').config({ path: "config.env" });
// Here Server is the class which is imported from Soket.io
const { Server } = require('socket.io');
app.use(cors());
const server = http.createServer(app);
// Creating the object of the server class
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});
io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);
  
    socket.on("join_room", (data) => {
      socket.join(data);
      console.log(`User with ID: ${socket.id} joined room: ${data}`);
    });
  
    socket.on("send_message", (data) => {
      socket.to(data.room).emit("receive_message", data);
    });
  
    socket.on("disconnect", () => {
      console.log("User Disconnected", socket.id);
    });
  });
  
// Connection is an event and we are listening that event and every piece of code must to be inside of this line 
// io.on("connection") because we are listening to the events
server.listen(process.env.PORT, () => {
    console.log(`Server is running at ${process.env.PORT}`)
}) 