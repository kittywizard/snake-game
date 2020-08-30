//UI elements
const grid = document.querySelector('.grid');
const score = document.getElementById('score');
const button = document.getElementById('start');

//snake variables
let squareArr = [];
let currentSnake = [2, 1, 0];
let direction = 1;
const width = 10;
let appleIndex = 0;
let scoreNum = 0;

//timer variables
let timerId = 0;
let time = 1000;
let speed = 0.9;

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

function startGame() {

    //remove the snake
    currentSnake.forEach(index => squareArr[index].classList.remove('snake'));

    //remove the apples
    squareArr[appleIndex].classList.remove('apple');

    clearInterval(timerId);

    //reset all the variables
     currentSnake = [2, 1, 0];
     direction = 1;
     appleIndex = 0;
     scoreNum = 0;

     timerId = 0;
     time = 1000;
     speed = 0.9;

     score.textContent = score;

     generateApples();

     //add class of snake to currentSnake
     currentSnake.forEach(index => squareArr[index].classList.add('snake'));

     timerId = setInterval(move, time);
}

function move() {

    //this mess is determining if the snake is hitting any of the walls or itself
    if /* bottom */ ((currentSnake[0] + width >= (width*width)  && direction === width) ||
       /* right wall */ (currentSnake[0] % width === (width-1) && direction === 1) ||
       /* left wall */ (currentSnake[0] % width === width && direction === -1) ||
       /* top */ (currentSnake[0] + width < width && direction === -width) ||
       /* snake - 
                there's an error here when the snake eats an apple and then hits a wall */ 
                (squareArr[currentSnake[0] + direction].classList.contains('snake'))) {

        return clearInterval(timerId);
    }
    //pop the tail off the snake and store it
    const tail = currentSnake.pop();
    
    //removing the styling by finding the tail position in the original array and removing the style
    squareArr[tail].classList.remove('snake'); /* error here sometimes */

    //adding a new element in the direction
    currentSnake.unshift(currentSnake[0] + direction);

    //adding the eating apple function here. change later, variables are being stupid
    if (squareArr[currentSnake[0]].classList.contains('apple')) {
        squareArr[appleIndex].classList.remove('apple');

        //grow the snake
        squareArr[tail].classList.add('snake');
        currentSnake.push(tail);

        //generate new apples
        generateApples();

        //scoring
        scoreNum++;
        score.textContent = scoreNum;

        //speed up the snake
        clearInterval(timerId);
        time = time * speed;
        timerId = setInterval(move, time);
    }

    //add the styling to the current snake
    squareArr[currentSnake[0]].classList.add('snake');
}

function control(e){
    
    //KeyCodes
    //W - 87
    //A - 65
    //S - 83
    //D - 68

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

document.addEventListener('keyup', control);

button.addEventListener('click', startGame);

