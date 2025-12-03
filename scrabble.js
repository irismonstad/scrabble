// create main elements div to be able to centre them
const MAIN_ELEMENTS = document.createElement('div');
MAIN_ELEMENTS.classList.add('main_elements');
document.body.appendChild(MAIN_ELEMENTS);

// CREATE BOARD FOR THE GAME (https://github.com/hausnes/webutvikling/blob/main/eksempel/js/piksel-eksperiment/piksels.js)
const BOARD = document.createElement('div');
BOARD.classList.add('board');
MAIN_ELEMENTS.appendChild(BOARD);

const WIDTH = 15;
const HEIGHT = 15;

for (let i = 0; i < WIDTH*HEIGHT; ++i) {
    const field = document.createElement('div');
    field.classList.add('field');
    field.addEventListener("drop", dropHandler);
    field.addEventListener("dragover", dragoverHandler);
    BOARD.appendChild(field);
}

BOARD.style.gridTemplateColumns = `repeat(${WIDTH}, 1fr)`;
BOARD.style.gridTemplateRows = `repeat(${HEIGHT}, 1fr)`;

// document.body.appendChild(BOARD);

let boardArray = [];
for (let r = 0; r < HEIGHT; ++r) {
  row = [];
  for (let c = 0; c < WIDTH; ++c) {
    row.push(null);
  }
  boardArray.push(row);
}
// CREATE THE LETTERS
const LETTER_FREQUENCIES = {
    A: 9,
    B: 2,
    C: 2,
    D: 4,
    E: 12,
    F: 2,
    G: 3,
    H: 2,
    I: 9,
    J: 1,
    K: 1,
    L: 4,
    M: 2,
    N: 6,
    O: 8,
    P: 2,
    Q: 1,
    R: 6,
    S: 4,
    T: 6,
    U: 4,
    V: 2,
    W: 2,
    X: 1,
    Y: 2,
    Z: 1,
}

// Function that creates a "bag" of letters. Takes parameter letter frequency (how many As, Bs etc.)
function createBag(frequencies) {
    const bag = [];
    for (const [letter, frequency] of Object.entries(frequencies)) {
        for (let i = 0; i < frequency; i++) {
            bag.push(letter)
        }
    }
    return bag;
}

let letters = createBag(LETTER_FREQUENCIES);

// Randomly selects an amount of letters from the bag, removes them from bag. 
function getLetters(amount) {
    for (let i = 0; i < amount; i++) {
        letterindex = Math.floor(Math.random() * letters.length);
        let letter = letters[letterindex];
        letters.splice(letterindex, 1);
        return letter;
    }
}

// CREATE THE PIECES
const PIECEAREA = document.createElement('div');
PIECEAREA.classList.add('piecearea')
for (let i = 0; i < 7; ++i) {
    const pieceAreaInd = document.createElement('div');
    pieceAreaInd.classList.add('pieceareaInd');
    pieceAreaInd.addEventListener("drop", dropHandler);
    pieceAreaInd.addEventListener("dragover", dragoverHandler);
    PIECEAREA.appendChild(pieceAreaInd);
}

PIECEAREA.style.gridTemplateColumns = `repeat(7,1fr)`;
// document.body.appendChild(PIECEAREA);
MAIN_ELEMENTS.appendChild(PIECEAREA);

// https://www.reddit.com/r/learnjavascript/comments/vo30qx/how_can_i_iterate_over_nested_divs_and_set/ loosely inspired by

let pieceDivs = document.querySelectorAll('.piecearea .pieceareaInd');

let index = 0;
pieceDivs.forEach((pieceareaInd) => {
  const content = document.createElement('div');
  content.append(document.createTextNode(getLetters(1)))
  content.classList.add('piece');
  content.setAttribute("draggable", "true");
  content.addEventListener("dragstart", dragstartHandler);
  content.id = "piece-" + index;
  pieceareaInd.appendChild(content);
  index++;
});

// MAKE PIECES DRAGGABLE (https://www.w3schools.com/html/html5_draganddrop.asp)
function dragstartHandler(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

function dragoverHandler(ev) {
  ev.preventDefault();
}

function dropHandler(ev) {
  ev.preventDefault();
  const data = ev.dataTransfer.getData("text"); //gets id of piece
  const piece = document.getElementById(data);

  let index = -1;
  let row, col;

  let targetContainer = ev.target;
  if (targetContainer.classList.contains('piece')) {
    targetContainer = targetContainer.parentElement;
  }

  if (targetContainer.classList.contains('field') && targetContainer.querySelector('.piece')) {
    console.log("Invalid move: Cannot place a piece on top of another piece.");
    return;
  }

  targetContainer.appendChild(piece);
  const letter = piece.textContent;
  if (targetContainer.classList.contains('field')) {
    const fields = Array.from(document.querySelectorAll('.board .field'));
    index = fields.indexOf(targetContainer);
  }


  if (index !== -1) {
    row = Math.floor(index / WIDTH);
    col = index % WIDTH;
  }

  boardArray[row][col] = letter;

  console.log(`Piece ${letter} placed at (${row}, ${col})`);
  console.log(boardArray); // View the updated array state
}

// Adding "playing" a word
// Check if word is positioned validly, play word, check if word valid, give feedback

// Create "play"-button
const PLAYBUTTON = document.createElement('button');
PLAYBUTTON.innerText = "PLAY";
// document.body.appendChild(PLAYBUTTON);
PLAYBUTTON.classList.add('playbutton');
MAIN_ELEMENTS.appendChild(PLAYBUTTON);


//function to play a word

const WORDSPLAYED_WRAPPER = document.createElement('div');
WORDSPLAYED_WRAPPER.classList.add('wordsplayed-wrapper');
document.body.appendChild(WORDSPLAYED_WRAPPER);

const WORDSPLAYED_TITLE = document.createElement('h1');
WORDSPLAYED_TITLE.innerText = "Words played: ";
WORDSPLAYED_TITLE.classList.add('wordsplayed_title');

WORDSPLAYED_WRAPPER.appendChild(WORDSPLAYED_TITLE);

const WORDSPLAYED = document.createElement('table');
WORDSPLAYED.classList.add('wordsplayed');
WORDSPLAYED_WRAPPER.appendChild(WORDSPLAYED);
