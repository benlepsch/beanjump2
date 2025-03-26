/**
 * Game object
 * 
 * FloatyText object
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
    this.score = 0;
    this.player = new Player(this, this.canvas, this.ctx);
    this.em = new EnemyManager(this.canvas, this.ctx);
    this.floatyTexts = [];
  }

  // clean up + send the score to the menu screen
  end() {
    window.prevScore = this.score;
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
        // console.log('collision with ' + e);

        // if player is mostly above the enemy + moving down, it's a win
        let player_bottom = this.player.y + this.player.height;
        if ((player_bottom + PLAYER_COLLISION_SLIPPAGE > e.y) && (player_bottom < e.y + e.height) && (this.player.velY > 0)) {
          // jump + add score / chain
          // "kill" enemy
          this.score += e.score * this.player.chain;

          // create new floaty text
          let ftstr = '';
          if (this.player.chain == 1) {
            ftstr = e.score;
          } else {
            ftstr = this.player.chain + ' chain\n' + e.score + 'x' + this.player.chain;
          }
          this.floatyTexts.push(new FloatyText(ftstr, this.canvas, this.ctx, this.player.x, this.player.y));
          
          // console.log('player score: ' + this.score + '\tchain: ' + this.player.chain);
          
          this.player.bounce();
          this.em.kill(i);
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

    // draw the sky
    this.ctx.fillStyle = SKY_COLOR;
    this.ctx.fillRect(0, 0, this.canvas.clientWidth, this.ground_height);

    // draw enemies
    this.em.draw();

    // draw player 
    this.player.draw();

    // floaty texts float upwards after kills
    for (const [i, ft] of this.floatyTexts.entries()) {
      if (ft.done()) {
        this.floatyTexts.splice(i, 1);
      }
      console.log('gonna update this text');
      ft.update();
    }

    // draw score (top left)
    this.ctx.font = SCORE_FONT;
    this.ctx.strokeStyle = SCORE_STROKE;
    this.ctx.strokeText('Score: ' + this.score, SCORE_X, SCORE_Y);
  }
}

class FloatyText {
  constructor(txt, canvas, ctx, x, y) {
    this.text = txt;
    this.canvas = canvas;
    this.ctx = ctx;

    this.x = x;
    this.y = y;

    this.alpha = 1;
  }

  done() {
    return (this.alpha <= 0);
  }

  update() {
    this.alpha -= FT_MINUS_ALPHA;
    this.x -= FT_MINUS_X;
    console.log('big update: alpha: ' + this.alpha + '\tx: ' + this.x);

    this.ctx.globalAlpha = this.alpha;
    this.draw();
    this.ctx.globalAlpha = 1;
  }

  draw() {
    console.log('drawing ft');
    this.ctx.font = FT_FONT;
    this.ctx.fillStyle = FT_COLOR;
    this.ctx.fillText(this.text, this.x, this.y);
  }
}