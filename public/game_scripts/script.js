/**
 * Global variable definitions
 * (todo) server connection
 * Event listeners
 * Main loop
 */



/********** "Global" Variables ***********/
// run the loop when the window loads
window.onload = () => {
    const canvas = document.getElementById('game_canvas');
    const ctx = canvas.getContext('2d');

    /****** Variables ******/
    const game = new Game();
    const menu = new Menu(game);
    
    startGame(GAME_FPS, canvas, ctx, game, menu);
}


/********** Event Listeners ***********/
window.onclick = (e) => {
  menu.checkClick(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
};

window.onkeydown = (e) => {
  // eventually i'll want to handle rebinding keys in the menu too
  if (game.running) game.checkKeys(e.keyCode ? e.keyCode : e.which);
};

/********** Main Loop ***********/
let fpsInterval, then, startTime, elapsed;
function startGame(fps, canvas, ctx, game, menu) {
  fpsInterval = 1000 / fps;
  then = Date.now();
  startTime = then;

  runGame(canvas, ctx, game, menu);
}

function runGame(canvas, ctx, game, menu) {
  requestAnimationFrame(runGame);
  now = Date.now();
  elapsed = now - then;

  if (elapsed > fpsInterval) { // && !paused) {
    then = now - (elapsed % fpsInterval);

    // clear the canvas to get ready for redrawing
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // if game is running, draw game
    if (game.running) {
      game.draw();
    } else {
      game.draw();
      menu.draw();
    }
  }
}