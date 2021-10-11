const socket = io();

const messages = document.querySelector('ul');
const form = document.getElementById('messageForm');
const input = document.getElementById("messageBox");
const divBox = document.getElementById("messageContainer");
const username = prompt("Enter username").substr(0, 50);
const inbound = document.getElementById("inbound");
const outbound = document.getElementById("outbound");
const msgLen = document.getElementById('messageForm');
const counterLen = document.getElementById('charaCount');

//sets the color values to what localstorage has
document.getElementById("color_input_bg").value = localStorage.bgColor;
document.getElementById("color_input_brdr").value = localStorage.brdrColor;
document.getElementById("color_input_txt").value = localStorage.txtColor;


form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (input.value != "") {
        socket.emit('client_msg', input.value, username)
        input.value = "";
        outbound.play();
        socket.emit("inbound-music", inbound);
    }
});

setInterval(() => {
    let color_input = document.getElementById("color_input_bg").value;
    document.body.style.backgroundColor = color_input;
    let color_input_brdr = document.getElementById("color_input_brdr").value;
    document.getElementById("messageContainer").style.outlineColor = color_input_brdr;
    let color_input_txt = document.getElementById("color_input_txt").value;
    document.body.style.color = color_input_txt;
    storePreference();
}, 200);

socket.on('server_msg', (message) => {
    const item = document.createElement('li');
    item.textContent = message;
    messages.appendChild(item)
    document.querySelector("audio").play();
    divBox.scrollTo(0, divBox.scrollHeight);
});

socket.on("inbound-res", inbound => {
    inbound.play();
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

function storePreference() {
    localStorage.setItem("bgColor", document.getElementById("color_input_bg").value);
    localStorage.setItem("brdrColor", document.getElementById("color_input_brdr").value);
    localStorage.setItem("txtColor", document.getElementById("color_input_txt").value);
}
