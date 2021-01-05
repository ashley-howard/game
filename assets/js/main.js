var map = document.getElementById('map');
var table = document.getElementById('table');

var menuDialogue = document.getElementById('menu-dialogue');
var menuItem1 = document.getElementById('menu-item-1');
var menuItem2 = document.getElementById('menu-item-2');
var menuItem3 = document.getElementById('menu-item-1');
var menuItem4 = document.getElementById('menu-item-1');

var menuMove1 = document.getElementById('move-1')
var menuMove2 = document.getElementById('move-2')
var menuMove3 = document.getElementById('move-3')
var menuMove4 = document.getElementById('move-4')

var monster1 = document.getElementById('monster-1')
var monster2 = document.getElementById('monster-2')
var monster3 = document.getElementById('monster-3')
var monster4 = document.getElementById('monster-4')
var monster5 = document.getElementById('monster-5')
var monster6 = document.getElementById('monster-6')

var healthOpp = document.getElementById('health-opponent')
var healthMine = document.getElementById('health-mine')

var playerNameDiv = document.getElementById('player-name')
var playerName = "Ash";
playerNameDiv.innerHTML = playerName;

var moneyDiv = document.getElementById('money')
var money = 0;
moneyDiv.innerHTML = `£${money}`;

var screen;
screen = "map";

// when saving the game, can just save map numbers 

// 0 = grass
// 1 = wall
// 2 = player 
// 3 = monster
// 4 = shop
// 5 = pokecenter
// 7 = gym
// 8 = other people?
var map1 = [
    [1, 1, 1, 1, 1, 1],
    [1, 0, 0, 3, 0, 1],
    [1, 0, 0, 0, 0, 1],
    [1, 0, 2, 0, 0, 1],
    [1, 1, 1, 1, 1, 1]
];
// console.log(map1)

var startY;
var startX;

var totalX = map1[0].length;
var totalY = map1.length;

// function loadMap() {
//     var table = document.createElement("table");   // Create a <button> element
//     table.innerHTML = 3;                   // Insert text
//     map.appendChild(table);               // Append <button> to <body>
// }
// loadMap()


// rows
function updateMap() {
    for (var i = 1; i < table.rows.length; i++) {
        // cells
        for (var j = 0; j < table.rows[i].cells.length; j++) {
            // monster
            if (map1[i - 1][j] === 3) {
                table.rows[i].cells[j].classList.add('monster');
            }
            // player
            else if (map1[i - 1][j] === 2) {
                table.rows[i].cells[j].classList.add('player');
                startY = i - 1
                startX = j
            }
            // border
            else if (map1[i - 1][j] === 1) {
                table.rows[i].cells[j].classList.add('border');
            }
            // grass
            else if (map1[i - 1][j] === 0) {
                table.rows[i].cells[j].classList.add('grass');
            }
            table.rows[i].cells[j].innerHTML = map1[i - 1][j];
        }
    }
}
updateMap()



// starting point
// map1[3][2]

// var startPos = map1[3][2]
// console.log(startPos)

// var map1Copy = [
//     [1, 1, 1, 1, 1],
//     [1, 0, 0, 0, 1],
//     [1, 0, 1, 0, 1],
//     [1, 0, 2, 0, 1],
//     [1, 1, 1, 1, 1]
// ];

// if (x === 1) {
//     // don't go
// }


// console.log(startY, startX)

// // monster positions
// var monsterY = 1;
// var monsterX = 4;

// var canMove = true;

document.onkeydown = checkKey;
function checkKey(e) {

    e = e || window.event;

    if (screen == 'map') {
        // up arrow
        if (e.keyCode == '38') {
            calc('-', 'y');
            // give player class 'up'
        }

        // down arrow
        else if (e.keyCode == '40') {
            calc('+', 'y');
             // give player class 'down'
        }

        // left arrow
        else if (e.keyCode == '37') {
            calc('-', 'x');
             // give player class 'left'
        }

        // right arrow
        else if (e.keyCode == '39') {
            calc('+', 'x');
             // give player class 'right'
        }

        function calc(sign, axis) {
            var numY;
            var numX;

            if (sign == '+' && axis == 'y') {
                numY = 1;
                numX = 0;
            } else if (sign == '-' && axis == 'y') {
                numY = -1;
                numX = 0;
            } else if (sign == '+' && axis == 'x') {
                numY = 0;
                numX = 1;
            } else if (sign == '-' && axis == 'x') {
                numY = 0;
                numX = -1;
            }

            if (map1[startY + numY][startX + numX] == 1) {
                console.log('hit wall')
            } else {
                if (map1[startY + numY][startX + numX] == 3) {
                    monster()
                    document.getElementsByClassName('monster')[0].classList.remove('monster')

                }
                map1[startY += numY][startX += numX]
                map1[startY][startX] = 2;
                map1[startY - numY][startX - numX] = 0;
            }

            // remove all instances of "active" class
            document.getElementsByClassName('player')[0].classList.remove('player')

            updateMap()
        }
    }
}

