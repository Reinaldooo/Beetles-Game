let char = undefined,
    charWinner = undefined,
    charLooser = undefined,
    enemiesCount = [],
    allEnemies = [],
    enemyX = [],
    enemyY = [],
    gemXs = [-2,99,200,301,402],
    gemYs = [52,134,216],
    won = false,
    score = 0;

const createEnemies = () => {
    allEnemies = [];
    enemiesCount.forEach((e) => {
        let enemy = new Enemy();
        enemy.y = e;
        allEnemies.push(enemy)    
    })
}

const level = (e) => {
    if(e === "easy") {
        enemiesCount = [52,134,216];
        createEnemies()
    } else if(e === "medium") {
        enemiesCount = [52,134,216,52,134,216];
        createEnemies()
    } else {
        enemiesCount = [52,134,216,52,134,216,52,134,216];
        createEnemies()
    }
}

const charSelection = (c) => {    
    if(c === 1) {
        player.sprite = 'images/char-boy.png';
        char = 'images/char-boy.png';
        charWinner = 'images/char-boy-deal.png';
        charLooser = 'images/char-boy-loo.png';
    } else {
        player.sprite = 'images/char-pink-girl.png';
        char = 'images/char-pink-girl.png';
        charWinner = 'images/char-pink-girl-deal.png';
        charLooser = 'images/char-pink-girl-loo.png';
    }
}

const reset = () => {
    allEnemies = [];
    char = undefined;
    charWinner = undefined;
    score = 0;
    document.getElementById("char").style.display = "block";
    document.getElementById("char").className = "visible";
    document.getElementById("score").innerHTML = score;
    gem.x = gemRanX();
    gem.y = gemRanY();
    won = false
}

//Gem Section

const gemRanX = () => gemXs[Math.floor(Math.random() * 5)]
const gemRanY = () => gemYs[Math.floor(Math.random() * 3)]

class Gem {
    constructor() {
        this.sprite = 'images/Gem-Green.png';
        this.x = gemRanX();
        this.y = gemRanY();
    }

    render() {
        (char != undefined && this.x != undefined) && ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    };

    update() {
        if (player.x === gem.x && player.y === gem.y) {
            score++;
            document.getElementById("score").innerHTML = score;
            this.x = undefined;
            setTimeout(() => {
                this.x = gemRanX();
                this.y = gemRanY();
            }, 3000);
        }
    }
}

//Enemy Section
const enemySpeed = () => Math.random() * 6 + 1;
const enemyColor = () => {
    let avl = ['images/enemy-bug.png', 'images/enemy-bug-2.png', 'images/enemy-bug-3.png']
    return avl[Math.floor(Math.random() * 3)];
}

class Enemy {
    constructor() {
        this.sprite = enemyColor();
        this.speed = enemySpeed();
        this.x = -150;
    }

    update(dt) {
        if (this.x < 501 && !won) {
            this.x += dt + this.speed
        } else if(won) {
            this.x = -2
        } else {
            this.x = -150
        }
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

//Player Section

class Player {
    constructor() {
        this.sprite = char;
        this.x = 200;
        this.y = 380;
    }

    update() {
        char != undefined &&
            allEnemies.forEach((e) => {
                if ( //Enemys and player Ys are prefixed numbers.
                    e.y === player.y && e.x < player.x && e.x > player.x - 70
                    ||
                    e.y === player.y && e.x > player.x && e.x < player.x + 70
                ) {
                    //Set the original coordinates and puts on the looser char
                    if (score > 0) {
                        score--;
                        document.getElementById("score").innerHTML = score;
                    };
                    this.sprite = charLooser;
                    this.x = 200;
                    this.y = 380;
                }
            });
    };

    render() {
        char != undefined && ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    };

    handleInput(e) {
        if (e === "down") {
            if (this.y < 379 && this.y > 51) {
                this.y += 82;
            }
        } else if (e === "up" && allEnemies.length > 0) {
            if (this.y === 52) {
                this.y -= 82;
                this.sprite = charWinner;
                won = true;
                score++;
                document.getElementById("score").innerHTML = score;
                setTimeout(() => {
                    this.y = 380;
                    this.x = 200;
                    won = false;
                }, 1000);
            } else if (this.y === 380) {
                this.y -= 82;
                this.sprite = char;
            } else if (this.y > 51) {
                this.y -= 82;
            }
        } else if (e === "left") {
            if (this.x > -2) {
                this.x -= 101;
            }
        } else if (e === "right") {
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
    player.handleInput(allowedKeys[e.keyCode]);
});
