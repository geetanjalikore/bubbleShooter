const getColor = () => {
  const colors = ['red', 'black', 'green', 'blue'];
  const index = Math.floor(Math.random() * colors.length);
  return colors[index];
};

const drawShooter = (shooter, game) => {
  const { id, position } = shooter.getInfo();
  const shooterElement = document.createElement('div');
  shooterElement.id = id;
  shooterElement.style.left = position.x;
  shooterElement.style.top = position.y;
  shooterElement.style.backgroundColor = getColor();
  game.appendChild(shooterElement);
};

const updateShooter = (shooter) => {
  const { id, position } = shooter.getInfo();
  const shooterElement = document.getElementById(id);
  shooterElement.style.left = position.x;
  shooterElement.style.top = position.y;
};

const drawBall = (ball, ballsElement) => {
  const { position, id } = ball;
  const ballElement = document.createElement('div');
  ballElement.id = id;
  ballElement.setAttribute('class', 'ball');
  ballElement.style.left = position.x;
  ballElement.style.top = position.y;
  ballElement.style.backgroundColor = getColor();
  ballsElement.appendChild(ballElement);
};

const generateBalls = () => {
  const balls = [];
  const ballsCount = 10;
  const initialPosition = { x: 10, y: 10, height: 50, width: 50 };

  for (let index = 0; index < ballsCount; index++) {
    initialPosition.x += initialPosition.width;
    const color = getColor();
    const ball = { id: `ball_${index + 1}`, position: { ...initialPosition }, color };
    balls.push(ball);
  }
  return balls;
};

const blastBall = (ball, ballsElement) => {
  const ballElement = document.getElementById(ball.id);
  ballsElement.removeChild(ballElement);
};

const blastShooter = (shooter, game) => {
  const id = shooter.getInfo().id;
  const shooterElement = document.getElementById(id);
  game.removeChild(shooterElement);
};

const setupGame = () => {
  const balls = generateBalls();
  const ballsElement = document.getElementById('balls');

  balls.forEach(ball => {
    drawBall(ball, ballsElement);
  });

  const shooter = new Shooter('shooter', { x: 220, y: 900, height: 50, width: 50 }, { dx: -1, dy: 5 });
  const game = document.getElementById('game');

  drawShooter(shooter, game);

  const id = setInterval(() => {
    shooter.move();
    updateShooter(shooter);
    const collidedBall = shooter.getCollidedBall(balls);
    if (collidedBall) {
      clearInterval(id);
      blastBall(collidedBall, ballsElement);
      blastShooter(shooter, game);
    }
  }, 50);
};

window.onload = setupGame;