var randMonster;
var randLvl;
var randMaxHp;
var randHp;

function monster() {
    console.log('encounter monster')

    // block moving on map and change screen
    screen = 'monster';

    // randomly choose monster from list
    randMonster = Math.floor(Math.random() * Object.keys(monsters).length);
    randLvl = Math.floor(Math.random() * 100) + 1;
    randMaxHp = Math.floor(Math.random() * 500) + 1;
    randHp = randMaxHp;

    document.getElementById('monster-opp-battle-name').innerHTML = monsters[Object.keys(monsters)[randMonster]].name
    document.getElementById('monster-opp-battle-level').innerHTML = `Lvl. ${randLvl}`
    document.getElementById('monster-opp-battle-health').innerHTML = `HP: ${randMaxHp} / ${randHp}`

    // show on screen

    // bring controls back to map
    // screen = 'map';

}


function menu(option) {
    if (option === 'fight') {
        document.getElementById('fight-menu').style.display = "flex";
        document.getElementById('main-menu').style.display = "none";
        fight()
    }
    else if (option === 'bag') {
        console.log('bag')
    }
    else if (option === 'monsters') {
        console.log('monsters')
    }
    else if (option === 'run') {
        console.log('run')
        screen = 'map';
    }
    else {
        console.log('error')
    }
}

function fight() {
    menuMove1.innerHTML = moves.tailWhip.name
    menuMove1.onclick = function () { myMove(moves.tailWhip) };

    menuMove2.innerHTML = moves.thunderBolt.name
    menuMove2.onclick = function () { myMove(moves.thunderBolt) };

    menuMove3.innerHTML = moves.whack.name
    menuMove3.onclick = function () { myMove(moves.whack) };

    menuMove4.innerHTML = moves.jump.name
    menuMove4.onclick = function () { myMove(moves.jump) };
}


var randHp;
function myMove(move) {
    console.log(move)

    menuDialogue.style.display = "flex";
    // if their health is zero, finish match
    if ((randHp - move.damage) <= 0) {
        console.log('you win')
        menuDialogue.innerHTML = `You beat ${document.getElementById('monster-opp-battle-name').innerHTML}!`;
        randHp = 0;
        document.getElementById('monster-opp-battle-health').innerHTML = `HP: ${randHp} / ${randMaxHp}`
        healthOpp.style.width = `${100 / (randMaxHp / randHp)}%`
        money += 300;
        moneyDiv.innerHTML = `£${money}`;
    } else {
        menuDialogue.innerHTML = `${usersMainSix[0][0].name} used ${move.name}!`;
        randHp -= move.damage;

        setTimeout(function () {
            document.getElementById('monster-opp-battle-health').innerHTML = `HP: ${randHp} / ${randMaxHp}`
            healthOpp.style.width = `${100 / (randMaxHp / randHp)}%`

            setTimeout(function () {
                // if it takes more than 50% of their HP, say it really hurt 
                menuDialogue.innerHTML = `It really hurt ${document.getElementById('monster-opp-battle-name').innerHTML}!`;

                // console.log(randHp)
                setTimeout(function () {
                    oppMove()
                }, 2000);
            }, 2000);
        }, 2000);
    }
}

function oppMove() {
    // takes no object because it's randomised
    console.log('their move, randomised')

    var randMove = Math.floor(Math.random() * 100) + 1;
    console.log("their move: " + randMove)

    // menuDialogue.style.display = "none";

    // if your health is zero, finish match
    if ((usersMainSix[0][2] - randMove) <= 0) {
        console.log('you lose')
        menuDialogue.innerHTML = `You blacked out!`;
        usersMainSix[0][2] = 0;
        updateMonsterStats()
        healthMine.style.width = `${100 / (usersMainSix[0][3] / usersMainSix[0][2])}%`
        console.log("my health: " + usersMainSix[0][2])

    } else {
        menuDialogue.innerHTML = `${document.getElementById('monster-opp-battle-name').innerHTML} used blah!`;
        usersMainSix[0][2] -= randMove;
        setTimeout(function () {

            updateMonsterStats()
            healthMine.style.width = `${100 / (usersMainSix[0][3] / usersMainSix[0][2])}%`
            console.log("my health: " + usersMainSix[0][2])

            setTimeout(function () {
                menuDialogue.innerHTML = "That really hurt!";

                setTimeout(function () {
                    menuDialogue.style.display = "none";
                }, 2000);
            }, 2000);
        }, 2000);
    }
    // usersMainSix[0][2] = usersMainSix[0][2]
}

var items = {
    "potion": {
        name: "Potion",
        type: "Health",
        hp: 10
    },
    "superPotion": {
        name: "Super potion",
        type: "Health",
        hp: 25
    },
    "maxPotion": {
        name: "Super potion",
        type: "Health",
        hp: 50
    },
    "pokeball": {
        name: "Pokeball",
        type: "Ball",
        catchRate: 10
    }
};

