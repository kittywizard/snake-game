const grid = document.querySelector('.grid');
const score = document.getElementById('score');
const button = document.getElementById('start');
let squareArr = [];

function createGrid() {

    const squareSize = 100;

    for(var i = 0; i <= squareSize - 1; i++){
        let newDiv = document.createElement('div');
        newDiv.className = 'square';
        squareArr.push(newDiv);
        //grid.appendChild(newDiv);
        //console.log(newDiv);
    }
 
}

createGrid();
console.log(squareArr);