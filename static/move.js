const movement = 
{
    up: false,
    down: false,
    right: false,
    left: false
}
document.addEventListener("keydown", (e) => {
    if ((e.code === 'KeyW'))
    {
        movement.up = true;
    }
    if ((e.code === 'KeyS'))
    {
        movement.down = true;
    }
    if ((e.code === 'KeyA'))
    {
        movement.left = true;
    }
    if ((e.code === 'KeyD'))
    {
        movement.right = true;
    }
});

    document.addEventListener("keyup", (e) => {
        if ((e.code === 'KeyW'))
    {
        movement.up = false;
    }
    if ((e.code === 'KeyS'))
    {
        movement.down = false;
    }
    if ((e.code === 'KeyA'))
    {
        movement.left = false;
    }
    if ((e.code === 'KeyD'))
    {
        movement.right = false;
    }
        });


setInterval(() => {
    socket.emit("movement",movement);
}, 1000 / 60);