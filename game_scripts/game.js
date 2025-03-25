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
  end() {
    this.running = false;
  }

  // update positions of everything 
  // check collision
  // draw frame
  update() {
    // call updates for existing objects
    this.player.update();

    // EnemyManager update checks for spawn timer
    this.em.update();

    // check collisions
    for (let i = 0; i < this.em.enemies.length; i++) {
      let e = this.em.enemies[i];

      if (colliding(e, this.player)) {
        console.log('collision with ' + e);

        // if player is mostly above the enemy + moving down, it's a win
        let player_bottom = this.player.y + this.player.height;
        if ((player_bottom + PLAYER_COLLISION_SLIPPAGE > e.y) && (player_bottom < e.y + e.height) && (this.player.velY > 0)) {
          // jump + add score / chain
          // "kill" enemy
          this.player.bounce();
          this.em.kill(i)
        } else {
          // gg
          this.end();
          return;
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

    this.ctx.fillStyle = GROUND_COLOR;
    this.ctx.fillRect(0, this.ground_height, this.canvas.clientWidth, this.canvas.clientHeight - this.ground_height);

    // draw the background

    // draw enemies
    this.em.draw();

    // draw player 
    this.player.draw();
  }
}