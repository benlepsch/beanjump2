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

        this.init();
    }

    /**
     * Initialize all the values
     * Not in the constructor so I can call it for debugging while building
     * 
     * @returns null
     */
    init() {
        this.src = PLAYER_IMG;
        this.width = PLAYER_IMG_WIDTH;
        this.height = PLAYER_IMG_HEIGHT;

        this.score = 0;
        this.chain = 0;
        this.keys = [];

        this.accelX = 0;
        this.accelY = 0;
        this.velX = 0;
        this.velY = 0;
        this.jumpable = true;
        
        this.x = 0;
        this.y = this.game.ground_height - this.height + GROUND_SLIPPAGE;
        this.base_y = this.game.ground_height - this.height + GROUND_SLIPPAGE;
    }
    
    /**
     * Keeps track of keys currently pressed down
     * 
     * @param {number} keyCode 
     * @returns null
     */
    keyDown(keyCode) {
        this.keys[keyCode] = true;
    }

    /**
     * Keeps track of keys currently pressed down
     * 
     * @param {number} keyCode 
     * @returns null
     */
    keyUp(keyCode) {
        this.keys[keyCode] = false;
    }

    /**
     * Check keys currently pressed down
     * Update velocity & acceleration
     * Collision detection with the game window
     * Update position
     * Jump logic
     * Collision detection with live enemies
     * Update score + chain
     * 
     * @returns null
     */
    update() {
        // Check keys currently pressed down
        if (this.keys[KEY_LEFT]) {
            this.accelX -= PLAYER_ACCEL_X;
        }

        if (this.keys[KEY_RIGHT]) {
            this.accelX += PLAYER_ACCEL_X;
        }

        if (this.keys[KEY_UP] && this.jumpable) {
            this.accelY -= PLAYER_ACCEL_JUMP;
            this.jumpable = false;
        }

        // update position, velocity, acceleration
        this.velX = constrain(this.velX + this.accelX, -1*PLAYER_MAX_VEL_X, PLAYER_MAX_VEL_X);
        this.velY = constrain(this.velY + this.accelY + PLAYER_GRAVITY, -1*PLAYER_MAX_VEL_Y, PLAYER_MAX_VEL_Y);

        // decay X velocity && acceleration values
        this.velX = (this.velX < 0) ? Math.ceil(this.velX / 2) : Math.floor(this.velX / 2);
        this.accelX = (this.accelX < 0) ? Math.ceil(this.accelX / 4) : Math.floor(this.accelX / 4);
        this.accelY = (this.accelY < 0) ? Math.ceil(this.accelY / 4) : Math.floor(this.accelY / 4);
    
        // check collision with the game window

        // update player position
        this.x = constrain(this.x + this.velX, 0, CANVAS_WIDTH - this.width);
        this.y = constrain(this.y + this.accelY, 0, this.base_y);

        // check if the player can jump

    }

    
    /**
     * Draw the player model
     * 
     * @returns null
     */
    draw() {
        this.ctx.drawImage(this.src, this.x, this.y, this.width, this.height);
    }
}