export default class Draw {

    constructor(randoms) {
        Draw.positionPrincess = { x: 4, y: 9 };
        Draw.positionDonkey = { x: 4, y: 8 };
        Draw.positionMario = { x: 0, y: 0 };
        Draw.positionAnimate = {}
        Draw.setPositionAnimate();

        //Componentes aleatorios        
        Draw.positionWall   = randoms.positionWall;
        Draw.positionBarrel = randoms.positionBarrel;
        Draw.positionLadder = randoms.positionLadder;
        Draw.positionHammer = randoms.positionHammer;
    }

    static setPositionAnimate(){
        Draw.positionAnimate = {
            x:  Draw.positionMario.y * 90,
            y: (384 - 96 * Draw.positionMario.x) + 15
        };
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

    static drawMario() {
        let box = document.getElementById(`${Draw.positionMario.x} ${Draw.positionMario.y}`);
        if (box.children.length == 0) {
            let img = document.createElement('img');
            img.setAttribute('src', 'img/mario.png');
            img.setAttribute('class', 'imgBox');
            box.append(img);
        }
    }

    static drawPrincess() {
        let box = document.getElementById(`${Draw.positionPrincess.x} ${Draw.positionPrincess.y}`);
        if (box.children.length == 0) {
            let img = document.createElement('img');
            img.setAttribute('src', 'img/peach.gif');
            img.setAttribute('class', 'imgBox');
            box.append(img);
        }
    }

    static drawDonkey() {
        let box = document.getElementById(`${Draw.positionDonkey.x} ${Draw.positionDonkey.y}`);
        if (box.children.length == 0) {
            let img = document.createElement('img');
            img.setAttribute('src', 'img/donkey.gif');
            img.setAttribute('class', 'imgBox');
            box.append(img);
        }
    }

    static drawLadder() {
        for (let i = 0; i < Draw.positionLadder.length; i++) {
            let box = document.getElementById(`${Draw.positionLadder[i].x} ${Draw.positionLadder[i].y}`);
            if (box.children.length == 0) {
                let img = document.createElement('img');
                img.setAttribute('src', 'img/ladder.png');
                img.setAttribute('class', 'ladder');
                box.append(img);
            }
        }
    }

    static drawHammer() {
        let box = document.getElementById(`${Draw.positionHammer.x} ${Draw.positionHammer.y}`);
        if (box.children.length == 0) {
            let img = document.createElement('img');
            img.setAttribute('src', 'img/hammer.png');
            img.setAttribute('class', 'imgBox');
            box.append(img);
        }
    }

    static drawBarrel() {
        for (let i = 0; i < Draw.positionBarrel.length; i++) {
            let box = document.getElementById(`${Draw.positionBarrel[i].x} ${Draw.positionBarrel[i].y}`);
            if (box.children.length == 0) {
                let img = document.createElement('img');
                img.setAttribute('src', 'img/barrel.png');
                img.setAttribute('class', 'imgBox');
                box.append(img);
            }
        }
    }

    static drawWall() {
        for (let i = 0; i < Draw.positionWall.length; i++) {
            let box = document.getElementById(`${Draw.positionWall[i].x} ${Draw.positionWall[i].y}`);
            if (box.children.length == 0) {
                let img = document.createElement('img');
                img.setAttribute('src', 'img/wall.png');
                img.setAttribute('class', 'wall');
                box.append(img);
            }
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
        animate.style.marginLeft = Draw.positionAnimate.x + "px";
        animate.style.marginTop  = Draw.positionAnimate.y + "px";
    }

    static resetMap() {
        Draw.setPositionAnimate();
        Draw.deleteDonkey();
        Draw.deletePeach();
        Draw.drawDonkey();
        Draw.drawPrincess();
        //Desenha Mário
        Draw.drawMario();
        //Desenha martelo
        Draw.drawHammer();
    }


    static deleteDonkey() {
        let old = document.getElementById(`${Draw.positionDonkey.x} ${Draw.positionDonkey.y}`);
        if (old != undefined) {
            old.innerHTML = '';
        }
    }

    static deleteMario() {
        let old = document.getElementById(`${Draw.positionMario.x} ${Draw.positionMario.y}`);
        if (old != undefined) {
            old.innerHTML = '';
        }
    }

    static deletePeach() {
        let old = document.getElementById(`${Draw.positionPrincess.x} ${Draw.positionPrincess.y}`);
        if (old != undefined) {
            old.innerHTML = '';
        }
    }

    static deleteHammer() {
        let old = document.getElementById(`${Draw.positionHammer.x} ${Draw.positionHammer.y}`);
        if (old != undefined) {
            old.innerHTML = '';
        }
    }

    static deleteAnimate() {
        let old = document.getElementsByClassName('animate')[0];
        if (old != undefined) {
            old.remove();
        }
    }

    static victory() {
        document.getElementById('win').play();
        let oldPricess = document.getElementById(`${Draw.positionPrincess.x} ${Draw.positionPrincess.y}`);
        oldPricess.children[0].setAttribute('src', 'img/win.png');
        let oldDonkey = document.getElementById(`${Draw.positionDonkey.x} ${Draw.positionDonkey.y}`);
        oldDonkey.children[0].setAttribute('src', 'img/donkey_sleep.png');
    }

    static convertLadder() {
        return JSON.stringify(
            Draw.positionLadder.map(function (item) {
                return [item.x, item.y];
            })
        );
    }

    static convertBarrel() {
        return JSON.stringify(
            Draw.positionBarrel.map(function (item) {
                return [item.x, item.y];
            })
        );
    }

    static convertWall() {
        return JSON.stringify(
            Draw.positionWall.map(function (item) {
                return [item.x, item.y];
            })
        );
    }

    static isBarrel([x, y]) {
        if (Draw.positionBarrel.find(element => (element.x == x && element.y == y)) == undefined) {
            return false;
        }

        return true;
    }

    static identifyContent(id) {
        let content = document.getElementById(id).children[0];
        if (content == undefined) {
            return 'e';
        }
        switch (content.getAttribute('src')) {
            case 'img/hammer.png':
                return 'h';
            case 'img/peach.gif':
                return 'p';
            case 'img/barrel.png':
                return 'b';
            case 'img/wall.png':
                return 'w';
            case 'img/ladder.png':
                return 'l';
            case 'img/mario.png':
                return 'm';
            case 'img/donkey_kong.webp':
                return 'd';
            case 'img/win.png':
                return 'p';
            case 'img/donkey_sleep.png':
                return 'd';
        }
    }

    static swapContent() {
        if (!document.getElementById('generatePath').disabled) {
            let oldContent = Draw.identifyContent(this.id);
            let newContent = prompt(
                'h  - Martelo\n' +
                'p  - Princesa\n' +
                'b  - Barril\n' +
                'w  - Parede\n' +
                'm  - Mario\n' +
                'd  - Donkey Kong\n' +
                'e  - Vazio\n' +
                'l  - Escada\n'
                , oldContent
            );

            switch (newContent) {
                case 'h':
                    if (newContent != oldContent) {
                        Draw.deleteHammer();
                        Draw.removeOld(oldContent, this.id);
                        document.getElementById(this.id).innerHTML = '';
                        Draw.positionHammer = { x: parseInt(this.id[0]), y: parseInt(this.id[2]) };
                        Draw.drawHammer();
                    }
                    break;
                case 'p':
                    if (newContent != oldContent) {
                        Draw.deletePeach();
                        Draw.removeOld(oldContent, this.id);
                        document.getElementById(this.id).innerHTML = '';
                        Draw.positionPrincess = { x: parseInt(this.id[0]), y: parseInt(this.id[2]) };
                        Draw.drawPrincess();
                    }
                    break;
                case 'b':
                    if (newContent != oldContent) {
                        Draw.removeOld(oldContent, this.id);
                        document.getElementById(this.id).innerHTML = '';
                        Draw.positionBarrel.push({ x: parseInt(this.id[0]), y: parseInt(this.id[2]) });
                        Draw.drawBarrel();
                    }
                    break;
                case 'w':
                    if (newContent != oldContent) {
                        Draw.removeOld(oldContent, this.id);
                        document.getElementById(this.id).innerHTML = '';
                        Draw.positionWall.push({ x: parseInt(this.id[0]), y: parseInt(this.id[2]) });
                        Draw.drawWall();
                    }
                    break;
                case 'm':
                    if (newContent != oldContent) {
                        Draw.deleteMario();
                        Draw.removeOld(oldContent, this.id);
                        document.getElementById(this.id).innerHTML = '';
                        Draw.positionMario = { x: parseInt(this.id[0]), y: parseInt(this.id[2]) };
                        Draw.drawMario();
                        Draw.setPositionAnimate();
                    }
                    break;
                case 'd':
                    if (newContent != oldContent) {
                        Draw.deleteDonkey();
                        Draw.removeOld(oldContent, this.id);
                        document.getElementById(this.id).innerHTML = '';
                        Draw.positionDonkey = { x: parseInt(this.id[0]), y: parseInt(this.id[2]) };
                        Draw.drawDonkey();
                    }
                    break;
                case 'l':
                    if (newContent != oldContent) {
                        Draw.removeOld(oldContent, this.id);
                        document.getElementById(this.id).innerHTML = '';
                        Draw.positionLadder.push({ x: parseInt(this.id[0]), y: parseInt(this.id[2]) });
                        Draw.drawLadder();
                    }
                    break;
                case 'e':
                    if (newContent != oldContent) {
                        Draw.removeOld(oldContent, this.id);
                        document.getElementById(this.id).innerHTML = '';
                    }
                    break;
                default:
                    alert("Essa opção não existe");
                    break;
            }
            console.log(newContent);
        }
    }

    static removeOld(old, id) {
        id = { x: parseInt(id[0]), y: parseInt(id[2]) };
        switch (old) {
            case 'b':
                Draw.positionBarrel = Draw.positionBarrel.filter(item => !(item.x == id.x && item.y == id.y));
                break;
            case 'w':
                Draw.positionWall = Draw.positionWall.filter(item => !(item.x == id.x && item.y == id.y));
                break;
            case 'l':
                Draw.positionLadder = Draw.positionLadder.filter(item => !(item.x == id.x && item.y == id.y));
                break;
            case 'h':
                Draw.positionHammer = { x: -1, y: -1 };
                break;
            case 'p':
                Draw.positionPrincess = { x: -1, y: -1 };
                break;
            case 'm':
                Draw.positionMario = { x: -10, y: -10 };
                break;
            case 'd':
                Draw.positionDonkey = { x: -1, y: -1 };
                break;
            default:
                break;
        }
    }
}