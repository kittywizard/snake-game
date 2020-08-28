const grid = document.querySelector('.grid');
const score = document.getElementById('score');
const button = document.getElementById('start');
let squareArr = [];
let currentSnake = [2, 1, 0];
let direction = 1;

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

function move() {

    //pop the tail off the snake and store it
    const tail = currentSnake.pop();
    
    //removing the styling by finding the tail position in the original array and removing the style
    squareArr[tail].classList.remove('snake');

    //adding a new element in the direction (just right for now)
    currentSnake.unshift(currentSnake[0] + direction);
    //add the styling to the current snake (in the grid array as well) 
    squareArr[currentSnake[0]].classList.add('snake');
}

move();