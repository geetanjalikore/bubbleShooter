const colors = ['red', 'black', 'green', 'blue'];
const getColor = () => {
  const index = Math.floor(Math.random() * colors.length);
  return colors[index];
}

const createBall = (x, y) => {
  const ball = document.createElement('div');
  ball.setAttribute('class', 'ball');
  ball.style.left = x;
  ball.style.top = y;
  ball.style.backgroundColor = getColor();
  return ball;
};

const createShooter = () => {
  const x = 220;
  const y = 900;
  const shooter = { x, y, id: 'shooter' };
  const ball = createBall(x, y);
  ball.setAttribute('id', shooter.id);
  const game = document.getElementById('game');
  game.appendChild(ball);
  return shooter;
};

const generateBalls = () => {
  const balls = Array(5).fill(0);
  let x = 10;
  let y = 10;
  const offset = 60;

  const board = document.getElementById('board');
  balls.map(() => {
    x += offset;
    const ball = createBall(x, y);
    board.appendChild(ball);
    const ballPos = { x, y, id: `${x}_${y}` };
    return ballPos;
  });
  const shooter = createShooter();
};

window.onload = generateBalls;
