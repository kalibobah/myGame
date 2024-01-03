// объявление переменных 
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
const socket = io();
// Работа с пользователями
socket.emit("server");
socket.on("state", (players) => 
{

// context.clearRect(0, 0, canvas.width, canvas.height);
    for(const id in players)
{
    const player = players[id];






//    context.beginPath();
// context.arc(player.positionX,  player.positionY, player.radius, 0, 2*Math.PI);
// context.fillStyle = "red";
// context.fill();
// context.closePath();
function drawPlayer(player) {
  context.beginPath();
  context.arc(player.positionX, player.positionY, player.radius, 0, Math.PI * 2);
  context.fillStyle = 'blue';
  context.fill();
  context.closePath();

  // Рисование лицевой части круга с учетом угла
  context.save();
  context.translate(player.positionX, player.positionY);
  context.rotate(player.angle);
  context.fillStyle = "red";
  context.beginPath();
  context.arc(0, 0, player.radius, -Math.PI / 2, Math.PI / 2);
  context.fill();
  context.closePath();
  
  context.restore();
}

function draw() {
  for (let id in players) {
      drawPlayer(players[id]);
      
  }
}
context.beginPath();
context.fillStyle = "black";
context.font = "20px sans-serif";
context.fillText(`Игрок ${player.name}`, player.positionX - 35,player.positionY - 35);
context.closePath();

function update()
{
    context.clearRect(0, 0, canvas.width, canvas.height);
    draw();

}

requestAnimationFrame(update);


    



}

});
