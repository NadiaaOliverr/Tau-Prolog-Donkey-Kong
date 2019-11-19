import Draw from './draw';
import Random from './random';

let positionPrincess = { x: 4, y: 9 };
let positionDonkey = { x: 4, y: 8 };
let positionMario = { x: 0, y: 0 };
let path;
let positionAnimate = { x: 0, y: 15 };

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
    teste();
}

function convertLadder() {
    return JSON.stringify(
        positionLadder.map(function (item) {
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
    img.setAttribute('src', 'img/marioRunner.gif');
    img.setAttribute('class', 'imgBox');
    newMario.append(img);
    setTimeout(run, 500);
}

function generatePath() {
    document.querySelector('audio').play();
    var session = pl.create();
    session.consult("prolog.pl");

    session.query(`main([0,0], ${convertLadder()}, [${positionHammer.x},${positionHammer.y}],[4,9], Solucao).`);

    var callback = function (response) {
        let str = response.toString().replace('Solucao/', '"path":');
        path = (JSON.parse(str)).path;
    }
    session.answer(callback);
    path.reverse();
    console.log(path);
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

    let response = await moveRiht();
    console.log(response);
    response = await moveDown();
    console.log(response);
    response = await moveLeft();
    console.log(response);
    response = await moveUp();
    console.log(response);
}

const  moveRiht = () => new Promise( (resolve, reject) => {
    let animate = document.getElementsByClassName('animate')[0];
    animate.children[0].setAttribute('src', 'img/marioRight.gif');
    let max = positionAnimate.x + 90;
    let id = setInterval( frame, 5);
    function frame(){
        if( positionAnimate.x == max){
            clearInterval(id);
            resolve('Ok');
        }else{
            animate.style.marginLeft = positionAnimate.x + "px";
            positionAnimate.x++;            
        }
    }
});

const  moveLeft = () => new Promise( (resolve, reject) => {
    let animate = document.getElementsByClassName('animate')[0];
    animate.children[0].setAttribute('src', 'img/marioLeft.gif');
    let max = positionAnimate.x - 90;
    let id = setInterval( frame, 5);
    function frame(){
        if( positionAnimate.x == max){
            clearInterval(id);
            resolve('Ok');
        }else{
            animate.style.marginLeft = positionAnimate.x + "px";
            positionAnimate.x--;            
        }
    }
});

const  moveDown = () => new Promise( (resolve, reject) => {
    let animate = document.getElementsByClassName('animate')[0];
    let max = positionAnimate.y + 96;
    let id = setInterval( frame, 5);
    function frame(){
        if( positionAnimate.y == max){
            clearInterval(id);
            resolve('Ok');
        }else{
            animate.style.marginTop = positionAnimate.y + "px";
            positionAnimate.y++;            
        }
    }
});

const  moveUp = () => new Promise( (resolve, reject) => {
    let animate = document.getElementsByClassName('animate')[0];
    let max = positionAnimate.y - 90;
    let id = setInterval( frame, 5);
    function frame(){
        if( positionAnimate.y == max){
            clearInterval(id);
            resolve('Ok');
        }else{
            animate.style.marginTop = positionAnimate.y + "px";
            positionAnimate.y--;            
        }
    }
});

// function moveRiht(animate, times = 1){
// }

document.getElementById('generateMap').onclick = () => location.reload();
document.getElementById('generatePath').onclick = generatePath;
generateMap();