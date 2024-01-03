const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 50;
    this.height = 50;
    this.angle = 0;
    this.speed = 5;
  }

  updateRotation(mouseX, mouseY) {
    const dx = mouseX - this.x;
    const dy = mouseY - this.y;
    this.angle = Math.atan2(dy, dx);
  }

  move(direction) {
    switch (direction) {
      case 'W':
        this.y -= this.speed;
        break;
      case 'A':
        this.x -= this.speed;
        break;
      case 'S':
        this.y += this.speed;
        break;
      case 'D':
        this.x += this.speed;
        break;
    }
  }

  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    ctx.fillStyle = 'red'; // Цвет лицевой стороны
    ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);
    ctx.restore();
  }
}

const player = new Player(400, 300);

document.addEventListener('mousemove', (event) => {
  const { clientX, clientY } = event;
  player.updateRotation(clientX, clientY);
});

document.addEventListener('keydown', (event) => {
  const { key } = event;
  player.move(key.toUpperCase());
});

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  player.draw();
  requestAnimationFrame(update);
}

update();


        