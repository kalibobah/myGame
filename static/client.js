// объявление переменных 
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const socket = io();
const reloudd = (data) => {
    for(let i = 0; i < data.length; i++)
    {
    const hello = document.createElement("div");
    hello.setAttribute("id", "player");
    hello.innerText = `ID игрока ${data[i].id} номер игрока: ${data[i].count}`;
    document.body.appendChild(hello);
    }
};
// const deletePlayer = (data) => {
// const hello = getElementById("player");
// hello.innerText = " ";
// }
// Работа с пользователями
socket.emit("server");

socket.on("state", (data,err) => 
{       
reloudd(data);

});


// Работа с канвасом
ctx.fillStyle = "green";
ctx.fillRect(0, 0, 300, 400);

canvas.addEventListener("click", e => {
    ctx.strokeRect(e.offsetX,e.offsetY, 50, 50, 50);

});


