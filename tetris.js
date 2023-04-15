const canvas = document.getElementById('tetris-game');
const ctx = canvas.getContext('2d');

const ROW = 20;
const COLUMN = 10;
const BLOCK_SIZE = 30;
const BOARD_WIDTH = COLUMN * BLOCK_SIZE;
const BOARD_HEIGHT = ROW * BLOCK_SIZE;

canvas.width = BOARD_WIDTH;
canvas.height = BOARD_HEIGHT;

const colors = [
    '#000',
    '#F00',
    '#0F0',
    '#00F',
    '#FF0',
    '#F0F',
    '#0FF',
    '#AAA'
];

const board = [];
for(let row = 0; row < ROW; row++) {
    board[row] = [];
    for(let col = 0; col < COLUMN; col++) {
        board[row][col] = 0;
    }
}

const shapes = [
    [],
    [
        [1, 1],
        [1, 1]
    ],
    [
        [0, 2, 0],
        [2, 2, 2]
    ],
    [
        [3, 3, 0],
        [0, 3, 3]
    ],
    [
        [4, 0, 0],
        [4, 4, 4]
    ],
    [
        [0, 0, 5],
        [5, 5, 5]
    ],
    [
        [6, 6, 6, 6]
    ],
    [
        [7, 7, 7],
        [0, 7, 0]
    ]
];

let currentPiece = getRandomPiece();
let pieceRow = 0;
let pieceCol = Math.floor(COLUMN / 2) - Math.ceil(currentPiece[0].length / 2);

let score = 0;

function getRandomPiece() {
    const randomShape = Math.floor(Math.random() * (shapes.length - 1)) + 1;
    const shape = shapes[randomShape];
    const piece = [];
    for(let row = 0; row < shape.length; row++) {
        piece[row] = [];
        for(let col = 0; col < shape[row].length; col++) {
            piece[row][col] = shape[row][col];
        }
    }
    return piece;
}

function drawPiece(piece, row, col) {
    for(let r = 0; r < piece.length; r++) {
        for(let c = 0; c < piece[r].length; c++) {
            if(piece[r][c]) {
                const x = (col + c) * BLOCK_SIZE;
                const y = (row + r) * BLOCK_SIZE;
                ctx.fillStyle = colors[piece[r][c]];
                ctx.fillRect(x, y, BLOCK_SIZE, BLOCK_SIZE);
                ctx.strokeStyle = '#000';
                ctx.strokeRect(x, y, BLOCK_SIZE, BLOCK_SIZE);
            }
        }
    }
}

function drawBoard() {
    for(let row = 0; row < ROW; row++) {
        for(let col = 0; col < COLUMN; col++) {
            const x = col * BLOCK_SIZE;
            const y = row * BLOCK_SIZE;
            const block = board[row][col];
            ctx.fillStyle = colors[block];
            ctx.fillRect(x, y, BLOCK_SIZE, BLOCK_SIZE);
            ctx.strokeStyle = '#000';
            ctx.strokeRect(x, y, BLOCK_SIZE, BLOCK_SIZE);
        }
    }
}

function moveDown() {
    pieceRow++;
    if(checkCollision()) {
        pieceRow--;
        addPieceToBoard();
        clearRows();
        currentPiece = getRandomPiece();
        pieceRow = 0
