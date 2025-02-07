import { ctx } from "../main.js";
import { decks } from "./engine.js";

//draw functions
    export function drawString([x, y], string, [ horizontal, vertical ], color = 'black' ) {
        ctx.fillStyle = color;
        ctx.font = '16px Arial';
        ctx.textAlign = horizontal;
        ctx.textBaseline = vertical;
        ctx.fillText(string, x , y);
    }

    function drawCheckbox([x, y], size, checked){
        ctx.fillStyle = checked ? 'red' : 'white';
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 1;
        
        ctx.beginPath();
        ctx.roundRect(x, y, size, size, 0);
        ctx.fill();
        ctx.stroke();
    }

//checkbox

    class Checkbox{
        constructor([x , y], name){
            this.checked = true
            this.position = [x, y]
            this.name = name
        }

        draw(){
            drawString(this.position, this.name, [ 'right', 'top' ]);
            drawCheckbox([this.position[0] + 10, this.position[1]], 10, this.checked);
        }
    }

//variables

    let infosVisible = [
        new Checkbox([canvas.width - 30, 25], 'DECK'),
        new Checkbox([canvas.width - 30, 50], 'MOUSE'),
    ];

export function logs(canvas){

    infosVisible.forEach( (checkbox) => { checkbox.draw() } )
    
    if(infosVisible[0].checked){

        let infoDecks = [ 'start', 'inGame', 'clicked', 'winned' ]

        let x = canvas.width - 550;
        infoDecks.forEach( (name, i) => {

            let y = (i * 35) + 20
            drawString([x, y], `${name}: ${decks[0].toString(name)}`, ['left', 'top'])
        })
    }
}

