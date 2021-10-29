const gridContainer= document.querySelector('.grid');

for(let i=0;i<200;i++){
    let div = document.createElement('div');
    gridContainer.appendChild(div);
}

for(let i=0;i<10;i++){
    let div=document.createElement('div');
    div.classList.add('taken');
    gridContainer.appendChild(div);
}

let squares = Array.from(document.querySelectorAll('.grid div'));
const width=10;

// The tetromino
const lTetromino=[
    [1,width+1,width*2+1,2],
    [width,width+1,width+2,width*2+2],
    [1,width+1,width*2+1,width*2],
    [width,width*2,width*2+1,width*2+2]
]

const tTetromino=[
    [1,width,width+1,width+2],
    [1,width+1,width+2,width*2+1],
    [width,width+1,width+2,width*2+1],
    [1,width,width+1,width*2+1]
]

const oTetromino=[
    [0,1,width,width+1],
    [0,1,width,width+1],
    [0,1,width,width+1],
    [0,1,width,width+1]
]

const iTetromino=[
    [1,width+1,width*2+1,width*3+1],
    [width,width+1,width+2,width+3],
    [1,width+1,width*2+1,width*3+1],
    [width,width+1,width+2,width+3],

]


const tetrominos=[lTetromino,tTetromino,oTetromino,iTetromino];

let random =Math.floor(Math.random()*tetrominos.length);
let currentRotation=0
let currentPos = 4;
let current = tetrominos[random][currentRotation];

const draw=()=>{
    current.forEach(index=>{
        squares[currentPos+index].classList.add('tetromino')
    })
}
const undraw=()=>{
    current.forEach(index=>{
        squares[currentPos+index].classList.remove('tetromino')
    })
}



const moveDown=()=>{
    undraw();
    currentPos +=width;
    draw();
    freeze();
}
timerId = setInterval(moveDown,1000);

const freeze=()=>{
    if(current.some(index=> squares[currentPos+index+width].classList.contains('taken'))){
        current.forEach(index => squares[currentPos+index].classList.add('taken'));
        random = Math.floor(Math.random()*tetrominos.length);
        current = tetrominos[random][currentRotation];
        currentPos=4;
        draw();

    }
}

draw();
