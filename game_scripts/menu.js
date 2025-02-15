class Menu {
  constructor(gameObject) {
    this.game = gameObject;
    this.recentScore = 0;

    this.img = new Image;
    this.img.src = 'game_images/menu.png'

    // define positions of buttons + shit
    this.play_button = new Button(245, 169, 460, 261);
  }

  // check if a mouseclick is on a menu item
  checkClick(x, y) {
    // ignore if the game is running
    if (this.game.running) return;

    if (this.play_button.clicked(x, y)) {
      this.game.running = true;
    }
  }

  // start the game
  startGame() {

  }

  // todo: set up a server
  submitHighscore() {

  }

  // render menu
  draw() {
    this.game.ctx.drawImage(this.img, 0, 0);
  }
}

class Button {
  constructor(left, top, right, bot) {
    this.left = left;
    this.top = top;
    this.right = right;
    this.bot = bot;
  }

  clicked(m_x, m_y) {
    return (m_x > this.left) && (m_x < this.right) && (m_y > this.top) && (m_y < this.bot);
  }
}