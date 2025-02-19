/**
 * Misc values that I want to be able to change easily
 * Default keybinds
 * Background image settings
 * Player movement 
 * Enemy spawning + movement
 */



const GAME_FPS = 1;


/******** Background Setting ********/
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 500;
const GROUND_HEIGHT_RATIO = 0.76;

/******** Player Miscellaneous Stuff ********/
const PLAYER_IMG = document.getElementById('player_img');
const PLAYER_IMG_WIDTH = 50;
const PLAYER_IMG_HEIGHT = 50;

// PLAYER_IMG.style.width = PLAYER_IMG_WIDTH + 'px';
// PLAYER_IMG.style.height = PLAYER_IMG_HEIGHT + 'px';

/******** Default Keybinds ********/
// ideally i'm allowing these to be changed + storing in cookie
const KEY_LEFT = 65;      // a
const KEY_RIGHT = 68;     // d
const KEY_JUMP = 87;      // w
const KEY_DOWN = 83;      // s
const KEY_PAUSE = 32;     // space

/******** Player Movement ********/
const PLAYER_ACCEL_X = 0;
const PLAYER_MAX_VEL_X = 0;
const PLAYER_ACCEL_JUMP = 0;
const PLAYER_GRAVITY = 0;
const PLAYER_TERMINAL_VELOCITY = 0;
const PLAYER_DOUBLE_JUMP = false;

/******** Enemy spawning + movement ********/
