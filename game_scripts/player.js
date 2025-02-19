/**
 * Player object
 * 
 * Keeps track of player health, score, chain, etc
 * Handles movement and collision detection
 */

class Player {
    constructor(gameObject, canvas, ctx) {
        this.game = gameObject;
        this.canvas = canvas;
        this.ctx = ctx;

        this.src = PLAYER_IMG;
        this.width = PLAYER_IMG_WIDTH;
        this.height = PLAYER_IMG_HEIGHT;

        this.score = 0;
        this.keys = [];
        
        this.x = 0;
        this.y = this.game.ground_height - this.height;
    }
    
    // checks for player movement
    checkKeys(keyCode) {
        if (!this.game.running) return;

    }

    // draw the player model
    draw() {
        this.ctx.drawImage(this.src, this.x, this.y, this.width, this.height);
    }
}