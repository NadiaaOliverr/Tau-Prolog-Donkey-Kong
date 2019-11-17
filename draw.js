function drawScreen() {
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

function drawMario() {
    let box = document.getElementById(`${positionMario.x} ${positionMario.y}`);
    let img = document.createElement('img');
    img.setAttribute('src', 'img/mario.png');
    img.setAttribute('class', 'imgBox');
    box.append(img);
}

function drawPrincess() {
    box = document.getElementById(`${positionPrincess.x} ${positionPrincess.y}`);
    img = document.createElement('img');
    img.setAttribute('src', 'img/peach.png');
    img.setAttribute('class', 'imgBox');
    box.append(img);
}

function drawDonkey() {
    box = document.getElementById(`${positionDonkey.x} ${positionDonkey.y}`);
    img = document.createElement('img');
    img.setAttribute('src', 'img/donkey_kong.png');
    img.setAttribute('class', 'imgBox');
    box.append(img);
}

function drawLadder() {
    for (let i = 0; i < positionLadder.length; i++) {
        box = document.getElementById(`${positionLadder[i].x} ${positionLadder[i].y}`);
        img = document.createElement('img');
        img.setAttribute('src', 'img/ladder.png');
        img.setAttribute('class', 'ladder');
        box.append(img);
    }
}

function drawHammer() {
    box = document.getElementById(`${positionHammer.x} ${positionHammer.y}`);
    img = document.createElement('img');
    img.setAttribute('src', 'img/hammer.png');
    img.setAttribute('class', 'imgBox');
    box.append(img);
}

function drawBarrel() {
    for (let i = 0; i < positionBarrel.length; i++) {
        box = document.getElementById(`${positionBarrel[i].x} ${positionBarrel[i].y}`);
        img = document.createElement('img');
        img.setAttribute('src', 'img/barrel.png');
        img.setAttribute('class', 'imgBox');
        box.append(img);
    }
}
