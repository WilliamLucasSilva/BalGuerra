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

        this.back = new Image()
        this.back.src = '../assets/cardBack.png'

    }
    
    draw(ctx) {
        if(this.win){return}

    //variables
        let [width, height] = this.size
        
        let borderRadius = 10;
        let [ x, y ] = this.position.actual;

    //draw card
        ctx.fillStyle = 'black';
        ctx.strokeStyle = '#A23E8C';
        ctx.lineWidth = 1.8;
        
        ctx.beginPath();
        ctx.roundRect(x, y, width, height, borderRadius);
        ctx.fill();
        ctx.stroke();

    //flip logic

        if(this.flip){

            ctx.fillStyle = '#A23E8C';
            ctx.font = '16px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'top';
            ctx.fillText(this.id, x + (width / 2), y + (height / 2) - 6);
        }else{

            ctx.drawImage(this.back, x + 3, y + 3, 54, 90)
        }
    }
}
