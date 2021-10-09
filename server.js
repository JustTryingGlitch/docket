const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT || 3000;
//filepath to the files that will be public to every user
const public_dir = path.join(__dirname, '/public');

app.use(express.static(public_dir));
//uses a socket server to send messages

io.on("connection", (client) => {
    console.log("a user has connected")
    client.on("client_msg", (msg, username) => {
        let message = `${username}: ${msg}`;
        io.emit("server_msg", message);
    });
    client.on("disconnect", () => console.log("a user has disconnected"))
});
//informs the http server app that it needs to receive information from a specific port 
server.listen(port, console.log(`Listening on: http://localhost:${port}`))