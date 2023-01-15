// Dependencies
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const {
  notFoundHandler,
  errorHandler,
} = require("./middlewares/common/errorHandler");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth/authRoute");
const homeRouter = require("./routes/home/homeRoute");
const postRoute = require("./routes/apis/postRoute");
const profileRoute = require("./routes/profile/profileRoute");
const searchRoute = require("./routes/search/searchRoute");
const usersRoute = require("./routes/users/usersRoute");
const httpServerSocket = require("./socket");
const messageRoute = require("./routes/message/messageRoute");
const chatRoute = require("./routes/chat/chatRoute");



// App Initialization and Config
const app = express();
dotenv.config();



// Express Settings
app.set("view engine", "pug");
app.set("views", "views");



// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser(process.env.COOKIE_SECRET));



// Routes
app.use(authRouter); //Authentication Route

app.use("/posts", postRoute); //Post Route
app.use("/profile", profileRoute); //Profile Route
app.use("/search", searchRoute); //Search Route
app.use("/users", usersRoute); //Users Route
app.use("/messages", messageRoute); //Messages Route
app.use("/chat", chatRoute); //Chat Route
app.use("/", homeRouter); //Home Route



// Not Found Handler
app.use(notFoundHandler);



// Error Handler
app.use(errorHandler);



// Mongodb Connection
async function twitter() {
  try {
    await mongoose.connect(process.env.DB_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log("DB Fucked Successfully!!");


    // Socket Server listen
    httpServerSocket.listen(process.env.SOCKET_PORT || 3005, () => {
      console.log("Socket Server has been fucking on port" + " " + 3005);
    });
  } catch (error) {
    console.log(error);
  }
}


// Server Listen
app.listen(process.env.PORT || 3000, () => {
  twitter();
  console.log("Server has been fucking on port" + " " + 3000);
});
