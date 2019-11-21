export default class Random {

    constructor( positionMario, positionPrincess, positionDonkey){
        this.positionMario = positionMario;
        this.positionPrincess = positionPrincess;
        this.positionDonkey = positionDonkey;
        this.positionLadder = [];
        this.positionBarrel = [];
        this.positionWall = [];
        this.positionHammer;
    }

    invalidPosition(x, y) {
        if ((x == this.positionMario.x && y == this.positionMario.y) ||
            (x == this.positionPrincess.x && y == this.positionPrincess.y) ||
            (x == this.positionDonkey.x && y == this.positionDonkey.y) ||
            (x == this.positionPrincess.x - 1 && y == this.positionPrincess.y) ||
            this.positionWall.find(item => JSON.stringify(item) === JSON.stringify({ x: x, y: y })) != undefined ||
            this.positionLadder.find(item => JSON.stringify(item) === JSON.stringify({ x: x, y: y })) != undefined ||
            this.positionBarrel.find(item => JSON.stringify(item) === JSON.stringify({ x: x, y: y })) != undefined) {
            return true;
        }
        return false;
    }

    randomComponents() {
        //Escadas aleatorias
        for (let i = 0; i < 4; i++) {
            let qtd = parseInt(1 + Math.random() * 2);
            for (let j = 0; j < qtd; j++) {
                let column = parseInt(Math.random() * 10);
                if (this.invalidPosition(i, column)) {
                    j--;
                    continue;
                }
                this.positionLadder[this.positionLadder.length] = { x: i, y: column };
            }
        }

        //Barril aleatorias
        for (let i = 0; i < 5; i++) {
            let row = parseInt(Math.random() * 5);
            let column = parseInt(Math.random() * 10);

            if (this.invalidPosition(row, column)) {
                i--;
                continue;
            }
            this.positionBarrel[this.positionBarrel.length] = { x: row, y: column };
        }

        //Parede aleatorias
        for (let i = 0; i < 2; i++) {
            let row = parseInt(Math.random() * 5);
            let column = parseInt(Math.random() * 10);

            if (this.invalidPosition(row, column)) {
                i--;
                continue;
            }
            this.positionWall[this.positionWall.length] = { x: row, y: column };
        }

        //Martelo aleatorio    
        for (let i = 0; i < 1; i++) {
            let row = parseInt(Math.random() * 5);
            let column = parseInt(Math.random() * 10);
            if (this.invalidPosition(row, column)) {
                i--;
                continue;
            }
            this.positionHammer = { x: row, y: column };
        }

        return {
            positionWall: this.positionWall,
            positionLadder: this.positionLadder,
            positionBarrel: this.positionBarrel,
            positionHammer: this.positionHammer
        }
    }
}