import { setups } from "./js/input.js";
import { decks } from "./js/engine.js";
import { engineLoop } from "./js/engine.js";
import { logs } from "./js/logs.js";


let hideInfos;

export let canvas = document.getElementById('canvas');
export let ctx = canvas.getContext('2d');

const [SetupKeyboardEvents, SetupMouseEvents] = setups;


window.onload = BodyLoaded;

function BodyLoaded() {

    start()

    loop()
}


//------------------------------------------------------------------------------


function start() {

    SetupKeyboardEvents();
    SetupMouseEvents();

    hideInfos = document.getElementById('hideInfos');
}


function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    engineLoop();
    decks[0].draw(ctx)

    if( hideInfos.checked ){ logs(canvas, ctx) };
    
    window.requestAnimationFrame(loop);
}