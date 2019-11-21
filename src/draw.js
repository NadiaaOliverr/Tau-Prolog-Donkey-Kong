export default class Draw {

    constructor(randoms) {
        Draw.positionPrincess = { x: 4, y: 9 };
        Draw.positionDonkey = { x: 4, y: 8 };
        Draw.positionMario = { x: 0, y: 0 };

        //Componentes aleatorios        
        Draw.positionWall = randoms.positionWall;
        Draw.positionBarrel = randoms.positionBarrel;
        Draw.positionLadder = randoms.positionLadder;
        Draw.positionHammer = randoms.positionHammer;
    }

    static drawScreen() {
        for (let i = 4; i >= 0; i--) {
            let row = document.createElement('tr');
            for (let j = 0; j < 10; j++) {
                let column = document.createElement('td');
                column.setAttribute('id', `${i} ${j}`);
                column.setAttribute('class', 'board');
                column.onclick = Draw.swapContent;
                row.append(column);
            }
            document.querySelector('#table').append(row);
        }
    }

    static swapContent() {
        console.log(this.id, Draw.positionBarrel);
    }

    static drawMario() {
        let box = document.getElementById(`${Draw.positionMario.x} ${Draw.positionMario.y}`);
        let img = document.createElement('img');
        img.setAttribute('src', 'img/mario.png');
        img.setAttribute('class', 'imgBox');
        box.append(img);
    }

    static drawPrincess() {
        let box = document.getElementById(`${Draw.positionPrincess.x} ${Draw.positionPrincess.y}`);
        let img = document.createElement('img');
        img.setAttribute('src', 'img/peach.gif');
        img.setAttribute('class', 'imgBox');
        box.append(img);
    }

    static drawDonkey() {
        let box = document.getElementById(`${Draw.positionDonkey.x} ${Draw.positionDonkey.y}`);
        let img = document.createElement('img');
        img.setAttribute('src', 'img/donkey_kong.webp');
        img.setAttribute('class', 'imgBox');
        box.append(img);
    }

    static drawLadder() {
        for (let i = 0; i < Draw.positionLadder.length; i++) {
            let box = document.getElementById(`${Draw.positionLadder[i].x} ${Draw.positionLadder[i].y}`);
            let img = document.createElement('img');
            img.setAttribute('src', 'img/ladder.png');
            img.setAttribute('class', 'ladder');
            box.append(img);
        }
    }

    static drawHammer() {
        let box = document.getElementById(`${Draw.positionHammer.x} ${Draw.positionHammer.y}`);
        let img = document.createElement('img');
        img.setAttribute('src', 'img/hammer.png');
        img.setAttribute('class', 'imgBox');
        box.append(img);
    }

    static drawBarrel() {
        for (let i = 0; i < Draw.positionBarrel.length; i++) {
            let box = document.getElementById(`${Draw.positionBarrel[i].x} ${Draw.positionBarrel[i].y}`);
            let img = document.createElement('img');
            img.setAttribute('src', 'img/barrel.png');
            img.setAttribute('class', 'imgBox');
            box.append(img);
        }
    }

    static drawWall() {
        for (let i = 0; i < Draw.positionWall.length; i++) {
            let box = document.getElementById(`${Draw.positionWall[i].x} ${Draw.positionWall[i].y}`);
            let img = document.createElement('img');
            img.setAttribute('src', 'img/wall.png');
            img.setAttribute('class', 'wall');
            box.append(img);
        }
    }

    static drawAnimate() {
        let edge = document.getElementById('edge');
        let animate = document.createElement('div');
        let img = document.createElement('img');
        img.setAttribute('src', 'img/marioRight.gif');
        img.setAttribute('class', 'imgBox');
        animate.setAttribute('class', 'animate');
        animate.append(img);
        edge.append(animate);
    }

    static resetMap() {
        let Pricess = document.getElementById(`${Draw.positionPrincess.x} ${Draw.positionPrincess.y}`);
        Pricess.children[0].setAttribute('src', 'img/peach.gif');
        let Donkey = document.getElementById(`${Draw.positionDonkey.x} ${Draw.positionDonkey.y}`);
        Donkey.children[0].setAttribute('src', 'img/donkey_kong.webp');
        //Desenha Mário
        Draw.drawMario();
        //Desenha martelo
        Draw.drawHammer();
    }    

    static deleteMario(){
        document.getElementById(`${Draw.positionMario.x} ${Draw.positionMario.y}`).innerHTML = '';    
    }

    static deleteAnimate(){
        document.getElementsByClassName('animate')[0].remove();
    }

    static victory(){
        document.getElementById('win').play();
        let oldPricess = document.getElementById(`${Draw.positionPrincess.x} ${Draw.positionPrincess.y}`);
        oldPricess.children[0].setAttribute('src', 'img/win.png');
        let oldDonkey = document.getElementById(`${Draw.positionDonkey.x} ${Draw.positionDonkey.y}`);
        oldDonkey.children[0].setAttribute('src', 'img/donkey_sleep.png');    
    }
}