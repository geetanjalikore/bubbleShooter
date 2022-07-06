const randomColor = () => {
  const colors = ['red', 'black', 'green', 'blue'];
  const index = Math.floor(Math.random() * colors.length);
  return colors[index];
};

const drawBullet = (bullet, game) => {
  const { id, position, color } = bullet.getInfo();
  const bulletElement = document.createElement('div');
  bulletElement.id = id;
  bulletElement.style.left = position.x;
  bulletElement.style.top = position.y;
  bulletElement.style.backgroundColor = color;
  game.appendChild(bulletElement);
};

const updateBullet = ({ id, position }) => {
  const bulletElement = document.getElementById(id);
  bulletElement.style.left = position.x;
  bulletElement.style.top = position.y;
};

const drawBall = (ball, ballsElement) => {
  const { position, id, color } = ball;
  const ballElement = document.createElement('div');
  ballElement.id = id;
  ballElement.setAttribute('class', 'ball');
  ballElement.style.left = position.x;
  ballElement.style.top = position.y;
  ballElement.style.backgroundColor = color;
  ballsElement.appendChild(ballElement);
};

const calculatePosition = (index, size) => {
  return { x: index * size, y: 10 };
};

const generateBalls = () => {
  const balls = [];
  const ballsCount = 12;
  const size = 50;

  for (let index = 1; index <= ballsCount; index++) {
    const color = randomColor();
    const position = calculatePosition(index, size);
    const ball = { id: `ball_${index}`, position, color, size };
    balls.push(ball);
  }

  return balls;
};

const redrawGame = (game) => {
  const viewElement = document.getElementById('view');
  const bulletElement = document.getElementById('bullet');
  const ballsElement = document.getElementById('balls');

  ballsElement.innerHTML = '';
  viewElement.removeChild(bulletElement);
  drawGame(game);
};

const shootController = (game) => {
  const id = setInterval(() => {
    const bulletPos = game.shoot();
    updateBullet(bulletPos);

    const collidedBall = game.getCollidedBall();
    let { bullet } = game.getInfo();

    if (collidedBall) {
      clearInterval(id);
      game.remove(collidedBall);
      bullet = createBullet();
    }

    const { balls, view } = game.getInfo();
    const newGame = new Game(balls, bullet, view);
    redrawGame(newGame);
  }, 50);
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
  return new Bullet('bullet', { x: 300, y: 500 }, speed, color, 50);
};

const drawGame = (game) => {
  const { bullet, balls } = game.getInfo();
  const viewElement = document.getElementById('view');
  const ballsElement = document.getElementById('balls');

  balls.forEach(ball => {
    drawBall(ball, ballsElement);
  });

  drawBullet(bullet, viewElement);
  const bulletElement = document.getElementById(bullet.getInfo().id);
  bulletElement.onclick = () => shootController(game);
};

const setupGame = () => {
  const position = { x: 600, y: 100 };
  const dimensions = { height: 700, width: 700 };
  const view = { position, dimensions };

  const balls = generateBalls();

  const bullet = createBullet();
  const game = new Game(balls, bullet, view);
  drawGame(game);
};

window.onload = setupGame;
