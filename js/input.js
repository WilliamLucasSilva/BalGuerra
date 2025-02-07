import { decks } from "./engine.js";
import { isRectangleInside } from "./useful.js";
import { canvas } from "../main.js";
import { ddTries } from "./engine.js";

var lastPress = null;

const KEY_LEFT  = 37, KEY_A = 65;
const KEY_UP    = 38, KEY_W = 87;
const KEY_RIGHT = 39, KEY_D = 68;
const KEY_DOWN  = 40, KEY_S = 83;
const KEY_PAUSE = 19, KEY_Q = 81;
const KEY_SPACE = 32, KEY_E = 69;
const KEY_SCAPE = 27;
const KEY_LSHIFT = 16;

const KEY_0 = 48;
const KEY_1 = 49;
const KEY_2 = 50;
const KEY_3 = 51;
const KEY_4 = 52;
const KEY_5 = 53;
const KEY_6 = 54;
const KEY_7 = 55;
const KEY_8 = 56;
const KEY_9 = 57;


export var Input = {
    mouse: {
        x: 0,
        y: 0,
        pressed: false
    },

    keyboard: {
        keyup: {},
        keypressed: {},
        keydown: {}
    },

    IsKeyPressed: function(keycode) {
        return this.keyboard.keypressed[keycode];
    },

    IsKeyDown: function(keycode) {
        return this.keyboard.keydown[keycode];
    },

    IsKeyUp: function(keycode) {
        return this.keyboard.keyup[keycode];
    },

    IsMousePressed: function() {
        return this.mouse.pressed;
    },

    Update: function() {
        for(var property in this.keyboard.keyup) {
            if(this.keyboard.keyup.hasOwnProperty(property)) {
                this.keyboard.keyup[property] = false;
            }
        }
    },

    PostUpdate: function() {
        for (var property in this.keyboard.keydown) {
            if (this.keyboard.keydown.hasOwnProperty(property)) {
                this.keyboard.keydown[property] = false;
            }
        }
    }
};

function SetupKeyboardEvents() {
    AddEvent(document, "keydown", function(e) {
        Input.keyboard.keydown[e.keyCode] = true;
        Input.keyboard.keypressed[e.keyCode] = true;
    } );

    AddEvent(document, "keyup", function(e) {
        Input.keyboard.keyup[e.keyCode] = true;
        Input.keyboard.keypressed[e.keyCode] = false;
    } );

    function AddEvent(element, eventName, func) {
        if (element.addEventListener)
            element.addEventListener(eventName, func, false);
        else if (element.attachEvent)
            element.attachEvent(eventName, func);
    }
}

function SetupMouseEvents() {

    canvas.addEventListener("mousedown", MouseDown, false);
    canvas.addEventListener("mousemove", MouseMove, false);
    canvas.addEventListener("mouseup", MouseUp, false);
}

function MouseDown(event) {
    var rect = canvas.getBoundingClientRect();
    var clickX = event.clientX - rect.left;
    var clickY = event.clientY - rect.top;

    Input.mouse.pressed = true;

}

function MouseUp(event) {

    var rect = canvas.getBoundingClientRect();
    let [clickX, clickY] = [event.clientX - rect.left, event.clientY - rect.top]

    Input.mouse.pressed = false;

//clicked card logic

    decks[0].deck.inGame.forEach((card) => {

        if(isRectangleInside(
            [clickX, clickY], [0 , 0],
            card.position.actual, card.size
        )){

            if(decks[0].deck.clicked.includes(card)){

                decks[0].deck.clicked.splice(0, 1)
                card.flip = false

                setTimeout(ddTries(), 10)
            }else{
                decks[0].deck.clicked.push(card)
            }
        }
    })
}

function MouseMove(event) {
    var rect = canvas.getBoundingClientRect();
    Input.mouse.x = event.clientX - rect.left;
    Input.mouse.y = event.clientY - rect.top;
}

export const setups = [SetupKeyboardEvents, SetupMouseEvents];