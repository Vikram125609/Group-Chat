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
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});
io.on("connection",(socket)=>{
    // This is our Action call back function 
    // The socket parameter is used to specify the event for the user who is connected
    // And we can access information. Each user get a specific id when they connect to the socket server
    console.log(socket.id);
    io.on("disconnect",()=>{
        console.log(`User disconnected ${socket.id}`)
    })

});
// Connection is an event and we are listening that event and every piece of code must to be inside of this line 
// io.on("connection") because we are listening to the events
server.listen(process.env.PORT, () => {
    console.log(`Server is running at ${process.env.PORT}`)
}) 