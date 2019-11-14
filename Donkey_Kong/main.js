const positionMario = { x: 4, y: 0};
const positionPrincess = { x: 0, y: 9};
const positionDonkey = { x: 0, y: 8};

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

function randomComponents(){
    //Escadas aleatorias
    for(let i = 1; i < 5; i++){
        let qtd = parseInt( 1 + Math.random()*2 );
        for(let j = 0; j < qtd; j++){
            let column = parseInt( Math.random()*10 );
            positionLadder[positionLadder.length] = {x: i,y: column};            
        }
    }
}

function generateField(){
    //Desenha Mario
    let box = document.getElementById(`${positionMario.x} ${positionMario.y}`);
    let img = document.createElement('img');
    img.setAttribute('src', 'mario.png');
    img.setAttribute('class', 'imgBox');
    box.append(img);
    //Desenha Peach
    box = document.getElementById(`${positionPrincess.x} ${positionPrincess.y}`);
    img = document.createElement('img');
    img.setAttribute('src', 'peach.png');
    img.setAttribute('class', 'imgBox');
    box.append(img);
    //Desenha Donkey
    box = document.getElementById(`${positionDonkey.x} ${positionDonkey.y}`);
    img = document.createElement('img');
    img.setAttribute('src', 'donkey_kong.png');
    img.setAttribute('class', 'imgBox');
    box.append(img);
    //Componentes aleatorios
    randomComponents();
    //Desenha escada
    for(let i = 0; i < positionLadder.length; i++){
        box = document.getElementById(`${positionLadder[i].x} ${positionLadder[i].y}`);
        img = document.createElement('img');
        img.setAttribute('src', 'ladder.png');
        img.setAttribute('class', 'imgBox');
        box.append(img);
    }    

    // let row = parseInt( Math.random()*5 );
    // let column = parseInt( Math.random()*10 );
}

drawScreen();
generateField();