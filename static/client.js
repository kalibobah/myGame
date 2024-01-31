// объявление переменных 


// Передаем canvas в getPlayer
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
const socket = io();
// Работа с пользователями
socket.emit("server");
socket.on("state", (players) => 
{

    for(const id in players)
{
    const player = players[id];

function drawPlayer(player) {
  
  context.beginPath();
  context.arc(player.cx, player.cy, player.radius, 0, Math.PI * 2);
  context.fillStyle = 'blue';
  context.fill();
  context.closePath();

  // Рисование лицевой части круга
  context.save();
  context.translate(player.cx, player.cy);
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

// context.beginPath();
// context.fillStyle = "black";
// context.font = "20px sans-serif";
// context.fillText(`Игрок ${player.name}`, player.positionX - 35,player.positionY - 35);
// context.closePath();
function updateRotation(mouseX, mouseY) {
  const player = players[socket.id];

  const dx = mouseX - player.cx;
  const dy = mouseY - player.cy;
  player.angle = Math.atan2(dy, dx);
};
function move() {
  // player.prevX = player.cx;
  // player.prevY = player.cy;
  const player = players[socket.id];

document.addEventListener("keydown", (e) =>
{

  switch(e.code)
    {
        case 'KeyW':
            player.cy += player.s;
            break;
        case 'KeyS':
            player.cy -= player.s;
            break;
        case 'KeyA':
            player.cx -= player.s;
            break;
        case 'KeyD':
            player.cx += player.s;
            break;
    };
});
}

  
function update()
{
    context.clearRect(0, 0, canvas.width, canvas.height);
    draw();
    move();
    // updateRotation();
    
    
}
};

requestAnimationFrame(update);


});


