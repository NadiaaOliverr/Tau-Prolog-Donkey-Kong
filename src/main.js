import Draw from './draw';
import Random from './random';
import Move from './move';

function generateMap() {
    Draw.drawScreen();
    //Desenha Mario
    Draw.drawMario();
    //Desenha Peach
    Draw.drawPrincess();
    //Desenha Donkey
    Draw.drawDonkey();
    //Desenha martelo
    Draw.drawHammer();
    //Desenha escada
    Draw.drawLadder();
    //Desenha barril
    Draw.drawBarrel();
    //Desenha Parede
    Draw.drawWall();
}

function convertLadder() {
    return JSON.stringify(
        Draw.positionLadder.map(function (item) {
            return [item.x, item.y];
        })
    );
}

function convertBarrel() {
    return JSON.stringify(
        Draw.positionBarrel.map(function (item) {
            return [item.x, item.y];
        })
    );
}

function isBarrel([x, y]) {
    if (Draw.positionBarrel.find(element => (element.x == x && element.y == y)) == undefined) {
        return false;
    }

    return true;
}

async function run() {
    document.getElementById('generatePath').disabled = true;
    if (path.length == 0) {
        return;
    }

    let move = new Move();
    Draw.drawAnimate();
    Draw.deleteMario();

    for (let i = 0; i < (path.length - 1); i++) {
        switch (move.direction(path[i], path[i + 1])) {
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
                let oldHammer = document.getElementById(`${Draw.positionHammer.x} ${Draw.positionHammer.y}`);
                oldHammer.innerHTML = '';
                break;
            default:
                break;
        }
    }

    Draw.victory();
    Draw.deleteAnimate();
    document.getElementById('generatePath').disabled = false;
    document.getElementById('generatePath').onclick = replay;
}

function replay(){
    Draw.resetMap();
    generatePath();
}

function generatePath() {

    var session = pl.create();
    session.consult("prolog.pl");

    session.query(
        `main([0,0], 
        ${convertLadder()}, 
        ${convertBarrel()},
        [${Draw.positionHammer.x},${Draw.positionHammer.y}],
        [4,9], 
        Solucao).`
    );

    var callback = function (response) {
        console.log(response);
        let str = response.toString().replace('Solucao/', '"path":');
        path = (JSON.parse(str)).path;
    }
    session.answer(callback);    

    if(path){
        path.reverse();
        document.getElementById('start').play();
        run();    
    }else{
        document.getElementById('loser').play();
        setTimeout(()=>alert('Não existe solução'), 500);
    }
}

let path;
new Draw(new Random().randomComponents());

document.getElementById('generateMap').onclick = () => location.reload();
document.getElementById('generatePath').onclick = generatePath;
generateMap();