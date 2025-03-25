/**
 * Global variable definitions
 * (todo) server connection
 * Event listeners
 * Main loop
 */



/********** Global Variables ***********/
const canvas = document.getElementById('game_canvas');
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

const ctx = canvas.getContext('2d');

const game = new Game(canvas, ctx);
const menu = new Menu(game, canvas, ctx);

window.prevScore = 0;

/********** Event Listeners ***********/
window.onclick = (e) => {
  menu.checkClick();
};

window.onkeydown = (e) => {
  // eventually i'll want to handle rebinding keys in the menu too
  if (game.running) game.player.keyDown(e.keyCode ? e.keyCode : e.which);
};

window.onkeyup = (e) => {
  // eventually i'll want to handle rebinding keys in the menu too
  if (game.running) game.player.keyUp(e.keyCode ? e.keyCode : e.which);
};

window.onmousemove = (e) => {
  if (game.running) return;

  menu.mouseX = e.clientX - canvas.offsetLeft;
  menu.mouseY = e.clientY - canvas.offsetTop;
}

// run the main loop when the window loads
window.onload = () => {    
  startGame(GAME_FPS);
}


/********** Main Loop ***********/
let fpsInterval, then, startTime, elapsed;
function startGame(fps) {
  fpsInterval = 1000 / fps;
  then = Date.now();
  startTime = then;

  runGame();
}

let debug = false;
function runGame() {
  if (!debug) requestAnimationFrame(runGame);
  
  now = Date.now();
  elapsed = now - then;

  if (elapsed > fpsInterval) { // && !paused) {
    then = now - (elapsed % fpsInterval);

    // clear the canvas to get ready for redrawing
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // if game is running, draw game
    if (game.running) {
      game.update();
    } else {
      menu.draw();
    }
  }
}