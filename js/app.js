// Enemies our player must avoid
const Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
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


var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 380;
};

Player.prototype.update = function(dt) {
    if(player.x === enemy1.x && player.y === enemy1.y ){
        console.log('ha')
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function (e) {
    if (e === "down") {
        this.y += 82
    } else if (e === "up") {
        if (this.y === 52) {
            this.y = 380;
            this.sprite = 'images/char-boy-deal.png';
        } else {
            this.y -= 82;
            console.log(e);
        }
    } else if (e === "left") {
        this.x -= 101;
        console.log(e);
    } else if (e === "right") {
        this.x += 101;
        console.log(e);
    }
};


var player = new Player();
var enemy1 = new Enemy();
enemy1.y = 52;
enemy1.speed = 2;
var enemy2 = new Enemy();
enemy2.y = 134;
enemy2.speed = 5;
var enemy3 = new Enemy();
enemy3.y = 216;
enemy3.speed = 8;
var enemy4 = new Enemy();
enemy4.y = 134;
enemy4.speed = 2;
enemy4.x = -300;
var enemy5 = new Enemy();
enemy5.y = 216;
enemy5.speed = 3;
enemy5.x = -300;


var allEnemies =[enemy1, enemy2, enemy3, enemy4, enemy5]
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.




document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
