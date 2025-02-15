const { createContext } = require("react");

class Menu {
    constructor(gameObject) {
      this.game = gameObject;
      this.recentScore = 0;
  
      this.src = 'game_images/menu.png'
      // define positions of buttons + shit
    }
  
    // check if a mouseclick is on a menu item
    checkClick(x, y) {
      // ignore if the game is running
      if (this.game.running) return;
    }
  
    // start the game
    startGame() {
  
    }
  
    // todo: set up a server
    submitHighscore() {
  
    }
  
    // render menu
    draw() {
      ctx.drawImage(this.src, 0, 0);
    }
  }