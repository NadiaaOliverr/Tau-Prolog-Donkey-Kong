export default class Move {

    constructor(positionAnimate) {
        this.srcMario = 'mario';
        Move.positionAnimate =  positionAnimate;
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

    direction(step1, step2) {
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
}