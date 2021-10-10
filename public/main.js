
const socket = io();

const messages = document.querySelector('ul');
const form = document.getElementById('messageForm');
const input = document.getElementById("messageBox");
const divBox = document.getElementById("messageContainer");
const username = prompt("Enter username").substr(0, 50)
const msgLen = document.getElementById('messageForm');
const counterLen = document.getElementById('charaCount');

form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (input.value != "") {
        socket.emit('client_msg', input.value, username)
        input.value = "";
    }
});

setInterval(() => {
    let color_input = document.getElementById("color_input_bg").value;
    document.body.style.backgroundColor = color_input;
    let color_input_brdr = document.getElementById("color_input_brdr").value;
    document.getElementById("messageContainer").style.outlineColor = color_input_brdr;
    let color_input_txt = document.getElementById("color_input_txt").value;
    document.body.style.color = color_input_txt;
}, 200);

socket.on('server_msg', (message) => {
    const item = document.createElement('li');
    item.textContent = message;
    messages.appendChild(item)
    document.querySelector("audio").play();
    divBox.scrollTo(0, divBox.scrollHeight);
});

// character counting stuff //
msgLen.addEventListener('input', function (e) {
    const target = e.target;
    const maxLength = target.getAttribute('maxlength');
    const currentLength = target.value.length;
    // alter counter div //
    counterLen.innerHTML = `${currentLength} / ${maxLength}`;
    // reset everything to 0 upon enter keystroke //
    document.addEventListener("keyup", function(event) {
        if (event.keyCode === 13) {
            counterLen.innerHTML = '0 / 501'
        }
    });
});


function menuToggle(state) {
    document.getElementById("customMenuPanel").style.display = state;
  }
