import { Deck } from './Deck.js'
import { drawString } from './logs.js'

export var decks = [ new Deck([6, 2]) ]
var tries = 10

export function ddTries() { tries -= 1 }

export function engineLoop(){

    const deck = decks[0].deck
    const clicked = deck.clicked

    function endGame(name){
        window.alert(name)

        tries = 10
        
        deck.winned = []
        deck.inGame = decks[0].shuffle(deck.start)
    }

    drawString([240, 240], 'TRIES', ['right', 'center'], 'white')
    drawString([220, 260], String(tries), ['right', 'center'], 'white')

    if(tries == 0){
        setTimeout(endGame('FAIL'), 200)
    }



    if(deck.clicked.length){

        clicked.forEach((card) => {
            card.flip = true
        })

        if(deck.clicked.length >= 2){

            setTimeout(() => {
                
                clicked.forEach((card) => {
                    card.flip = false
                })

                if (deck.clicked.length >= 2){

                    deck.clicked = []

                    if(clicked[0].id.charAt(0) == clicked[1].id.charAt(0)){

                        deck.winned.push(clicked[0], clicked[1])
                        deck.inGame = deck.inGame.filter( c => c !== clicked[0] && c !== clicked[1] )

                        
                        if(deck.winned.length == deck.start.length) { setTimeout(endGame('WINNED'), 200) }
                        tries += 1
                    }
                    
                    setTimeout(ddTries(), 10)
                }
            }, 100 * 3)
        }
    }
}

