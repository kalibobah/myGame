const players = {}

class Player {

    constructor(props)
    {
        this.name = props.name,
        this.id = props.id,
        this.positionX = 300,
        this.positionY = 300,
        this.radius = 30,
        this.angle = 0
    }
    updateRotation(mouseX, mouseY) {
        const dx = mouseX - this.positionX;
        const dy = mouseY - this.positionY;
        this.angle = Math.atan2(dy, dx);
      }
}

        
export function getPlayer(socket){
socket.on("server", () => 
{
    players[socket.id] = new Player(
        {
            id: socket.id,
            name: Object.keys(players).length
        }
        
    );

});
socket.on("movement", (data) => 
{
const player = players[socket.id];
if(player)
{
    if(player.positionY <= 0 || player.positionY === 947)
    {
        player.positionY -= 5;
    };
    if(player.positionX <= 0 || player.positionX === 2050)
    {
        player.positionX -= 5;
    };
    player.updateRotation(data.mouseX, data.mouseY);

}

if (data.up)
{
    player.positionY -= 5
};
if (data.down) 
{
    player.positionY += 5    
};
if (data.left)
{
    player.positionX -= 5
};
if (data.right)
{
    player.positionX += 5 
};

})
socket.on("disconnect", () => 
{
    delete players[socket.id];
    setTimeout(() => {
    console.log(players);
    }, 1000);
});
return players;

}

