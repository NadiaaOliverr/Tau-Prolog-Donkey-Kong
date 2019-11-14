const positionMario = [ 4,0];
const positionPrincess = [ 0, 9];
const positionDonkey = [ 0, 8];

let positionBarrel = [];
let positionLadder = [];
let positionHammer = [];

function drawScreen(){
    for(let i = 0; i < 5; i++){
        let row = document.createElement('tr');
        for(let j = 0; j < 10; j++){
            let column = document.createElement('td');
            column.setAttribute('id', `${i} ${j}`);
            column.setAttribute('class', 'tabuleiro');
            row.append(column);
        }    
        document.querySelector('#table').append(row);
    }
}

function generateField(){
    let row = parseInt( Math.random()*5 );
    let column = parseInt( Math.random()*10 );
    console.log(row, column);
    let box = document.getElementById(`${row} ${column}`);
    let img = document.createElement('img');
    img.setAttribute('src', 'mario.png');
    img.setAttribute('class', 'imgBox');
    box.style.width = 0;
    box.style.height = 0;
    box.setAttribute('class', '');
    box.append(img);
    box.style.border = '4px solid #fff';
}

drawScreen();
generateField();