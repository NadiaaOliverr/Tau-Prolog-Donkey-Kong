import Draw from './draw'

const positionPrincess = { x: 4, y: 9 };
const positionDonkey = { x: 4, y: 8 };

let positionMario = { x: 0, y: 0 };
let positionBarrel = [];
let positionLadder = [];
let positionHammer;
let path;

function invalidPosition(x, y) {
    if ((x == positionMario.x && y == positionMario.y) ||
        (x == positionPrincess.x && y == positionPrincess.y) ||
        (x == positionDonkey.x && y == positionDonkey.y) ||
        (x == positionPrincess.x - 1 && y == positionPrincess.y) ||
        positionLadder.find(item => JSON.stringify(item) === JSON.stringify({ x: x, y: y })) != undefined ||
        positionBarrel.find(item => JSON.stringify(item) === JSON.stringify({ x: x, y: y })) != undefined) 
    {
        return true;
    }
    return false;
}

function randomComponents() {
    //Escadas aleatorias
    for (let i = 0; i < 4; i++) {
        let qtd = parseInt(1 + Math.random() * 2);
        for (let j = 0; j < qtd; j++) {
            let column = parseInt(Math.random() * 10);
            if (invalidPosition(i, column)) {
                j--;
                continue;
            }
            positionLadder[positionLadder.length] = { x: i, y: column };
        }
    }

    //Barril aleatorias
    for (let i = 0; i < 4; i++) {
        let row = parseInt(Math.random() * 5);
        let column = parseInt(Math.random() * 10);

        if (invalidPosition(row, column)) {
            i--;
            continue;
        }
        positionBarrel[positionBarrel.length] = { x: row, y: column };
    }

    //Martelo aleatorio    
    for (let i = 0; i < 1; i++) {
        let row = parseInt(Math.random() * 5);
        let column = parseInt(Math.random() * 10);
        if (invalidPosition(row, column)) {
            i--;
            continue;
        }
        positionHammer = { x: row, y: column };
    }
}

function generateMap() {
    Draw.drawScreen();
    //Desenha Mario
    Draw.drawMario(positionMario);
    //Desenha Peach
    Draw.drawPrincess(positionPrincess);
    //Desenha Donkey
    Draw.drawDonkey(positionDonkey);
    //Componentes aleatorios
    randomComponents();
    //Desenha martelo
    Draw.drawHammer(positionHammer);
    //Desenha escada
    Draw.drawLadder(positionLadder);
    //Desenha barril
    Draw.drawBarrel(positionBarrel);
    teste();
}

function convertLadder() {
    return JSON.stringify(
        positionLadder.map(function(item) {
            return [item.x, item.y];
        })
    );
}

function run() {
    if (path.length == 0) {
        return;
    }
    
    let oldMario = document.getElementById(`${positionMario.x} ${positionMario.y}`);
    oldMario.innerHTML = '';
    positionMario.x = path[0][0];
    positionMario.y = path[0][1];
    console.log(path.shift(), positionMario);    
    let newMario = document.getElementById(`${positionMario.x} ${positionMario.y}`);
    let img = document.createElement('img');
    img.setAttribute('src', 'img/mario.gif');
    img.setAttribute('class', 'imgBox');
    newMario.append(img);
    setTimeout(run, 500);
}

function generatePath() {
    var session = pl.create();
    session.consult("prolog.pl");

    session.query(`main([0,0], ${convertLadder()}, [${positionHammer.x},${positionHammer.y}],[4,9], Solucao).`);

    var callback = function(response) {
        let str = response.toString().replace('Solucao/', '"path":');
        path = (JSON.parse(str)).path;
    }
    session.answer(callback);
    path.reverse();
    console.log(path);
    run();
}

function teste(){
    let edge = document.getElementById('edge');
    let animate = document.createElement('div');
    let img = document.createElement('img');
    img.setAttribute('src','img/marioRunner.gif');
    img.setAttribute('class','imgBox');
    animate.setAttribute('class','animate');
    animate.append(img);
    edge.append(animate);
}

generateMap();
document.getElementById('generateMap').onclick = () => location.reload();
document.getElementById('generatePath').onclick = generatePath;