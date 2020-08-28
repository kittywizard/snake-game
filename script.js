const grid = document.querySelector('.grid');
const score = document.getElementById('score');
const button = document.getElementById('start');
let squareArr = [];
let currentSnake = [0, 1, 2];

function createGrid() {

    const squareSize = 100;

    for(let i = 0; i <= (squareSize - 1); i++){
        let square = document.createElement('div');
        square.classList.add('square');
            //use classList.add instead of className as it allows for multiple class assignments
            //and has other functions you can use
        squareArr.push(square);
        grid.appendChild(squareArr[i]);
    }
 
}

createGrid();

//index is whatever position the array is at currently
//=> arrow function to add each of the snake's positions into the grid
currentSnake.forEach(index => squareArr[index].classList.add('snake'));