class Shooter {
  #id;
  #position;
  #speed;
  constructor(id, position, speed) {
    this.#id = id;
    this.#position = position;
    this.#speed = speed;
  }

  move() {
    this.#position.x -= this.#speed.dx;
    this.#position.y -= this.#speed.dy;
  }

  getInfo() {
    const { x, y } = this.#position;
    return {
      id: this.#id,
      position: { x, y },
      speed: this.#speed,
    }
  }
}

const colors = ['red', 'black', 'green', 'blue'];
const getColor = () => {
  const index = Math.floor(Math.random() * colors.length);
  return colors[index];
};

const drawBall = (x, y) => {
  const ball = document.createElement('div');
  ball.setAttribute('class', 'ball');
  ball.style.left = x;
  ball.style.top = y;
  ball.style.backgroundColor = getColor();
  return ball;
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

const generateBalls = () => {
  const balls = [];
  let x = 10;
  let y = 10;
  const offset = 60;

  const board = document.getElementById('board');

  for (let index = 0; index < 5; index++) {
    x += offset;
    balls.push({ x, y, id: `${x}_${y}` });
    const ball = drawBall(x, y);
    board.appendChild(ball);
  }

  const shooter = new Shooter('shooter', { x: 220, y: 900 }, { dx: 1, dy: 5 });
  const game = document.getElementById('game');

  drawShooter(shooter, game);
  setInterval(() => {
    shooter.move();
    updateShooter(shooter);
  }, 50);
};

window.onload = generateBalls;
