const players = {}
export default class Player {

    constructor(props)
    {
        this.name = props.name,
        this.id = props.id,
        this.cx = 300,
        this.cy = 300,
        this.s = 10,
        this.radius = 30,
        this.angle = 0
    }
    updateRotation(mouseX, mouseY) {
        const dx = mouseX - this.cx;
        const dy = mouseY - this.cy;
        this.angle = Math.atan2(dy, dx);
      };
      move(data) {
        this.prevX = this.cx;
        this.prevY = this.cy;

        if (this.s !== 0) {
            if (data.up) this.cy -= this.s;
            if (data.down) this.cy += this.s;
            if (data.left) this.cx -= this.s;
            if (data.right) this.cx += this.s;
        } 
    }
    detectBorder(canvas) {
        try {
            if (this.cx + this.radius > canvas.width || this.cx - this.radius < 0) {
                this.s = 0;
                console.log("X");
            }
            if (this.cy + this.radius > canvas.height || this.cy - this.radius < 0) {
                this.s = 0;
                console.log("Y");
            }
        } catch (error) {
            console.error("Ошибка в функции detectBorder():", error);
        }
    }
    detectBorder()
{
  if(this.cx + this.radius > innerWidth || this.cx - this.radius < 0) this.s = -this.s;
  if(this.cy + this.radius > innerHeight || this.cy - this.radius < 0) this.s = -this.s;
};
detectBorder() {
    try {
        if (this.cx + this.radius > canvas.width || this.cx - this.radius < 0) {
            this.s = -this.s;
            console.log("Граница X достигнута");
        }
        if (this.cy + this.radius > canvas.height || this.cy - this.radius < 0) {
            this.s = -this.s;
            console.log("Граница Y достигнута");
        }
    } catch (error) {
        console.error("Ошибка в функции detectBorder():", error);
    }
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
    player.updateRotation(data.mouseX, data.mouseY);
    player.move(data);
    // player.detectBorder(canvas)
}
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
