export default class {
    static drawScreen() {
        for (let i = 4; i >= 0; i--) {
            let row = document.createElement('tr');
            for (let j = 0; j < 10; j++) {
                let column = document.createElement('td');
                column.setAttribute('id', `${i} ${j}`);
                column.setAttribute('class', 'tabuleiro');
                row.append(column);
            }
            document.querySelector('#table').append(row);
        }
    }

    static drawMario(positionMario) {
        let box = document.getElementById(`${positionMario.x} ${positionMario.y}`);
        let img = document.createElement('img');
        img.setAttribute('src', 'img/mario.png');
        img.setAttribute('class', 'imgBox');
        box.append(img);
    }

    static drawPrincess(positionPrincess) {
        let box = document.getElementById(`${positionPrincess.x} ${positionPrincess.y}`);
        let img = document.createElement('img');
        img.setAttribute('src', 'img/peach.png');
        img.setAttribute('class', 'imgBox');
        box.append(img);
    }

    static drawDonkey(positionDonkey) {
        let box = document.getElementById(`${positionDonkey.x} ${positionDonkey.y}`);
        let img = document.createElement('img');
        img.setAttribute('src', 'img/donkey_kong.png');
        img.setAttribute('class', 'imgBox');
        box.append(img);
    }

    static drawLadder(positionLadder) {
        for (let i = 0; i < positionLadder.length; i++) {
            let box = document.getElementById(`${positionLadder[i].x} ${positionLadder[i].y}`);
            let img = document.createElement('img');
            img.setAttribute('src', 'img/ladder.png');
            img.setAttribute('class', 'ladder');
            box.append(img);
        }
    }

    static drawHammer(positionHammer) {
        let box = document.getElementById(`${positionHammer.x} ${positionHammer.y}`);
        let img = document.createElement('img');
        img.setAttribute('src', 'img/hammer.png');
        img.setAttribute('class', 'imgBox');
        box.append(img);
    }

    static drawBarrel(positionBarrel) {
        for (let i = 0; i < positionBarrel.length; i++) {
            let box = document.getElementById(`${positionBarrel[i].x} ${positionBarrel[i].y}`);
            let img = document.createElement('img');
            img.setAttribute('src', 'img/barrel.png');
            img.setAttribute('class', 'imgBox');
            box.append(img);
        }
    }
}