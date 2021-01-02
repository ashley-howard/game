var map = document.getElementById('map');
var table = document.getElementById('table');

// 0 = can walk   1 = wall   2 = player
var map1 = [
    [1, 1, 1, 1, 1, 1],
    [1, 0, 0, 3, 0, 1],
    [1, 0, 0, 0, 0, 1],
    [1, 0, 2, 0, 0, 1],
    [1, 1, 1, 1, 1, 1]
];
console.log(map1)

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
            if (map1[i - 1][j] === 2) {
                table.rows[i].cells[j].classList.add('player');
            }
            // border
            if (map1[i - 1][j] === 1) {
                table.rows[i].cells[j].classList.add('border');
            }
            // grass
            if (map1[i - 1][j] === 0) {
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
console.log(startY, startX)

// // monster positions
// var monsterY = 1;
// var monsterX = 4;

document.onkeydown = checkKey;
function checkKey(e) {

    e = e || window.event;

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
        console.log(sign, axis)
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

        if (map1[startY + numY][startX + numX] != 1) {
            map1[startY += numY][startX += numX]
            map1[startY][startX] = 2;
            map1[startY - numY][startX - numX] = 0;
        } else {
            console.log('hit wall')
        }
    }

    // remove all instances of "active" class
    document.getElementsByClassName('player')[0].classList.remove('player')

    updateMap()
}


