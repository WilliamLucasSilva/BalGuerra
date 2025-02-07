export class Card {
    constructor(id, type, [x, y]) {
        this.id = id;
        this.type = type;
        this.position = {
            start: [ x, y ],
            last: [ x, y ],
            actual: [ x, y],
        };

        this.flip = false
        this.size = [60, 96]
        this.win = false
    }
    
    draw(ctx) {
        if(this.win){return}

    //variables
        let [width, height] = this.size
        
        let borderRadius = 10;
        let [ x, y ] = this.position.actual;

    //draw card
        ctx.fillStyle = 'white';
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 1;
        
        ctx.beginPath();
        ctx.roundRect(x, y, width, height, borderRadius);
        ctx.fill();
        ctx.stroke();

    //flip logic

        if(this.flip){

            ctx.fillStyle = 'black';
            ctx.font = '16px Arial';
            ctx.textAlign = 'right';
            ctx.textBaseline = 'top';
            ctx.fillText(this.id, x + width - 6, y + 6);
        }else{

            ctx.fillStyle = 'blue';
            
            ctx.beginPath();
            ctx.roundRect(x + 3, y + 3, width - 6, height - 6, borderRadius);
            ctx.fill(); // Preenche o retângulo interno azul
        }
    }
}
