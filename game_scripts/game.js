/**
 * Game object
 */
class Game {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;

    this.running = false;
    this.player = null;
    
    this.ground_height = parseInt(this.canvas.clientHeight * GROUND_HEIGHT_RATIO);
  }
  
  // start the game
  start() {
    this.running = true;
    this.player = new Player(this, this.canvas, this.ctx);
  }

  // clean up + send the score to the menu screen
  end() { }

  // update positions of everything & draw frame
  update() {
    // check spawn timers

    // call updates for existing objects
    this.player.update();

    // draw
    this.draw();
  }

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

    // draw the background

    // draw enemies

    // draw player 
    this.player.draw();
  }
}