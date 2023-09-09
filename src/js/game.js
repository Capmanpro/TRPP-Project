
// Главный цикл игры
function loop() {
    // Очищаем игровое поле
    requestAnimationFrame(loop);
    context.clearRect(0, 0, canvas.width, canvas.height);
    // Если платформы на предыдущем шаге куда-то двигались — пусть продолжают двигаться
    leftPaddle.y += leftPaddle.dy;
    rightPaddle.y += rightPaddle.dy;
    // Если левая платформа пытается вылезти за игровое поле вниз,
    if (leftPaddle.y < grid) {
      // то оставляем её на месте
      leftPaddle.y = grid;
    }
    // Проверяем то же самое сверху
    else if (leftPaddle.y > maxPaddleY) {
      leftPaddle.y = maxPaddleY;
    }
    // Если правая платформа пытается вылезти за игровое поле вниз,
    if (rightPaddle.y < grid) {
      // то оставляем её на месте
      rightPaddle.y = grid;
    }
    // Проверяем то же самое сверху
    else if (rightPaddle.y > maxPaddleY) {
      rightPaddle.y = maxPaddleY;
    }
    // Рисуем платформы белым цветом
    context.fillStyle = 'white';
    // Каждая платформа — прямоугольник
    context.fillRect(leftPaddle.x, leftPaddle.y, leftPaddle.width, leftPaddle.height);
    context.fillRect(rightPaddle.x, rightPaddle.y, rightPaddle.width, rightPaddle.height);
    // Если мяч на предыдущем шаге куда-то двигался — пусть продолжает двигаться
    ball.x += ball.dx;
    ball.y += ball.dy;
    // Если мяч касается стены снизу — меняем направление по оси У на противоположное
    if (ball.y < grid) {
      ball.y = grid;
      ball.dy *= -1;
    }
    // Делаем то же самое, если мяч касается стены сверху
    else if (ball.y + grid > canvas.height - grid) {
      ball.y = canvas.height - grid * 2;
      ball.dy *= -1;
    }
    // Если мяч улетел за игровое поле влево или вправо — перезапускаем его
    if ((ball.x < 0 || ball.x > canvas.width) && !ball.resetting) {
      // Помечаем, что мяч перезапущен, чтобы не зациклиться
      ball.resetting = true;
      // Даём секунду на подготовку игрокам
      setTimeout(() => {
        // Всё, мяч в игре
        ball.resetting = false;
        // Снова запускаем его из центра
        ball.x = canvas.width / 2;
        ball.y = canvas.height / 2;
      }, 1000);
    }
    // Если мяч коснулся левой платформы,
    if (collides(ball, leftPaddle)) {
      // то отправляем его в обратном направлении
      ball.dx *= -1;
      // Увеличиваем координаты мяча на ширину платформы, чтобы не засчитался новый отскок
      ball.x = leftPaddle.x + leftPaddle.width;
    }
    // Проверяем и делаем то же самое для правой платформы
    else if (collides(ball, rightPaddle)) {
      ball.dx *= -1;
      ball.x = rightPaddle.x - ball.width;
    }
    // Рисуем мяч
    context.fillRect(ball.x, ball.y, ball.width, ball.height);
    // Рисуем стены
    context.fillStyle = 'lightgrey';
    context.fillRect(0, 0, canvas.width, grid);
    context.fillRect(0, canvas.height - grid, canvas.width, canvas.height);
    // Рисуем сетку посередине
    for (let i = grid; i < canvas.height - grid; i += grid * 2) {
      context.fillRect(canvas.width / 2 - grid / 2, i, grid, grid);
    }
    // Отслеживаем нажатия клавиш
    document.addEventListener('keydown', function (e) {
      // Если нажата клавиша вверх,
      if (e.which === 38) {
        // то двигаем правую платформу вверх
        rightPaddle.dy = -rightPaddleSpeed;
      }
      // Если нажата клавиша вниз,
      else if (e.which === 40) {
        // то двигаем правую платформу вниз
        rightPaddle.dy = rightPaddleSpeed;
      }
      // Если нажата клавиша W,
      if (e.which === 87) {
        // то двигаем левую платформу вверх
        leftPaddle.dy = -leftPaddleSpeed;
      }
      // Если нажата клавиша S,
      else if (e.which === 83) {
        // то двигаем левую платформу вниз
        leftPaddle.dy = leftPaddleSpeed;
      }
    });
    // А теперь следим за тем, когда кто-то отпустит клавишу, чтобы остановить движение платформы
    document.addEventListener('keyup', function (e) {
      // Если это стрелка вверх или вниз,
      if (e.which === 38 || e.which === 40) {
        // останавливаем правую платформу
        rightPaddle.dy = 0;
      }
      // А если это W или S,
      if (e.which === 83 || e.which === 87) {
        // останавливаем левую платформу
        leftPaddle.dy = 0;
      }
    });
  }
  // Запускаем игру
  requestAnimationFrame(loop);
