/**
 * EnemiesManager Object
 * - add new enemy ()
 * - update()
 *  - determine if it's time to spawn
 *  - remove dead / off side enemies
 *  - 
 * 
 * Enemy Object
 * 
 * Stump extends Enemy
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