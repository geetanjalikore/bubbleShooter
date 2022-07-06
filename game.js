const calculateCenter = ({ position, size }) => {
  const { x, y } = position;
  const center = {};
  center.x = x + (size / 2);
  center.y = y + (size / 2);
  return center;
};

const caluclateDistance = (point1, point2) => {
  const xDistance = point1.x - point2.x;
  const yDistance = point1.y - point2.y;
  return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
};

class Game {
  #balls;
  #bullet;
  #view;
  constructor(balls, bullet, view) {
    this.#balls = balls;
    this.#bullet = bullet;
    this.#view = view;
  }

  shoot() {
    this.#bullet.move();
    return this.#bullet.getInfo();
  }

  getCollidedBall() {
    return this.#balls.find(ball => {
      const ballCenter = calculateCenter(ball);
      const { size } = ball;
      const bullet = this.#bullet.getInfo();
      const bulletCenter = calculateCenter(bullet);
      const distance = caluclateDistance(bulletCenter, ballCenter);
      if (distance <= size && ball.color === bullet.color) return true;
    })
  };

  remove(collidedBall) {
    this.#balls = this.#balls.filter(({ id }) => collidedBall.id !== id);
  };

  getInfo() {
    return {
      balls: this.#balls,
      bullet: this.#bullet,
      view: this.#view
    }
  }
}