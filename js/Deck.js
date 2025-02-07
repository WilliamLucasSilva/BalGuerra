import { canvas } from "../main.js";
import { Card } from "./Card.js";

const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

export class Deck {
    constructor([width, height]) {
        let [space, deck] = this._getDeck([width, height]);
        this.space = space;
        this.deck = deck;

        deck.inGame = this.shuffle(deck.start); // Usa método estático
    }

    _getDeck([width, height]) {
        let size = width * height;
        if (size % 2 !== 0) {
            throw new Error("O tamanho do deck precisa ser par.");
        }

        function getSpace() {
            let temp = [], [x, y] = [512 - ((width * 70) / 2), 238 - ((height * 106) / 2)];

            for (let i = 0; i < size; i++, x += 70) {
                if (i % width === 0 && i !== 0) [x, y] = [512 - ((width * 70) / 2), y + 106];
                temp.push([x, y]);
            }

            return temp;
        }

        function getIds() {
            let temp = [];
            for (let i = 0; i < size / 2; i++) {
                temp.push(`${alphabet[i]}1`);
                temp.push(`${alphabet[i]}2`);
            }
            return temp;
        }

        let [space, ids] = [getSpace(), getIds()];
        let deck = {
            start: [],
            inGame: [],
            clicked: [],
            winned: []
        };

        for (let i = 0; i < size; i++) {
            deck.start.push( new Card(ids[i], 'normal', space[i]));
        }

        return [space, deck];
    }

    shuffle(deck) {
        for (let i = deck.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [deck[i], deck[j]] = [deck[j], deck[i]];
        }

        for(let i = 0; i < this.space.length; i++){
            deck[i].position.actual = this.space[i]
        }

        return deck;
    }

    draw(ctx){ this.deck.inGame.forEach( (c) => { c.draw(ctx) } ) }

    toString(name){
        return `[ ${this.deck[name].map(c => c.id).join(', ')} ]`;
    }
}
