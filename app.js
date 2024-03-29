require('dotenv').config();
const express = require("express");
const path = require('path');
const loginRoute = require("./Routes/authRoute");
const teacherRoute = require("./Routes/teacherRoute");
const childRoute = require("./Routes/childRoute");
const mongoose = require("mongoose");
const classRoute=require("./Routes/classRoute")
const server = express();

server.use('/uploads', express.static(path.join(__dirname, 'uploads')));


const port = process.env.PORT || 8080;

mongoose
.connect("mongodb://127.0.0.1:27017/nodenew")
.then(()=>{
  console.log("DB connected");
  server.listen(port, () => {
    console.log("Server is listening on port", port);
  });
})
.catch((error)=>{console.log("DB problem "+error)});
//first MW
server.use((request, response, next) => {
  console.log(request.url, request.method);
  next();
});
server.use(express.json());
server.use(loginRoute);
server.use(teacherRoute);
server.use(childRoute);
server.use(classRoute);
server.use((request, response, next) => {
  response.status(404).json({ data: "Not Found" });
});

server.use((error, request, response, next) => {
  console.error(error.stack);
  response.status(500).json({ data: "Internal Server Error" });
});
