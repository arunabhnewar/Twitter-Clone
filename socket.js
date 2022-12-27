// Dependencies
const { Server } = require("socket.io");
const http = require("http");
const mongoose = require("mongoose");
const User = require("./models/User");


const httpServerSocket = http.createServer();

const io = new Server(httpServerSocket, {
  cors: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"],
});



// Socket Connection
io.on("connection", (socket) => {

  // New User Setup
  socket.on("setup", (user) => {
    socket.join(user._id);
    io.to(user._id).emit("connected");
    console.log(user.userName + " connected");


    // User Disconnect
    socket.on("disconnect", () => {
      setTimeout(async () => {

        const isOnline = [... (await io.sockets.adapter.rooms.keys())].includes(user._id);

        if (!isOnline) {
          User.findByIdAndUpdate(user._id, {
            $set: {
              onlineStatus: false,
              lastSeen: new Date(),
            }
          }, { new: true })
            .then((result) => {
              if (result) {
                // 
                // console.log(result);
                console.log(user.userName + " disconnected");
              }
            });
        } else {
          console.log(user.userName + " is back");
        }
      }, 10000)
    });



  });
});


let roomNIds = [];


setInterval(async () => {
  roomNIds = [... await io.sockets.adapter.rooms.keys()];

  roomNIds.forEach(id => {

    if (mongoose.isValidObjectId(id)) {

      User.findByIdAndUpdate(id, {
        $set: {
          onlineStatus: true,
        }
      }, { new: true })
        .then((result) => {
          if (result) {
            // console.log(result);
          }
        })

      return true;
    } else {
      return false;
    }
  })
}, 10000)



// Module Exports
module.exports = httpServerSocket;
