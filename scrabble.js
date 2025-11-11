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

// grunnleggede struktur for å opprette rutenett hentet fra https://github.com/hausnes/webutvikling/blob/main/eksempel/js/piksel-eksperiment/piksels.js

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
const BAG = document.createElement('p');
BAG.innerText = letters;
document.body.appendChild(BAG);