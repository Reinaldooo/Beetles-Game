let char = undefined,
    charWinner = 'images/char-boy-deal.png',
    i = 0,
    enemiesCount = [],
    allEnemies = [],
    score = 0;

const createEnemies = () => {
    allEnemies = [];
    enemiesCount.forEach((e) => {
        let enemy = new Enemy();
        enemy.y = e;
        enemy.speed = Math.random()*8+1;
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
    } else {
        player.sprite = 'images/char-pink-girl.png';
        char = 'images/char-pink-girl.png';
        charWinner = 'images/char-pink-girl-deal.png';
    }
}

const Enemy = function() {
    this.sprite = 'images/enemy-bug.png';
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

Player.prototype.update = function(dt) {
};

Player.prototype.render = function() {
    char != undefined && ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function (e) {
    if (e === "down") {
        if (this.y < 379 && this.y > 51) {
            this.y += 82;
        }
    } else if (e === "up") {
        if (this.y === 52) {
            this.y -= 82;
            this.sprite = charWinner;
            score++;
            setTimeout(() => {
                this.y = 380;
                this.x = 200;
            }, 1500);
        } else if (this.y === 298) {
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
    } else if (e === "plus") {
        let y = [52,134,216];
        let enemy = new Enemy();
        enemy.y = y[i];
        enemy.speed = Math.random()*8 + 2;
        allEnemies.push(enemy);
        if(i === 2){ 
            i = 0 
        } else {
            i++
        };
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
