var map = document.getElementById('map');
var table = document.getElementById('table');

// 0 = can walk   1 = wall   2 = player
var map1 = [
    [1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 1],
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
            // if number is 2, give it a class of active
            if (map1[i - 1][j] === 2) {
                table.rows[i].cells[j].classList.add('active');
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

document.onkeydown = checkKey;
function checkKey(e) {

    e = e || window.event;

    // up arrow
    if (e.keyCode == '38') {
        if (map1[startY - 1][startX] != 1) {
            map1[startY -= 1][startX]
            map1[startY][startX] = 2;
            map1[startY + 1][startX] = 0;
        } else {
            console.log('hit wall')
        }
    }

    // down arrow
    else if (e.keyCode == '40') {
        if (map1[startY + 1][startX] != 1) {
            map1[startY += 1][startX]
            map1[startY][startX] = 2;
            map1[startY - 1][startX] = 0;
        }
        else {
            console.log('hit wall')
        }

    }

    // left arrow
    else if (e.keyCode == '37') {
        if (map1[startY][startX - 1] != 1) {
            map1[startY][startX -= 1]
            map1[startY][startX] = 2;
            map1[startY][startX + 1] = 0;
        } else {
            console.log('hit wall')
        }
    }

    // right arrow
    else if (e.keyCode == '39') {
        if (map1[startY][startX + 1] != 1) {
            map1[startY][startX += 1]
            map1[startY][startX] = 2;
            map1[startY][startX - 1] = 0; //set previous number to 0
        } else {
            console.log('hit wall')
        }
    }

    // updateMap()
    // console.log(map1)
    // console.log(startY, startX)
    console.log(map1[startY][startX])
    // console.log(startX, startY)

    // remove all instances of "active" class
    document.getElementsByClassName('active')[0].classList.remove('active')
    // then
    updateMap()
}