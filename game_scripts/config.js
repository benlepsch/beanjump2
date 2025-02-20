/**
 * Misc values that I want to be able to change easily
 * Default keybinds
 * Background image settings
 * Player movement 
 * Enemy spawning + movement
 * 
 * Global helper functions
 */



const GAME_FPS = 60;


/******** Background Setting ********/
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 500;
const GROUND_HEIGHT = 380;
const GROUND_SLIPPAGE = 5; // drop sprites this many pixels below ground level when drawing

/******** Player Miscellaneous Stuff ********/
const PLAYER_IMG = document.getElementById('player_img');
const PLAYER_IMG_WIDTH = 50;
const PLAYER_IMG_HEIGHT = 40;

const PLAYER_COLLISION_SLIPPAGE = 1.5*PLAYER_MAX_VEL_Y;
const PLAYER_MAX_CHAIN = 30;

/******** Default Keybinds ********/
// ideally i'm allowing these to be changed + storing in cookie
const KEY_LEFT = 65;      // a
const KEY_RIGHT = 68;     // d
const KEY_JUMP = 87;      // w
const KEY_DOWN = 83;      // s
const KEY_PAUSE = 32;     // space

/******** Player Movement ********/
const PLAYER_ACCEL_X = 10;
const PLAYER_MAX_VEL_X = 25;
const PLAYER_MAX_VEL_Y = 20;
const PLAYER_ACCEL_JUMP = 60;
const PLAYER_GRAVITY = 1.5;
const PLAYER_DOUBLE_JUMP = false;

/******** General Enemy Stuff ********/
const ENEMY_DEATH_ACCEL = 1.5;

/******** "Chevy" Enemy ********/
const CHEVY_IMG = document.getElementById('chevy_img');
const CHEVY_IMG_WIDTH = 100;
const CHEVY_IMG_HEIGHT = 50;
const CHEVY_VEL = 3;
const CHEVY_BASE_Y = GROUND_HEIGHT - CHEVY_IMG_HEIGHT + GROUND_SLIPPAGE;
const CHEVY_SCORE = 100;

/******** Helper Functions ********/

/**
 * Constrain a value within a range
 * 
 * @param {number} val 
 * @param {number} min 
 * @param {number} max 
 * @returns number between min and max
 */
function constrain(val, min, max) {
    if (typeof(val) != 'number') {
        console.log('error: val must be a number');
        return -1;
    }

    if (typeof(min) != 'number') {
        console.log('error: min must be a number');
        return -1;
    }

    if (typeof(max) != 'number') {
        console.log('error: max must be a number');
        return -1;
    }

    if (val > max) return max;
    if (val < min) return min;
    return val;
}

/**
 * Check if two objects are colliding
 * Objects must have x, y, width, height properties
 * 
 * @param {Object} obj1 
 * @param {Object} obj2 
 * @return bool
 */
function colliding(obj1, obj2) {
    let top1 = obj1.y;
    let top2 = obj2.y;

    let bot1 = obj1.y + obj1.height;
    let bot2 = obj2.y + obj2.height;

    let left1 = obj1.x;
    let left2 = obj2.x;

    let right1 = obj1.x + obj1.width;
    let right2 = obj2.x + obj2.width;

    // obj1 on top
    if (((bot1 > top2) && (bot1 < bot2)) &&
        (((right1 > left2) && (right1 < right2)) || ((left1 > left2) && (left1 < right2)))) {
        return true;
    }

    // obj2 on top
    if (((bot2 > top1) && (bot2 < bot1)) &&
        (((right2 > left1) && (right2 < right1)) || ((left2 > left1) && (left2 < right1)))) {
        return true;
    }

    // obj1 on the left
    if (((left1 > left2) && (left1 < right2)) &&
        (((top1 > top2) && (top1 < bot2)) || ((bot1 > top2) && (bot1 < bot2)))) {
        return true;
    }

    // obj2 on the left
    if (((left2 > left1) && (left2 < right1)) &&
        (((top2 > top1) && (top2 < bot1)) || ((bot2 > top1) && (bot2 < bot1)))) {
        return true;
    }

    return false;
}