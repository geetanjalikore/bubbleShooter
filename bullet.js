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

class Bullet {
  #id;
  #position;
  #speed;
  #color;
  #size;
  constructor(id, position, speed, color, size) {
    this.#id = id;
    this.#position = position;
    this.#speed = speed;
    this.#color = color;
    this.#size = size;
  };

  move() {
    this.#position.x -= this.#speed.dx;
    this.#position.y -= this.#speed.dy;
  };

  getCollidedBall(balls) {
    return balls.find(ball => {
      const ballCenter = calculateCenter(ball);
      const { size } = ball
      const bullet = this.getInfo();
      const bulletCenter = calculateCenter(bullet);
      const distance = caluclateDistance(bulletCenter, ballCenter);
      if (distance <= size && ball.color === this.#color) return true
    })
  };

  getInfo() {
    const { x, y } = this.#position;
    return {
      id: this.#id,
      position: { x, y },
      speed: this.#speed,
      color: this.#color,
      size: this.#size
    };
  };
};
