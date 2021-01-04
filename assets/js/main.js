var map = document.getElementById('map');
var table = document.getElementById('table');

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

var screen;
screen = "map";

// 0 = grass
// 1 = wall
// 2 = player 
// 3 = monster
var map1 = [
    [1, 1, 1, 1, 1, 1],
    [1, 0, 0, 3, 0, 1],
    [1, 0, 0, 0, 0, 1],
    [1, 0, 2, 0, 0, 1],
    [1, 1, 1, 1, 1, 1]
];
// console.log(map1)

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

var startY = 3;
var startX = 2;
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
        }

        // down arrow
        else if (e.keyCode == '40') {
            calc('+', 'y');
        }

        // left arrow
        else if (e.keyCode == '37') {
            calc('-', 'x');
        }

        // right arrow
        else if (e.keyCode == '39') {
            calc('+', 'x');
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


function monster() {
    console.log('encounter monster')

    // block moving on map and change screen
    screen = 'monster';

    // randomly choose monster from list


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
    menuMove1.innerHTML = movesList.tailWhip.name
    menuMove1.onclick = function () { myMove(movesList.tailWhip) };

    menuMove2.innerHTML = movesList.thunderBolt.name
    menuMove2.onclick = function () { myMove(movesList.thunderBolt) };

    menuMove3.innerHTML = movesList.whack.name
    menuMove3.onclick = function () { myMove(movesList.whack) };

    menuMove4.innerHTML = movesList.jump.name
    menuMove4.onclick = function () { myMove(movesList.jump) };
}


var myHealth = 100;
var oppHealth = 100;
function myMove(move) {
    console.log(move)

    // if their health is zero, finish match
    if ((oppHealth - move.damage) <= 0) {
        console.log('you win')
        oppHealth = 0;
    } else {
        oppHealth -= move.damage;
        oppMove()
    }

    healthOpp.style.width = `${oppHealth}%`
    console.log(oppHealth)
}

function oppMove() {
    // takes no object because it's randomised
    console.log('their move, randomised')
    var randMove = Math.floor(Math.random() * 100) + 1;

    // if your health is zero, finish match
    if ((myHealth - randMove) <= 0) {
        console.log('you lose')
        myHealth = 0;
    } else {
        myHealth -= randMove;
    }

    healthMine.style.width = `${myHealth}%`
    console.log(myHealth)
}


var items = {
    "potion": {
        name: "Potion",
        type: "Health",
        hp: 10
    },
    "super-potion": {
        name: "Super potion",
        type: "Health",
        hp: 25
    },
    "max-potion": {
        name: "Super potion",
        type: "Health",
        hp: 50
    },
    "pokeball": {
        name: "Pokeball",
        type: "Ball",
        catchrate: 10
    }
};

var movesList = {
    "tailWhip": {
        name: "Tail whip",
        type: "Normal",
        damage: 10
    },
    "jump": {
        name: "Jump",
        type: "Normal",
        damage: 20
    },
    "thunderBolt": {
        name: "Thunder bolt",
        type: "Electric",
        damage: 50
    },
    "whack": {
        name: "Whack",
        type: "Normal",
        damage: 30
    }
};

// -- MONSTER DIRECTORY -- // move + level learnt //
var monsters = {
    "griller": {//"Gorilla", grass type
        name: "Griller",
        type: "Grass",
        moves: [
            [movesList.whack, 5],
            [movesList.tailWhip, 5]
        ]
    },
    "boltion": {
        name: "Boltion",
        type: "Electric",
        moves: [
            [movesList.thunderBolt, 5]
        ]
    },
    "aquatia": {
        name: "Aquatia", // rare, "a-KWAY-sha"
        type: "Water",
        moves: [
            [movesList.whack, 5],
            [movesList.tailWhip, 5]
        ]
    },
    "ballopa": {
        name: "Ballopa",
        type: "Normal",
        moves: [
            [movesList.whack, 5],
            [movesList.tailWhip, 5]
        ]
    }
};

// monster, level, any stats
var usersMonsters = [
    [monsters.griller, 5],
    [monsters.boltion, 10]
]