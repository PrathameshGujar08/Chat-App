const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes")
const messageRoutes = require("./routes/messageRoutes")
const socket = require("socket.io")

const app = express();
require("dotenv").config(); // Used to call env variables in the file (Read docs on npm site)

app.use(cors());
app.use(express.json());

// Fetching routes 
app.use("/api/auth", userRoutes)
app.use("/api/messages", messageRoutes)

mongoose.connect(process.env.MONGO_URL ,{
    useNewURLParser : true,
    useUnifiedTopology : true,
})
.then(() => {
    console.log("Connection established with the DB.")
})
.catch((err) => {
    console.log(err);
});


const server = app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}`) // See how we used ` ` in the log line because that enables us to write variables directly into the string. These are called template literals. 
});

const io = socket(server, 
    {
        cors : {
            origin : "https://localhost:3000",
            credentials : true,
        },
    });

    // Use a map to store online users 
    // Like if normally initiated for every new tab connecting to this link a user will be added to this map.
global.onlineUsers = new Map();

// On connection command it listens and performs a callback event in which 
// 1. It adds the new socket in the chat socket part of global variable.
// 2. If add-user is triggered, the user is added to onlineUsers along with the socket.id
io.on("connection", (socket) => {
    global.chatSocket = socket;
    // Add User
    socket.on("add-user", (userId) => {
        onlineUsers.set(userId, socket.id)
    });

    // Send Message 
    // If this is triggered the data property will be passed in the call back function and it will contain the information of whom to(to) send and what to send(msg)
    socket.on("send-msg", (data) => {
        console.log({data});
        const sendUserSocket = onlineUsers.get(data.to);
        socket.to(sendUserSocket).emit("msg-recieve", data.message)
    })
})
