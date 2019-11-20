export default class Move {

    constructor({ x, y }) {
        this.srcMario = 'mario';
        Move.positionAnimate = { x: x, y: y };
    }

    setSrcMario() {
        this.srcMario = 'marioHammer';
    }

    static setPositionAnimate(positionAnimate) {
        Move.positionAnimate = positionAnimate;
    }

    right() {
        return new Promise((resolve, reject) => {
            let animate = document.getElementsByClassName('animate')[0];
            animate.children[0].setAttribute('src', `img/${this.srcMario}Right.gif`);
            let max = Move.positionAnimate.x + 90;
            let id = setInterval(frame, 5);
            function frame() {
                if (Move.positionAnimate.x == max) {
                    clearInterval(id);
                    resolve('Ok');
                } else {
                    animate.style.marginLeft = Move.positionAnimate.x + "px";
                    Move.positionAnimate.x++;
                }
            }
        });
    }

    left() {
        return new Promise((resolve, reject) => {
            let animate = document.getElementsByClassName('animate')[0];
            animate.children[0].setAttribute('src', `img/${this.srcMario}Left.gif`);
            let max = Move.positionAnimate.x - 90;
            let id = setInterval(frame, 5);
            function frame() {
                if (Move.positionAnimate.x == max) {
                    clearInterval(id);
                    resolve('Ok');
                } else {
                    animate.style.marginLeft = Move.positionAnimate.x + "px";
                    Move.positionAnimate.x--;
                }
            }
        });
    }

    down() {
        return new Promise((resolve, reject) => {
            let animate = document.getElementsByClassName('animate')[0];
            let max = Move.positionAnimate.y + 96;
            let id = setInterval(frame, 5);
            function frame() {
                if (Move.positionAnimate.y == max) {
                    clearInterval(id);
                    resolve('Ok');
                } else {
                    animate.style.marginTop = Move.positionAnimate.y + "px";
                    Move.positionAnimate.y++;
                }
            }
        });
    }

    up() {
        return new Promise((resolve, reject) => {
            let animate = document.getElementsByClassName('animate')[0];
            let max = Move.positionAnimate.y - 96;
            let id = setInterval(frame, 5);
            function frame() {
                if (Move.positionAnimate.y == max) {
                    clearInterval(id);
                    resolve('Ok');
                } else {
                    animate.style.marginTop = Move.positionAnimate.y + "px";
                    Move.positionAnimate.y--;
                }
            }
        });
    }

    jumpRight() {
        return new Promise((resolve, reject) => {
            document.getElementById('jump').play();
            let animate = document.getElementsByClassName('animate')[0];
            animate.children[0].setAttribute('src', `img/${this.srcMario}Right.gif`);
            let max = Move.positionAnimate.x + 180;
            let aux = 0;
            let id = setInterval(frame, 5);
            function frame() {
                if (Move.positionAnimate.x == max) {
                    clearInterval(id);
                    resolve('Ok');
                } else {
                    animate.style.marginLeft = Move.positionAnimate.x + "px";
                    animate.style.marginTop = Move.positionAnimate.y + "px";
                    Move.positionAnimate.x++;
                    aux++;
                    if (aux <= 90) {
                        Move.positionAnimate.y--;
                    }
                    else {
                        Move.positionAnimate.y++;
                    }
                }
            }
        });
    }

    jumpLeft() {
        return new Promise((resolve, reject) => {
            document.getElementById('jump').play();
            let animate = document.getElementsByClassName('animate')[0];
            animate.children[0].setAttribute('src', `img/${this.srcMario}Left.gif`);
            let max = Move.positionAnimate.x - 180;
            let aux = 0;
            let id = setInterval(frame, 5);
            function frame() {
                if (Move.positionAnimate.x == max) {
                    clearInterval(id);
                    resolve('Ok');
                } else {
                    animate.style.marginLeft = Move.positionAnimate.x + "px";
                    animate.style.marginTop = Move.positionAnimate.y + "px";
                    Move.positionAnimate.x--;
                    aux++;
                    if (aux <= 90) {
                        Move.positionAnimate.y--;
                    }
                    else {
                        Move.positionAnimate.y++;
                    }
                }
            }
        });
    }
}