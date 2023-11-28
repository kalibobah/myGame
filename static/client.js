// объявление переменных 
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const socket = io();
// Работа с пользователями
socket.emit("server");

socket.on("state", (players) => 
{       
for(const id in players)
{
    const player = players[id];
}
});


// Работа с канвасом
ctx.fillStyle = "green";
ctx.fillRect(0, 0, 300, 400);

canvas.addEventListener("click", e => {
    ctx.strokeRect(e.offsetX,e.offsetY, 50, 50, 50);

});


