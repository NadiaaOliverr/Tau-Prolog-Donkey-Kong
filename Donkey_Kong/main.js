const positionMario = [ 4,0];
const positionPrincess = [ 0, 9];
const positionDonkey = [ 0, 8];

let positionBarrel = [];
let positionLadder = [];
let positionHammer = [];

function drawScreen(){
    for(let i = 0; i < 5; i++){
        let row = document.createElement('tr');
        row.setAttribute('id', i);
        for(let j = 0; j < 10; j++){
            let column = document.createElement('td');
            column.setAttribute('id', j);                
            column.setAttribute('class', 'tabuleiro');
            row.append(column);
        }    
        document.querySelector('#table').append(row);
    }
}

function generateField(){

}

drawScreen();