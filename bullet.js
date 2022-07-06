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
