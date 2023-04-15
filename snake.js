const canvas = document.getElementById('snake-game');
const ctx = canvas.getContext('2d');

const CANVAS_WIDTH = canvas.width;
const CANVAS_HEIGHT = canvas.height;
const BLOCK_SIZE = 10;
const ROWS = CANVAS_HEIGHT / BLOCK_SIZE;
const COLUMNS = CANVAS_WIDTH / BLOCK_SIZE;
const INITIAL_SNAKE_LENGTH = 4;
const MAX_SCORE = 50;

let snake = [];
let direction = 'right';
let food = {};
let score = 0;

function init() {
    for(let i = 0; i < INITIAL_SNAKE_LENGTH; i++) {
        snake.push({
            x: i,
            y: 0
        });
    }
    generateFood();
    drawSnake();
    drawFood();
}

function generateFood() {
    let foodX = Math.floor(Math.random() * COLUMNS);
    let foodY = Math.floor(Math.random() * ROWS);
    for(let i = 0; i < snake.length; i++) {
        if(snake[i].x === foodX && snake[i].y === foodY) {
            generateFood();
            return;
        }
    }
    food = {
        x: foodX,
        y: foodY
    };
}

function drawBlock(x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
    ctx.strokeStyle = '#000';
    ctx.strokeRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
}

function drawSnake() {
    for(let i = 0; i < snake.length; i++) {
        drawBlock(snake[i].x, snake[i].y, '#00F');
    }
}

function drawFood() {
    drawBlock(food.x, food.y, '#F00');
}

function moveSnake() {
    const head = {
        x: snake[0].x,
        y: snake[0].y
    };
    switch(direction) {
        case 'left':
            head.x--;
            break;
        case 'up':
            head.y--;
            break;
        case 'right':
            head.x++;
            break;
        case 'down':
            head.y++;
            break;
    }
    if(checkCollision(head)) {
        gameOver();
        return;
    }
    snake.unshift(head);
    if(head.x === food.x && head.y === food.y) {
        score++;
        if(score === MAX_SCORE) {
            win();
            return;
        }
        generateFood();
    } else {
        snake.pop();
    }
    drawSnake();
    drawFood();
}

function checkCollision(head) {
    if(head.x < 0 || head.x >= COLUMNS || head.y < 0 || head.y >= ROWS) {
        return true;
    }
    for(let i = 1; i < snake.length; i++) {
        if(head.x === snake[i].x && head.y === snake[i].y) {
            return true;
        }
    }
    return false;
}

function gameOver() {
    alert('Game over!');
    location.reload();
}

function win() {
    alert('Congratulations, you won!');
    location.reload();
}

document.addEventListener('keydown', function(event) {
    const key = event.keyCode;
    switch(key) {
        case 37:
            if(direction !== 'right') {
                direction = 'left';
            }
            break;
        case 38:
            if(direction !== 'down') {
                direction = 'up';
            }
            break;
        case 39:
            if(direction !== 'left') {
                direction = 'right';
            }
            break;
        case
