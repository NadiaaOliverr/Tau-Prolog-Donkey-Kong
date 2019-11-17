const positionMario = { x: 0, y: 0 };
const positionPrincess = { x: 4, y: 5 };
const positionDonkey = { x: 4, y: 4 };

let positionBarrel = [];
let positionLadder = [];
let positionHammer;

let path;

function drawScreen() {
    for (let i = 4; i >= 0; i--) {
        let row = document.createElement('tr');
        for (let j = 0; j < 6; j++) {
            let column = document.createElement('td');
            column.setAttribute('id', `${i} ${j}`);
            column.setAttribute('class', 'tabuleiro');
            row.append(column);
        }
        document.querySelector('#table').append(row);
    }
}

function randomComponents() {
    //Escadas aleatorias
    for (let i = 0; i < 4; i++) {
        let qtd = parseInt(1 + Math.random() * 2);
        for (let j = 0; j < qtd; j++) {
            let column = parseInt(Math.random() * 6);
            if ((i == 0 && column == 0) || positionLadder.find(item => JSON.stringify(item) === JSON.stringify({ x: i, y: column })) != undefined) {
                j--;
                continue;
            }
            positionLadder[positionLadder.length] = { x: i, y: column };
        }
    }
    //Barril aleatorias
    for (let i = 0; i < 3; i++) {
        let row = parseInt(Math.random() * 5);
        let column = parseInt(Math.random() * 6);

        if ((row == 0 && column == 0) ||
            (row == 4 && column == 5) ||
            (row == 4 && column == 4) ||
            positionLadder.find(item => JSON.stringify(item) === JSON.stringify({ x: row, y: column })) != undefined ||
            positionBarrel.find(item => JSON.stringify(item) === JSON.stringify({ x: row, y: column })) != undefined
        ) {
            i--;
            continue;
        }
        positionBarrel[positionBarrel.length] = { x: row, y: column };
    }
    //Martelo aleatorio    
    for (let i = 0; i < 1; i++) {
        let row = parseInt(Math.random() * 5);
        let column = parseInt(Math.random() * 6);
        if ((row == 0 && column == 0) ||
            (row == 4 && column == 5) ||
            (row == 4 && column == 4) ||
            positionLadder.find(item => JSON.stringify(item) === JSON.stringify({ x: row, y: column })) != undefined ||
            positionBarrel.find(item => JSON.stringify(item) === JSON.stringify({ x: row, y: column })) != undefined
        ) {
            i--;
            continue;
        }
        positionHammer = { x: row, y: column };
    }
}

function clear() {
    positionBarrel = [];
    positionLadder = [];

    document.getElementById('table').remove();
    let table = document.createElement('tr');
    table.setAttribute('id', 'table');
    document.getElementById('container').insertBefore(table, document.getElementById('footer'));
}

function generateMap() {
    clear();
    drawScreen();
    //Desenha Mario
    let box = document.getElementById(`${positionMario.x} ${positionMario.y}`);
    let img = document.createElement('img');
    img.setAttribute('src', 'img/mario.png');
    img.setAttribute('class', 'imgBox');
    box.append(img);
    //Desenha Peach
    box = document.getElementById(`${positionPrincess.x} ${positionPrincess.y}`);
    img = document.createElement('img');
    img.setAttribute('src', 'img/peach.png');
    img.setAttribute('class', 'imgBox');
    box.append(img);
    //Desenha Donkey
    box = document.getElementById(`${positionDonkey.x} ${positionDonkey.y}`);
    img = document.createElement('img');
    img.setAttribute('src', 'img/donkey_kong.png');
    img.setAttribute('class', 'imgBox');
    box.append(img);
    //Componentes aleatorios
    randomComponents();
    //Desenha martelo
    box = document.getElementById(`${positionHammer.x} ${positionHammer.y}`);
    img = document.createElement('img');
    img.setAttribute('src', 'img/hammer.png');
    img.setAttribute('class', 'imgBox');
    box.append(img);
    //Desenha escada
    for (let i = 0; i < positionLadder.length; i++) {
        box = document.getElementById(`${positionLadder[i].x} ${positionLadder[i].y}`);
        img = document.createElement('img');
        img.setAttribute('src', 'img/ladder.png');
        img.setAttribute('class', 'ladder');
        box.append(img);
    }
    //Desenha barril
    for (let i = 0; i < positionBarrel.length; i++) {
        box = document.getElementById(`${positionBarrel[i].x} ${positionBarrel[i].y}`);
        img = document.createElement('img');
        img.setAttribute('src', 'img/barrel.png');
        img.setAttribute('class', 'imgBox');
        box.append(img);
    }
}

function convertLadder() {
    return JSON.stringify(
        positionLadder.map(function (item) {
            return [item.x, item.y];
        })
    );
}

function run() {
    let oldMario = document.getElementById(`${positionMario.x} ${positionMario.y}`);
    oldMario.innerHTML = '';
    positionMario.x = path.path.x;
    positionMario.y = path.path.y;
    let newMario = document.getElementById(`${positionMario.x} ${positionMario.y}`);
    let img = document.createElement('img');
    img.setAttribute('src', 'img/mario.png');
    img.setAttribute('class', 'imgBox');
    newMario.append(img);
}

function generatePath() {
    var session = pl.create();
    session.consult("prolog.pl");

    session.query(`main([0,0], ${convertLadder()}, [4,5], Solucao).`);

    var callback = function (response) {
        let str = response.toString().replace('Solucao/', '"path":');
        path = (JSON.parse(str)).path;
    }
    session.answer(callback);
    path.path.reverse();
    console.log(path);
}

generateMap();
document.getElementById('generateMap').onclick = generateMap;
document.getElementById('generatePath').onclick = generatePath;
