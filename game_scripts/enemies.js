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
 * Todo: more enemy varieties
 */

class EnemyManager {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;

        // modify spawn time based on # of alive enemies?
        this.enemies = [];
        this.types = ['chevy'];
        this.cooldown = SPAWN_FIRST_CD;
    }

    // check if it's time to spawn a new enemy
    isTime() {
        return (this.cooldown <= 0);
    }

    spawn(type) {
        let dir = (Math.random() < 0.55) ? -1 : 1;
        if (type == 'chevy') {
            this.enemies.push(new Chevy(this.canvas, this.ctx, dir));
        }
    }

    // remove enemies that go off screen
    remove(idx) {
        this.enemies.splice(idx, 1);
    }

    // kill enemies the player jumps on
    kill(idx) {
        // todo: squish + flip upside down + change alive value to false
        this.enemies[idx].alive = false;
        // this.enemies[idx].src = document.getElementById(this.enemies[idx].src.id + '_dead');
        this.enemies[idx].alive = false;
        // this.enemies[idx].src = document.getElementById(this.enemies[idx].src.id + '_dead');
    }

    // update position + check for off screen enemies
    // check if it's time to spawn a new enemy
    // collision detection handled in the game object
    update() {
        for (let i = 0; i < this.enemies.length; i++) {
            this.enemies[i].update();

            if (!this.enemies[i].isOnScreen()) {
                this.remove(i);
            }
        }

        // todo: randomize spawn type, reset counter on spawn
        if (this.isTime()) {
            this.spawn(this.types[0]);
            this.cooldown = SPAWN_FIRST_CD;            
        } else {
            this.cooldown --;
        }
    }

    draw() {
        for (let e of this.enemies) {
            e.draw();
        }
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
        this.moving = true;

        this.alive = true;
        this.y = this.base_y;
        this.accelY = 0;
        this.velY = 0;

        if (!this.moving) {
            this.x = 0;
        } else if (this.direction == 1) {
            this.x = -1 * this.width;
        } else if (this.direction == -1) {
            this.x = -1 * this.canvas.clientWidth;
        } else {
            console.log('error: invalid direction: ' + this.direction);
        }
    }

    isOnScreen() {
        return !((this.x*this.direction > this.canvas.clientWidth) || (this.x*this.direction + this.width < 0) || (this.y > this.canvas.clientHeight));
    }

    // update x if alive
    // update y if dead
    update() {
        if (!this.moving) return; // for debugging purposes

        if (this.alive) {
            this.x += this.speed;// * this.direction;
        } else {
            this.velY += ENEMY_DEATH_ACCEL;
            this.y += this.velY;
        }
    }

    draw() {
        let a = (this.alive) ? 1 : -1;

        this.ctx.save();
        this.ctx.scale(this.direction, a); 
        this.ctx.drawImage(this.src, this.x, this.y, this.direction*this.width, a*this.height);
        this.ctx.restore();
    }
}

class Chevy extends Enemy {
    constructor(canvas, ctx, direction) {
        super(canvas, ctx, document.getElementById(CHEVY_IMG + direction), CHEVY_VEL, direction, CHEVY_SCORE, 
                CHEVY_IMG_WIDTH, CHEVY_IMG_HEIGHT, CHEVY_BASE_Y);
    }
}