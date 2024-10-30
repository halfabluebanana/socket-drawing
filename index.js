//Initialize the express 'app' object
let express = require("express");
let app = express();

app.use("/", express.static("public"));

//Initialize HTTP server
let http = require("http");
let server = http.createServer(app);

//Initialize socket.io
let io = require("socket.io");
//initialise new socket instance. share with the socket io library 
io = new io.Server(server);

//'port' variable allows for deployment
let port = process.env.PORT || 3000;
//cos we're listening on the server this time! 
server.listen(port, () => {
  console.log("App listening at port: " + port);
});

//9. Listen for individual clients to connect

//Listen for a client to connect and disconnect
//io is a larger socket world
io.on("connection", (socket) => {
  console.log("We have a new client: " + socket.id);

  //Listen for messages from the client
  //Client emits messages to server 
  //Listen for an event named 'message' from client
  socket.on('message', (data) => {
    console.log("Received 'message' with the following data:");
    console.log(data);

  });


  //Listen for this client to disconnect
  socket.on("disconnect", () => {
    console.log("A client has disconnected: " + socket.id);
  });
});