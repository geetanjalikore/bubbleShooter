const randomColor = () => {
  const colors = ['red', 'black', 'green', 'blue'];
  const index = Math.floor(Math.random() * colors.length);
  return colors[index];
};

const drawBullet = (bullet, game) => {
  const { id, position } = bullet.getInfo();
  const bulletElement = document.createElement('div');
  bulletElement.id = id;
  bulletElement.style.left = position.x;
  bulletElement.style.top = position.y;
  bulletElement.style.backgroundColor = randomColor();
  game.appendChild(bulletElement);
};

const updateBullet = (Bullet) => {
  const { id, position } = Bullet.getInfo();
  const bulletElement = document.getElementById(id);
  bulletElement.style.left = position.x;
  bulletElement.style.top = position.y;
};

const drawBall = (ball, ballsElement) => {
  const { position, id } = ball;
  const ballElement = document.createElement('div');
  ballElement.id = id;
  ballElement.setAttribute('class', 'ball');
  ballElement.style.left = position.x;
  ballElement.style.top = position.y;
  ballElement.style.backgroundColor = randomColor();
  ballsElement.appendChild(ballElement);
};

const calculatePosition = (index, size) => {
  return { x: index * size, y: 10 };
};

const generateBalls = () => {
  const balls = [];
  const ballsCount = 10;
  const size = 50;

  for (let index = 1; index <= ballsCount; index++) {
    const color = randomColor();
    const position = calculatePosition(index, size);
    const ball = { id: `ball_${index}`, position, color, size };
    balls.push(ball);
  }

  return balls;
};

const blastBall = (ball, ballsElement) => {
  const ballElement = document.getElementById(ball.id);
  ballsElement.removeChild(ballElement);
};

const blastBullet = (bullet, game) => {
  const id = bullet.getInfo().id;
  const bulletElement = document.getElementById(id);
  game.removeChild(bulletElement);
};

const shoot = (bullet, balls, ballsElement, viewElement) => {
  const id = setInterval(() => {
    bullet.move();
    updateBullet(bullet);
    const collidedBall = bullet.getCollidedBall(balls);

    if (collidedBall) {
      clearInterval(id);
      blastBall(collidedBall, ballsElement);
      blastBullet(bullet, viewElement);
      balls = balls.filter(({ id }) => collidedBall.id !== id);
      redrawBullet(balls, ballsElement, viewElement);
    }

  }, 50);
};

const redrawBullet = (balls, ballsElement, viewElement) => {
  const bullet = createBullet();
  drawBullet(bullet, viewElement);

  const bulletElement = document.getElementById(bullet.getInfo().id);
  bulletElement.onclick = () => shoot(bullet, balls, ballsElement, viewElement);
};

const randomNumber = (min, max) => {
  const difference = max - min;
  let random = Math.floor(Math.random() * difference);
  random = min + random;
  return random;
};

const createBullet = (config) => {
  const color = randomColor();
  const speed = { dx: randomNumber(-10, 5), dy: 20 };
  console.log(speed.dx);
  return new Bullet('bullet', { x: 250, y: 500 }, speed, color, 50);
};

const setupGame = () => {
  const view = { x: 20, y: 10 };
  const viewElement = document.getElementById('view');
  const ballsElement = document.getElementById('balls');

  const balls = generateBalls();

  balls.forEach(ball => {
    drawBall(ball, ballsElement);
  });

  const bullet = createBullet();
  drawBullet(bullet, viewElement);

  const bulletElement = document.getElementById(bullet.getInfo().id);
  bulletElement.onclick = () => shoot(bullet, balls, ballsElement, viewElement);
};

window.onload = setupGame;
