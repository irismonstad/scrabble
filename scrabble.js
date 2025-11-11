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