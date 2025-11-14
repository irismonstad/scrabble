const BOARD = document.createElement('div');
BOARD.classList.add('board')

let width = 15;
let height = 15;

for (let i = 0; i < width*height; ++i) {
    const field = document.createElement('div');
    field.classList.add('field');
    BOARD.appendChild(field);
}

BOARD.style.gridTemplateColumns = `repeat(${width}, 1fr)`;
BOARD.style.gridTemplateRows = `repeat(${height}, 1fr)`;

document.body.appendChild(BOARD);

// basic structure for creating board from https://github.com/hausnes/webutvikling/blob/main/eksempel/js/piksel-eksperiment/piksels.js

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
        // console.log(letter);
        return letter;
    }
}

// getLetters(7);
// console.log(letters);

const PIECES = document.createElement('div');
PIECES.classList.add('pieces')
for (let i = 0; i < 7; ++i) {
    const piece = document.createElement('div');
    piece.classList.add('piece');
    PIECES.appendChild(piece);
}

PIECES.style.gridTemplateColumns = `repeat(7,1fr)`
document.body.appendChild(PIECES)


// https://www.reddit.com/r/learnjavascript/comments/vo30qx/how_can_i_iterate_over_nested_divs_and_set/

let pieceDivs = document.querySelectorAll('.pieces .piece')

pieceDivs.forEach((piece) => {
  const content = document.createElement('div')
  content.append(document.createTextNode(getLetters(1)))
  piece.appendChild(content)
});