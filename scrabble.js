// CREATE BOARD FOR THE GAME (https://github.com/hausnes/webutvikling/blob/main/eksempel/js/piksel-eksperiment/piksels.js)
const BOARD = document.createElement('div');
BOARD.classList.add('board')

let width = 15;
let height = 15;

for (let i = 0; i < width*height; ++i) {
    const field = document.createElement('div');
    field.classList.add('field');
    field.addEventListener("drop", dropHandler);
    field.addEventListener("dragover", dragoverHandler);
    BOARD.appendChild(field);
}

BOARD.style.gridTemplateColumns = `repeat(${width}, 1fr)`;
BOARD.style.gridTemplateRows = `repeat(${height}, 1fr)`;

document.body.appendChild(BOARD);

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
document.body.appendChild(PIECEAREA);


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
  const data = ev.dataTransfer.getData("text");
  ev.target.appendChild(document.getElementById(data));
}