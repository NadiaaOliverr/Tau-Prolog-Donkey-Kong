import Draw from './draw';
import Random from './random';

let positionPrincess = { x: 4, y: 9 };
let positionDonkey = { x: 4, y: 8 };
let positionMario = { x: 0, y: 0 };
let positionAnimate = { x: 0, y: 399 };
let srcMario = 'mario';
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

function convertLadder() {
    return JSON.stringify(
        positionLadder.map(function (item) {
            return [item.x, item.y];
        })
    );
}

function isBarrel([x, y]) {
    if (positionBarrel.find(element => (element.x == x && element.y == y)) == undefined) {
        return false;
    }

    return true;
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

async function run() {
    if (path.length == 0) {
        return;
    }
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
                await moveUp();
                break;
            case 'down':
                await moveDown();
                break;
            case 'left':
                if (isBarrel(path[i + 1])) {
                    await jumpLeft();
                    i++;                    
                }else{
                    await moveLeft();
                }                
                break;
            case 'right':
                if (isBarrel(path[i + 1])) {
                    await jumpRight();
                    i++;
                }else{
                    await moveRiht();
                }                
                break;
            case 'hammer':
                srcMario = 'marioHammer';
                let oldHammer = document.getElementById(`${positionHammer.x} ${positionHammer.y}`);
                oldHammer.innerHTML = '';
                break;
            default:

                break;
        }
    }

    let oldPricess = document.getElementById(`${positionPrincess.x} ${positionPrincess.y}`);
    oldPricess.children[0].setAttribute('src', 'img/win.png');
    let oldDonkey = document.getElementById(`${positionDonkey.x} ${positionDonkey.y}`);
    oldDonkey.children[0].setAttribute('src', 'img/donkey_sleep.png');
    animate.remove();
    positionAnimate.x = 0;
    positionAnimate.y = 399;
}

function generatePath() {
    document.getElementById('start').play();
    var session = pl.create();
    session.consult("prolog.pl");

    session.query(`main([0,0], ${convertLadder()}, [${positionHammer.x},${positionHammer.y}],[4,9], Solucao).`);

    var callback = function (response) {
        let str = response.toString().replace('Solucao/', '"path":');
        path = (JSON.parse(str)).path;
    }
    session.answer(callback);
    path.reverse();
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

const moveRiht = () => new Promise((resolve, reject) => {
    let animate = document.getElementsByClassName('animate')[0];
    animate.children[0].setAttribute('src', `img/${srcMario}Right.gif`);
    let max = positionAnimate.x + 90;
    let id = setInterval(frame, 5);
    function frame() {
        if (positionAnimate.x == max) {
            clearInterval(id);
            resolve('Ok');
        } else {
            animate.style.marginLeft = positionAnimate.x + "px";
            positionAnimate.x++;
        }
    }
});

const moveLeft = () => new Promise((resolve, reject) => {
    let animate = document.getElementsByClassName('animate')[0];
    animate.children[0].setAttribute('src', `img/${srcMario}Left.gif`);
    let max = positionAnimate.x - 90;
    let id = setInterval(frame, 5);
    function frame() {
        if (positionAnimate.x == max) {
            clearInterval(id);
            resolve('Ok');
        } else {
            animate.style.marginLeft = positionAnimate.x + "px";
            positionAnimate.x--;
        }
    }
});

const moveDown = () => new Promise((resolve, reject) => {
    let animate = document.getElementsByClassName('animate')[0];
    let max = positionAnimate.y + 96;
    let id = setInterval(frame, 5);
    function frame() {
        if (positionAnimate.y == max) {
            clearInterval(id);
            resolve('Ok');
        } else {
            animate.style.marginTop = positionAnimate.y + "px";
            positionAnimate.y++;
        }
    }
});

const moveUp = () => new Promise((resolve, reject) => {
    let animate = document.getElementsByClassName('animate')[0];
    let max = positionAnimate.y - 96;
    let id = setInterval(frame, 5);
    function frame() {
        if (positionAnimate.y == max) {
            clearInterval(id);
            resolve('Ok');
        } else {
            animate.style.marginTop = positionAnimate.y + "px";
            positionAnimate.y--;
        }
    }
});

const jumpRight = () => new Promise((resolve, reject) => {
    document.getElementById('jump').play();
    let animate = document.getElementsByClassName('animate')[0];
    animate.children[0].setAttribute('src', `img/${srcMario}Right.gif`);
    let max = positionAnimate.x + 180;
    let aux = 0;
    let id = setInterval(frame, 5);
    function frame() {
        if (positionAnimate.x == max) {
            clearInterval(id);
            resolve('Ok');
        } else {
            animate.style.marginLeft = positionAnimate.x + "px";
            animate.style.marginTop = positionAnimate.y + "px";
            positionAnimate.x++;
            aux++;
            if (aux <= 90) {
                positionAnimate.y--;
            }
            else{
                positionAnimate.y++;
            }
        }
    }
});

const jumpLeft = () => new Promise((resolve, reject) => {
    document.getElementById('jump').play();
    let animate = document.getElementsByClassName('animate')[0];
    animate.children[0].setAttribute('src', `img/${srcMario}Left.gif`);
    let max = positionAnimate.x - 180;
    let aux = 0;
    let id = setInterval(frame, 5);
    function frame() {
        if (positionAnimate.x == max) {
            clearInterval(id);
            resolve('Ok');
        } else {
            animate.style.marginLeft = positionAnimate.x + "px";
            animate.style.marginTop = positionAnimate.y + "px";
            positionAnimate.x--;
            aux++;
            if (aux <= 90) {
                positionAnimate.y--;
            }
            else{
                positionAnimate.y++;
            }
        }
    }
});

document.getElementById('generateMap').onclick = () => location.reload();
document.getElementById('generatePath').onclick = generatePath;
generateMap();