let enemiesCount = [],
    allEnemies = [];

const createEnemies = () => {
    //this func will create enemies based on difficulty and push it to the allEnemies array.
    allEnemies = [];
    enemiesCount.forEach((e) => {
        let enemy = new Enemy();
        enemy.y = e;
        allEnemies.push(enemy);    
    });
};

const level = (e) => {
    //this is the level selection func. It will create enemies based on the enemiesCount array.
    //the values on the array are the coordinates on the canvas.
    if(e === "easy") {
        enemiesCount = [52,134,216];
        createEnemies();
    } else if(e === "medium") {
        enemiesCount = [52,134,216,52,134,216];
        createEnemies();
    } else {
        enemiesCount = [52,134,216,52,134,216,52,134,216];
        createEnemies();
    }
};

const charSelection = (c) => {
    //based on the user selection, this func will set the starting conditions of the player    
    if(c === 1) {
        player.sprite = 'images/char-boy.png';
        player.char = 'images/char-boy.png';
        player.charWinner = 'images/char-boy-deal.png';
        player.charLooser = 'images/char-boy-loo.png';
        document.getElementById("1").style.opacity = .2;
        document.getElementById("2").style.opacity = 1;
    } else {
        player.sprite = 'images/char-pink-girl.png';
        player.char = 'images/char-pink-girl.png';
        player.charWinner = 'images/char-pink-girl-deal.png';
        player.charLooser = 'images/char-pink-girl-loo.png';
        document.getElementById("2").style.opacity = .2;
        document.getElementById("1").style.opacity = 1;
    }
};

const reset = () => {
    //this func will reset the allEnemies array, the player sprites aswell as the score.
    //also, it will generate a new position for the gem.
    allEnemies = [];
    player.char = undefined;
    player.charWinner = undefined;
    player.score = 0;
    document.getElementById("score").innerHTML = player.score;
    document.getElementById("2").style.opacity = 1;
    document.getElementById("1").style.opacity = 1;
    gem.x = gem.gemRanX();
    gem.y = gem.gemRanY();
    player.won = false;
};

//Gem Section


class Gem {
    constructor() {
        this.sprite = 'images/Gem-Green.png';
        //these arrays represent all posible positions for the gem.
        this.gemXs = [-2,99,200,301,402];
        this.gemYs = [52,134,216];
        this.x = this.gemRanX();
        this.y = this.gemRanY();        
    }
    //this functions will randomize a position for the gem
    gemRanX() { return this.gemXs[Math.floor(Math.random() * 5)]; }
    gemRanY() { return this.gemYs[Math.floor(Math.random() * 3)]; }

    render(p) {
        //the gem will only render if the player sprite is set, and its x location its not null
        (p.char !== undefined && this.x !== null) &&
            ctx.drawImage(Resources.get(this.sprite), this.x, this.y);        
    }

    update(p) {
        //this func will receive the player as the argument, and check for collision.
        if (p.x === this.x && p.y === this.y) {
            //in case of collision, the gem will disappear as its x will be set to null
            //then the score will be updated and 3 seconds later a new gem will be generated
            p.score++;
            document.getElementById("score").innerHTML = p.score;
            this.x = null;
            setTimeout(() => {
                this.x = this.gemRanX();
                this.y = this.gemRanY();
            }, 3000);
        }
    }
}

//Enemy Section

class Enemy {
    constructor() {
        this.sprite = this.enemyColor();
        this.speed = this.enemySpeed();
        this.x = -150;
    }
    
    enemySpeed() {return Math.random() * 6 + 1;}
    enemyColor() {
        //this func will randomize the color of the enemies
        let avl = ['images/enemy-bug.png', 'images/enemy-bug-2.png', 'images/enemy-bug-3.png'];
        return avl[Math.floor(Math.random() * 3)];
    }

    update(dt, p) {
        //this method receives the player as argument, and if the player wins, it will freeze the enemies on the canvas start
        if (this.x < 501 && !p.won) {
            this.x += dt + this.speed;
        } else if(p.won) {
            this.x = -2;
        } else {
            this.x = -150;
        }
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

//Player Section

class Player {
    constructor() {
        this.char = undefined;
        this.charLooser = undefined;
        this.charWinner = undefined;
        this.sprite = this.char;
        this.x = 200;
        this.y = 380;
        this.score = 0;
    }

    update(all) {
        this.char !== undefined &&
        //this method will check for collisions between the player and the enemies.
        //the allEnemies array is received as the argument for this method.
            all.forEach((e) => {
                if ( //Enemys and player Ys are prefixed numbers.
                    e.y === this.y && e.x < this.x && e.x > this.x - 70
                    ||
                    e.y === this.y && e.x > this.x && e.x < this.x + 70
                ) {
                    //Sets the original coordinates and puts on the looser char
                    //also, updates the score
                    if (this.score > 0) {
                        this.score--;
                        document.getElementById("score").innerHTML = this.score;
                    };
                    this.sprite = this.charLooser;
                    this.x = 200;
                    this.y = 380;
                }
            });
    };

    render() {
        this.char !== undefined && ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
        //the player only gets rendered after the char selection
    };

    handleInput(e, enemies) {
        if (e === "down") {
            if (this.y < 379 && this.y > 51) {
                //handles the "down" key. The "if" guarantees that the player will not fall of the canvas.
                this.y += 82;
            }
        } else if (e === "up" && enemies.length > 0) {
            if (this.y === 52) {
                // handles the "up" key. after the 52 position its win position, so the
                // sprite gets updated, aswell as the won status and the score.
                this.y -= 82;
                this.sprite = this.charWinner;
                this.won = true;
                this.score++;
                document.getElementById("score").innerHTML = this.score;
                //after 1sec the player position gets reset
                setTimeout(() => {
                    this.y = 380;
                    this.x = 200;
                    this.won = false;
                }, 1000);
            } else if (this.y === 380) {
                this.y -= 82;
                //this will make sure that the player sprite gets reset after winning or loosing
                this.sprite = this.char;
            } else if (this.y > 51) {
                this.y -= 82;
            }
        } else if (e === "left") {
            // handles the "left" key and avoid the player from going of the canvas
            if (this.x > -2) {
                this.x -= 101;
            }
        } else if (e === "right") {
            // handles the "right" key and avoid the player from going of the canvas
            if (this.x < 402) {
                this.x += 101;
            }
        }
    }
}


//Objs init
let player = new Player();
let gem = new Gem();

//Event Listener
document.addEventListener('keyup', function(e) {
    const allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode], allEnemies);
});
