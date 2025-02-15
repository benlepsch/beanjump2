class Game {
    constructor(canvasWidth, canvasHeight) {
      this.running = false;
      this.score = 0;
      this.keys = [];

      this.canvasWidth = canvasWidth;
      this.canvasHeight = canvasHeight;
  
      this.ground_height = parseInt(this.canvasHeight * GROUND_HEIGHT_RATIO);
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
      ctx.beginPath();
      ctx.strokeStyle = '2px solid black';
      ctx.moveTo(0, this.ground_height);
      ctx.lineTo(canvas.clientWidth, this.ground_height);
      ctx.stroke();
  
      ctx.fillStyle = '#19e03a';
      ctx.fillRect(0, this.ground_height, canvas.clientWidth, canvas.clientHeight - this.ground_height);
    }
  }