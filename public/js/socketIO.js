const socket = io("http://localhost:3005");
let isConnected = false;



// Socket Setup
socket.emit("setup", user);


// Connection confirmation
socket.on("connected", () => {
  isConnected = true;
});
