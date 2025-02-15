class Game {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;

    this.running = false;
    this.score = 0;
    this.keys = [];
    
    this.ground_height = parseInt(this.canvas.clientHeight * GROUND_HEIGHT_RATIO);
  }

  // checks for player movement
  checkKeys(keyCode) {
    if (!this.running) return;

  }

  // start the game
  start() { }

  // clean up + send the score to the menu screen
  end() { }

  // update positions of everything
  update() { }

  // render game
  draw() {
    // draw the ground
    this.ctx.beginPath();
    this.ctx.strokeStyle = '2px solid black';
    this.ctx.moveTo(0, this.ground_height);
    this.ctx.lineTo(canvas.clientWidth, this.ground_height);
    this.ctx.stroke();

    this.ctx.fillStyle = '#19e03a';
    this.ctx.fillRect(0, this.ground_height, this.canvas.clientWidth, this.canvas.clientHeight - this.ground_height);
  }
}