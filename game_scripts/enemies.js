/**
 * EnemiesManager Object
 * - add new enemy ()
 * - update()
 *  - determine if it's time to spawn
 *  - remove dead / off side enemies
 *  - 
 * 
 * Enemy Object
 * - update position, flip + drop off when killed
 * - draw()
 * 
 * Chevy extends Enemy
 * 
 */

class EnemiesManager {
    constructor() {
        // modify spawn time based on # of alive enemies?
        this.alive_enemies = []
        this.begin = new Date().getTime();
        this.last = this.begin;
        this.cooldown = 0;
        
    }
}

class Enemy {
    constructor(canvas, ctx, src, speed, direction, score, width, height, base_y) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.src = src;
        this.speed = speed;
        this.direction = direction;
        this.score = score;
        this.width = width;
        this.height = height;
        this.base_y = base_y;

        this.alive = true;
        this.y = this.base_y;

        if (this.direction == 1) {
            this.x = -1 * this.width;
        } else if (this.direction == -1) {
            this.x = this.canvas.clientWidth;
        } else {
            console.log('error: invalid direction: ' + this.direction);
        }
    }

    isOnScreen() {
        // todo
    }

    update() {
        if (alive) {
            this.x += this.speed * this.direction;
        }
    }

    draw() {
        this.ctx.drawImage(this.src, this.x, this.y, this.width, this.height);
    }
}