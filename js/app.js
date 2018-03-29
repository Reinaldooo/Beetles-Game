let char = undefined,
    charWinner = undefined,
    charLooser = undefined,
    enemiesCount = [],
    allEnemies = [],
    enemyX = [],
    enemyY = [],
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
    document.getElementById("char").className = "invisible";
    setTimeout(() => {
        document.getElementById("char").style.display = "none";
    }, 500);
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
}

const enemySpeed = () => Math.random()*6+1;
const enemyColor = () => {
    let avl = ['images/enemy-bug.png','images/enemy-bug-2.png','images/enemy-bug-3.png']
    return avl[Math.floor(Math.random()*3)];
}

const Enemy = function() {
    this.sprite = enemyColor();
    this.speed = enemySpeed();
    this.x = -150;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    if(this.x < 501) {
        this.x += dt+this.speed
    } else {
        this.x = -150
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

const Player = function() {
    this.sprite = char;
    this.x = 200;
    this.y = 380;
};

Player.prototype.update = function() {    
    char != undefined && 
    allEnemies.forEach((e) => {
        if( //Enemys and player Ys are prefixed numbers.
            e.y === player.y && e.x < player.x && e.x > player.x -70
            ||
            e.y === player.y && e.x > player.x && e.x < player.x +70
        ) {
            //Set the original coordinates and puts on the looser char
            this.sprite = charLooser;
            this.x = 200;
            this.y = 380;
        }
    });
};

Player.prototype.render = function() {
    char != undefined && ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function (e) {
    if (e === "down") {
        if (this.y < 379 && this.y > 51) {
            this.y += 82;
        }
    } else if (e === "up" && allEnemies.length > 0) {
        if (this.y === 52) {
            this.y -= 82;
            this.sprite = charWinner;
            score++;
            document.getElementById("score").innerHTML = score;
            setTimeout(() => {
                this.y = 380;
                this.x = 200;
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
};


let player = new Player();

document.addEventListener('keyup', function(e) {
    const allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        107: 'plus',
        187: 'plus'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
