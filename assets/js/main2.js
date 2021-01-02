

// 0 = can walk   1 = wall   2 = player
var map1 = [
    [1, 1, 1, 1, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 1, 0, 1],
    [1, 0, 2, 0, 1],
    [1, 1, 1, 1, 1]
];

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


var startX = 3;
var startY = 2;
console.log(`start x:${startX} y:${startY}`)

document.onkeydown = checkKey;
function checkKey(e) {
    var dir;

    e = e || window.event;

    // up arrow
    if (e.keyCode == '38') {
        dir = 'up';
        if (startY != 1) {
            startY -= 1;
        }
    }
    // down arrow
    else if (e.keyCode == '40') {
        dir = 'down';
        if (startY != 1) {
            startY += 1;
        }
    }
    // left arrow
    else if (e.keyCode == '37') {
        dir = 'left';
        if (startX != 1) {
            startX -= 1;
        }

    }
    // right arrow
    else if (e.keyCode == '39') {
        dir = 'right';

        if (startX != 1) {
            startX += 1;
        }
    }

    console.log(`${dir} x:${startX} y:${startY}`)
}



