const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT || 3000;
const public_dir = path.join(__dirname, '/public');

app.use(express.static(public_dir));

io.on("connection", (client) => {
    console.log("a user has connected")
    client.on("client_msg", (msg, username) => {
        let message = `${username}: ${msg}`;
        io.emit("server_msg", message);
    });
    client.on("inbound-music", inbound => {
        client.broadcast.emit("inbound-res", inbound);
    });
    client.on("disconnect", () => console.log("a user has disconnected"))
});

server.listen(port, console.log(`Listening on: http://localhost:${port}`))