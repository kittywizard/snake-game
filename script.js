const grid = document.querySelector('.grid');
const score = document.getElementById('score');
const button = document.getElementById('start');
let squareArr = [];
let currentSnake = [2, 1, 0];
let direction = 1;
const width = 10;
let appleIndex = 0;

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

    //this mess is determining if the snake is hitting any of the walls or itself
    if /* bottom */ ((currentSnake[0] + width >= (width*width)  && direction === width) ||
       /* right wall */ (currentSnake[0] % width === (width-1) && direction === 1) ||
       /* left wall */ (currentSnake[0] % width === width && direction === -1) ||
       /* top */ (currentSnake[0] + width < width && direction === -width) ||
       /* snake */ (squareArr[currentSnake[0] + direction].classList.contains('snake'))) {

        return clearInterval(timerId);
    }
    //pop the tail off the snake and store it
    const tail = currentSnake.pop();
    
    //removing the styling by finding the tail position in the original array and removing the style
    squareArr[tail].classList.remove('snake');

    //adding a new element in the direction (just right for now)
    currentSnake.unshift(currentSnake[0] + direction);

    //add the styling to the current snake (in the grid array as well) 
    squareArr[currentSnake[0]].classList.add('snake');
}

//KeyCodes
//W - 87
//A - 65
//S - 83
//D - 68

function control(e){

    //can this be done with a switch?
        //or some other better, less messy fashion?

    if(e.keyCode === 87){
        //w - up
        direction = -width;
    } else if(e.keyCode === 65) {
        //a - left
        direction = -1;
    } else if(e.keyCode === 83){
        //s - down
        direction = +width;
    } else if(e.keyCode === 68) {
        //d - right
        direction = 1;
    }

}

function generateApples() {
    do {
        appleIndex = Math.floor(Math.random() * squareArr.length);
    } while(squareArr[appleIndex].classList.contains('snake'));

    squareArr[appleIndex].classList.add('apple');
}

generateApples();
//need to use keyup, otherwise other event listener types give you a different response. idk why
document.addEventListener('keyup', control);
const timerId = setInterval(move, 1000);
