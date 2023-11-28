const players = {}

class Player {

    constructor(props)
    {
        this.name = props.name,
        this.id = props.id
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
socket.on("disconnect", () => 
{
    delete players[socket.id]
    setTimeout(() => {
    console.log(players);
    }, 1000);
});
return players;

}