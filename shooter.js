class Shooter {
  #id;
  #position;
  #speed;
  #color;
  constructor(id, position, speed, color) {
    this.#id = id;
    this.#position = position;
    this.#speed = speed;
    this.#color = color;
  };

  move() {
    this.#position.x -= this.#speed.dx;
    this.#position.y -= this.#speed.dy;
  };

  getCollidedBall(balls) {
    const { x: shooterX, y: shooterY, width: shooterWidth } = this.#position;
    return balls.find(({ position }) => {
      const { x, y, height, width } = position;
      if (shooterX <= x + width && shooterY <= y + height) return true;
      if (shooterX + shooterWidth <= x + width && shooterY <= y + height) return true;
    })
  };

  getInfo() {
    const { x, y } = this.#position;
    return {
      id: this.#id,
      position: { x, y },
      speed: this.#speed,
      color: this.#color
    };
  };
}
