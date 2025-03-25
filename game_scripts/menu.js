/**
 * Menu object
 *  checks for buttons being clicked & updates accordingly
 * 
 * Button object
 *  basically just a wrapper for the coordinates of each button
 *  plus a function to highlight the button on mouseover
 */

class Menu {
  constructor(gameObject, canvas, ctx) {
    this.game = gameObject;
    this.canvas = canvas;
    this.ctx = ctx;

    this.highScore = 0;

    this.mouseX = 0;
    this.mouseY = 0;

    this.img = new Image;
    this.img.src = 'game_images/menu.png'

    // define positions of buttons + shit
    this.play_button = new Button(245, 169, 460, 261);
  }

  // check if a mouseclick is on a menu item
  checkClick() {
    // ignore if the game is running
    if (this.game.running) return;

    if (this.play_button.mouseOver(this.mouseX, this.mouseY)) {
      this.game.start();
    }
  }

  // todo: set up a server
  submitHighscore() {

  }

  // render menu
  draw() {
    // draw background image
    this.ctx.drawImage(this.img, 0, 0);

    // check for recent / high score
    if (window.prevScore > this.highScore) {
      this.highScore = window.prevScore;
      // TODO: push to cookie
    }

    // draw highscore + previous run
    this.ctx.fillStyle = MENU_SCORE_COLOR;
    this.ctx.font = MENU_SCORE_FONT;
    this.ctx.fillText('Recent score: ' + window.prevScore, MENU_RECENT_SCORE_X, MENU_RECENT_SCORE_Y);
    this.ctx.fillText('High score: ' + this.highScore, MENU_HIGHSCORE_X, MENU_HIGHSCORE_Y);

    // highlight buttons if the mouse is over them
    if (this.play_button.mouseOver(this.mouseX, this.mouseY)) {
      this.play_button.highlight();
    }
  }
}

class Button {
  constructor(left, top, right, bot) {
    this.left = left;
    this.top = top;
    this.right = right;
    this.bot = bot;
  }

  mouseOver(m_x, m_y) {
    return (m_x > this.left) && (m_x < this.right) && (m_y > this.top) && (m_y < this.bot);
  }

  highlight() {
    // todo: highlight button on mouseover
  }
}