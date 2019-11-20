import Draw from './draw';
import Random from './random';
import Move from './move';

let positionPrincess = { x: 4, y: 9 };
let positionDonkey = { x: 4, y: 8 };
let positionMario = { x: 0, y: 0 };
let positionAnimate = { x: 0, y: 399 };
let path;

//Componentes aleatorios        
let {
    positionBarrel,
    positionLadder,
    positionHammer
} = new Random(positionMario, positionPrincess, positionDonkey).randomComponents();

function generateMap() {
    Draw.drawScreen();
    //Desenha Mario
    Draw.drawMario(positionMario);
    //Desenha Peach
    Draw.drawPrincess(positionPrincess);
    //Desenha Donkey
    Draw.drawDonkey(positionDonkey);
    //Desenha martelo
    Draw.drawHammer(positionHammer);
    //Desenha escada
    Draw.drawLadder(positionLadder);
    //Desenha barril
    Draw.drawBarrel(positionBarrel);
}

function backPath() {

    let Pricess = document.getElementById(`${positionPrincess.x} ${positionPrincess.y}`);
    Pricess.children[0].setAttribute('src', 'img/peach.gif');
    let Donkey = document.getElementById(`${positionDonkey.x} ${positionDonkey.y}`);
    Donkey.children[0].setAttribute('src', 'img/donkey_kong.webp');
    //Desenha Mário
    Draw.drawMario(positionMario);
    //Desenha martelo
    Draw.drawHammer(positionHammer);
    //Desabilita Botão
    document.getElementById('generatePath').disabled = true;
    generatePath();
}

function convertLadder() {
    return JSON.stringify(
        positionLadder.map(function (item) {
            return [item.x, item.y];
        })
    );
}

function direction(step1, step2) {
    let x = step2[0] - step1[0];
    let y = step2[1] - step1[1];

    if (x != 0) {
        if (x == 1) {
            return 'up';
        }
        if (x == -1) {
            return 'down';
        }
    }

    if (y != 0) {
        if (y == 1) {
            return 'right';
        }
        if (y == -1) {
            return 'left';
        }
    }

    if (x == 0 && y == 0) {
        return 'hammer';
    }
}

function isBarrel([x, y]) {
    if (positionBarrel.find(element => (element.x == x && element.y == y)) == undefined) {
        return false;
    }

    return true;
}

async function run() {
    document.getElementById('generatePath').disabled = true;
    if (path.length == 0) {
        return;
    }
    let move = new Move(positionAnimate);
    let edge = document.getElementById('edge');
    let animate = document.createElement('div');
    let img = document.createElement('img');
    img.setAttribute('src', 'img/marioRight.gif');
    img.setAttribute('class', 'imgBox');
    animate.setAttribute('class', 'animate');
    animate.append(img);
    edge.append(animate);

    let oldMario = document.getElementById(`${positionMario.x} ${positionMario.y}`);
    oldMario.innerHTML = '';

    for (let i = 0; i < (path.length - 1); i++) {
        switch (direction(path[i], path[i + 1])) {
            case 'up':
                await move.up();
                break;
            case 'down':
                await move.down();
                break;
            case 'left':
                if (isBarrel(path[i + 1])) {
                    await move.jumpLeft();
                    i++;
                } else {
                    await move.left();
                }
                break;
            case 'right':                
                if (isBarrel(path[i + 1])) {
                    await move.jumpRight();
                    i++;
                } else {
                    await move.right();
                }
                break;
            case 'hammer':
                move.setSrcMario();
                let oldHammer = document.getElementById(`${positionHammer.x} ${positionHammer.y}`);
                oldHammer.innerHTML = '';
                break;
            default:
                break;
        }
    }

    document.getElementById('win').play();
    let oldPricess = document.getElementById(`${positionPrincess.x} ${positionPrincess.y}`);
    oldPricess.children[0].setAttribute('src', 'img/win.png');
    let oldDonkey = document.getElementById(`${positionDonkey.x} ${positionDonkey.y}`);
    oldDonkey.children[0].setAttribute('src', 'img/donkey_sleep.png');
    animate.remove();
    document.getElementById('generatePath').disabled = false;
    document.getElementById('generatePath').onclick = backPath;
}

function generatePath() {   

    var session = pl.create();
    session.consult("prolog.pl");

    session.query(`main([0,0], ${convertLadder()}, [${positionHammer.x},${positionHammer.y}],[4,9], Solucao).`);

    var callback = function (response) {
        console.log(response);
        let str = response.toString().replace('Solucao/', '"path":');
        path = (JSON.parse(str)).path;
    }
    session.answer(callback);
    path.reverse();
    document.getElementById('start').play();
    run();

}

async function teste() {
    let edge = document.getElementById('edge');
    let animate = document.createElement('div');
    let img = document.createElement('img');
    img.setAttribute('src', 'img/marioRight.gif');
    img.setAttribute('class', 'imgBox');
    animate.setAttribute('class', 'animate');
    animate.append(img);
    edge.append(animate);

    await jumpRight();
}

document.getElementById('generateMap').onclick = () => location.reload();
document.getElementById('generatePath').onclick = generatePath;
generateMap();