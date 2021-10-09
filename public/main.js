const socket = io();

const messages = document.querySelector('ul');
const form = document.getElementById('messageForm');
const input = document.getElementById("messageBox");
const username = function usernameCreator() {
    let nameOfUser = prompt("Enter Username:");
    if (nameOfUser.length < 50) {
        return nameOfUser;
    }
    else {
        usernameCreator();
    }
}



const divBox = document.getElementById("messageContainer");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (input.value != "") {
        socket.emit('client_msg', input.value, username)
        input.value = "";
    }
});

setInterval(() => {
    let color_input = document.getElementById("color_input").value;
    document.body.style.backgroundColor = color_input;
}, 200);

socket.on('server_msg', (message) => {
    const item = document.createElement('li');
    item.textContent = message;
    messages.appendChild(item)
    document.querySelector("audio").play();
    divBox.scrollTo(0, divBox.scrollHeight);
});