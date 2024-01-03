const drawPlayer = (context, player) => 
{
    const playerX = player.positionX;
    const playerY = player.positionY;

    // Имя игрока
    context.beginPath();
    context.fillstyle = "red";
    context.font = "20px sans-serif";
    context.fillText(`Player ${player._name}`,playerX -35 ,playerY - 50);
    context.closePath();

    context.beginPath();

    context.strokeStyle = "red";
    context.lineWidth = 10;
    context.arc(playerX,playerY,player.playerRadius, 0, Math.PI * 2);
    context.stroke;
    context.closePath();
    
    
}