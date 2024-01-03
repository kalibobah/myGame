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





 // Обрезать контекст по кругу

//    context.beginPath();
// context.arc(player.positionX,  player.positionY, player.radius, 0, 2*Math.PI);
// context.fillStyle = "red";
// context.fill();
// context.closePath();
// update();      
// requestAnimationFrame(update);
// update();
// let isMouseMoving = false;
// function draw()
// {
//     context.beginPath();
//     context.arc(player.positionX, player.positionY, player.radius, 0, Math.PI * 2);
//     context.fillStyle = 'blue';
//     context.fill();
//     context.closePath();

//     // Рисование лицевой части круга с учетом угла
//     context.save();
//     context.translate(player.positionX, player.positionY);
//     context.rotate(player.angle);
//     context.fillStyle = "red";
//     context.beginPath();
//     context.arc(0, 0, player.radius, -Math.PI / 2, Math.PI / 2);
//     context.fill();
//     context.closePath();
//     context.restore();
// }
// function update()
// {
//     context.clearRect(0, 0, canvas.width, canvas.height);
//     draw();
//     if (keys.w || keys.a || keys.s || keys.d || isMouseMoving) {
//         requestAnimationFrame(update);
//       }
//     // Запланировать следующий кадр анимации
//     // requestAnimationFrame(update);
// // setInterval(update, 1000 / 60);

// }
// canvas.addEventListener('mousemove', (event) => {
//     const rect = canvas.getBoundingClientRect();
//     const mouseX = event.clientX - rect.left;
//     const mouseY = event.clientY - rect.top;
//     isMouseMoving = true
//     // Расчет угла между центром круга и курсором
//     player.angle = Math.atan2(mouseY - player.positionY, mouseX - player.positionX);
// });
// canvas.addEventListener('mouseup', () => {
//     isMouseMoving = false;
//   });
const circle = {
      x: canvas.width / 2,
      y: canvas.height / 2,
      radius: 50,
      faceColor: 'red',
      speed: 2,
      angle: 0,
    };

    // Флаги для отслеживания состояния клавиш
    const keys = {
      w: false,
      a: false,
      s: false,
      d: false,
    };

    let isMouseMoving = false;

    function drawCircle() {
      // Рисование задней (нелицевой) части круга
      context.beginPath();
      context.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
      context.fillStyle = 'blue';
      context.fill();
      context.closePath();

      // Рисование лицевой части круга
      context.save();
      context.translate(circle.x, circle.y);
      context.rotate(circle.angle);
      context.fillStyle = circle.faceColor;
      context.beginPath();
      context.arc(0, 0, circle.radius, -Math.PI / 2, Math.PI / 2);
      context.fill();
      context.closePath();
      context.restore();
    }

    function update() {
      // Очистка canvas перед рисованием
      context.clearRect(0, 0, canvas.width, canvas.height);

      // Обновление координат для движения
      if (keys.w) circle.y -= circle.speed;
      if (keys.a) circle.x -= circle.speed;
      if (keys.s) circle.y += circle.speed;
      if (keys.d) circle.x += circle.speed;

      // Вызов функции для рисования круга
      drawCircle();

      // Вызов requestAnimationFrame только при активных изменениях
      if (keys.w || keys.a || keys.s || keys.d || isMouseMoving) {
        requestAnimationFrame(update);
      }
    }

    // Отслеживание нажатия/отпускания клавиш
    window.addEventListener('keydown', (event) => {
      keys[event.key] = true;
      requestAnimationFrame(update);
    });

    window.addEventListener('keyup', (event) => {
      keys[event.key] = false;
      requestAnimationFrame(update);
    });

    // Отслеживание движения мыши
    canvas.addEventListener('mousemove', (event) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;

      // Обновление угла круга в сторону курсора
      circle.angle = Math.atan2(mouseY - circle.y, mouseX - circle.x);
      isMouseMoving = true;
      requestAnimationFrame(update);
    });

    // Отслеживание окончания движения мыши
    canvas.addEventListener('mouseup', () => {
      isMouseMoving = false;
    });
// update();
    // Очистка canvas перед рисованием

    // Рисование задней (нелицевой) части круга
    

//     context.beginPath();
// context.fillStyle = "black";
// context.font = "20px sans-serif";
// context.fillText(`Игрок ${player.name}`, player.positionX - 35,player.positionY - 35);
// context.closePath();

}

});