var moves = {
    "tailWhip": {
        name: "Tail whip",
        type: "Normal",
        damage: 10,
        hitChance: 100
    },
    "jump": {
        name: "Jump",
        type: "Normal",
        damage: 20,
        hitChance: 100
    },
    "thunderBolt": {
        name: "Thunder bolt",
        type: "Electric",
        damage: 50,
        hitChance: 90,
        effect: "Paralyzed",
        effectChance: 5
    },
    "whack": {
        name: "Whack",
        type: "Normal",
        damage: 30,
        hitChance: 100,
        effect: "Confused",
        effectChance: 5
    },
    "thrash": {
        name: "Thrash",
        type: "Grass",
        damage: 60,
        hitChance: 100
    }
};

// -- MONSTER DIRECTORY -- // move + level learnt //
var monsters = {
    "griller": {
        number: 1,
        name: "Griller", // "Gorilla", grass type
        type: "Grass",
        moves: [
            [moves.whack, 5],
            [moves.tailWhip, 12],
            [moves.thrash, 50],
        ],
        // evolution: [monsters.boltion, 16],
        description: "This monster...",
        breedChance: 40,
        breedNames: ["Grill", "er"],
        breedColour: "Green"
    },
    "boltion": {
        number: 2,
        name: "Boltion",
        type: "Electric",
        moves: [
            [moves.thunderBolt, 5]
        ],
        description: "This monster...",
        breedChance: 20,
        breedNames: ["Bolt", "ion"],
        breedColour: "Yellow"
    },
    "aquatia": {
        number: 100,
        name: "Aquatia", // rare, "a-KWAY-sha"
        type: "Water",
        moves: [
            [moves.whack, 5],
            [moves.tailWhip, 5]
        ],
        description: "This monster...",
        breedChance: 5,
        breedNames: ["Aquat", "ia"],
        breedColour: "Gold"
    },
    "ballopa": {
        number: 3,
        name: "Ballopa",
        type: "Normal",
        moves: [
            [moves.whack, 5],
            [moves.tailWhip, 5]
        ],
        description: "This monster...",
        breedChance: 50,
        breedNames: ["Ball", "opa"],
        breedColour: "Red"
    }
};

var usersMainSix = [
    [monsters.griller, 5, 200, 200, 2, 5],
    [monsters.boltion, 10, 76, 120, 2, 7],
    [monsters.aquatia, 5, 46, 120, 2, 23],
    [monsters.ballopa, 13, 76, 342, 2, 34],
    [monsters.aquatia, 53, 47, 433, 2, 34],
    [monsters.boltion, 9, 32, 443, 2, 34]
]

// monster, level, health, max health, exp points, exp point till next level, any stats (poisoned, high attack, etc)
var usersMonsters = [
    [usersMainSix],
    [monsters.boltion, 34, 76, 120, 2, 7],
    [monsters.aquatia, 42, 46, 120, 2, 23],
    [monsters.ballopa, 14, 76, 342, 2, 34],
    [monsters.aquatia, 43, 47, 433, 2, 34],
    [monsters.boltion, 521, 32, 443, 2, 34]
]

// monster, level, max health, holding item?
var map1Monsters = [
    [monsters.griller, 45, 200],
    [monsters.boltion, 27, 76],
    [monsters.boltion, 34, 32]
    [monsters.aquatia, 34, 46],
    [monsters.aquatia, 45, 47],
    [monsters.ballopa, 55, 76],
]

var specialItems = {
    "bike": {
        name: "Bike",
        playerSpeed: 20 // move faster by 20%
    }
}

// output monsters to screen
function updateMonsterStats() {
    for (var i = 0; i < usersMainSix.length; i++) {
        document.getElementById(`monster-${i + 1}-name`).innerHTML = usersMainSix[i][0].name
        document.getElementById(`monster-1-battle-name`).innerHTML = usersMainSix[0][0].name
        document.getElementById(`monster-${i + 1}-level`).innerHTML = `Lvl. ${usersMainSix[i][1]}`
        document.getElementById(`monster-1-battle-level`).innerHTML = `Lvl. ${usersMainSix[0][1]}`
        document.getElementById(`monster-${i + 1}-health`).innerHTML = `HP: ${usersMainSix[i][2]} / ${usersMainSix[i][3]}`
        document.getElementById(`monster-1-battle-health`).innerHTML = `HP: ${usersMainSix[0][2]} / ${usersMainSix[0][3]}`
        document.getElementById(`monster-${i + 1}-health-bar`).style.width = `${100 / (usersMainSix[i][3] / usersMainSix[i][2])}%`
        document.getElementById(`health-mine`).style.width = `${100 / (usersMainSix[0][3] / usersMainSix[0][2])}%`
    }
}
updateMonsterStats()

function breedName() {
    var a = Math.floor(Math.random() * 2);
    var b = a === 0 ? 1 : 0;

    console.log(a, b)
    // set a to first monster breedNames array
    // set b to second monster breedNames array
}