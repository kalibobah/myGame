const movement = 
{
    up: false,
    down: false,
    right: false,
    left: false,
    mouseX: 0,
    mouseY: 0,
}
document.addEventListener('mousemove', (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
  });
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
    movement.mouseX = mouseX;
    movement.mouseY = mouseY;
    socket.emit("movement",movement);
}, 1000 / 60);