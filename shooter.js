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
    };
  }
}
