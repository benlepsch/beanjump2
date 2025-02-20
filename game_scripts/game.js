/**
 * Game object
 */
class Game {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;

    this.running = false;
    this.player = null;
    this.em = null;
    
    this.ground_height = GROUND_HEIGHT;
  }
  
  // start the game
  start() {
    this.running = true;
    this.player = new Player(this, this.canvas, this.ctx);
    this.em = new EnemyManager(this.canvas, this.ctx);
  }

  // clean up + send the score to the menu screen
  end() { }

  // update positions of everything 
  // check collision
  // draw frame
  update() {
    // call updates for existing objects
    this.player.update();

    // EnemyManager update checks for spawn timer
    this.em.update();

    // check collisions
    for (let e of this.em.enemies) {
      if (colliding(e, this.player)) {
        console.log('collision with ' + e);

        // if player is mostly above the enemy + moving down, it's a win
        if ((this.player.y + this.player.height < e.y + PLAYER_COLLISION_SLIPPAGE) && (this.player.velY > 0)) {
          console.log('player wins it');
        } else {
          console.log('player loses it');
        }
      }
    }

    // draw the next frame
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
    this.em.draw();

    // draw player 
    this.player.draw();
  }
}