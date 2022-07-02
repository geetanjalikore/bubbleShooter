const colors = ['red', 'black', 'green', 'blue'];
const getColor = () => {
  const index = Math.floor(Math.random() * colors.length);
  return colors[index];
};

const drawShooter = (shooter, game) => {
  const { id, position } = shooter.getInfo();
  const shooterElement = document.createElement('div');
  shooterElement.id = id;
  shooterElement.style.left = position.x;
  shooterElement.style.top = position.y;
  game.appendChild(shooterElement);
};

const updateShooter = (shooter) => {
  const { id, position } = shooter.getInfo();
  const shooterElement = document.getElementById(id);
  shooterElement.style.left = position.x;
  shooterElement.style.top = position.y;
};

const drawBall = (ball, board) => {
  const { x, y, id } = ball;
  const ballElement = document.createElement('div');
  ballElement.id = id;
  ballElement.setAttribute('class', 'ball');
  ballElement.style.left = x;
  ballElement.style.top = y;
  ballElement.style.backgroundColor = getColor();
  board.appendChild(ballElement);
};

const generateBalls = () => {
  const balls = [];
  const ballsCount = 10;
  let x = 10;
  let y = 10;
  const offset = 60;

  const board = document.getElementById('board');

  for (let index = 0; index < ballsCount; index++) {
    x += offset;
    balls.push({ x, y, id: `${x}_${y}` });
  }

  balls.forEach(ball => {
    drawBall(ball, board);
  });

  const shooter = new Shooter('shooter', { x: 220, y: 900 }, { dx: 1, dy: 5 });
  const game = document.getElementById('game');

  drawShooter(shooter, game);
  setInterval(() => {
    shooter.move();
    updateShooter(shooter);
  }, 50);
};

window.onload = generateBalls;
