//Import All scenes to the main canvas and include them

import Welcome from "./scenes/HomeScene.js";
import GameScene from "./scenes/GameScene.js";
import MenuScene from "./scenes/MenuScene.js";
import GameOver from "./scenes/GameOverScene.js";
import TownScene from "./scenes/TownScene.js";
import BakeryScene from "./scenes/BakeryScene.js";
import BakeryKitchen from "./scenes/BakerKitchen.js";
import Boot from "./scenes/Boot.js";
import Player from "./scenes/Player.js"

//import {Plugin as NineSlicePlugin} from "phaser3-nineslices";
//Configuration of the canvas 
var config = {
    type: Phaser.AUTO,
    width: 1000,
    height: 600,
    pageAlignHorizontally: true,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 400 },
            debug: false
        }
    },
    scene: [
        Boot,
        Welcome,
        GameScene,
        TownScene,
        BakeryScene,
        BakeryKitchen,
        MenuScene,
        GameOver
    ]
};


//Create the canvas
var game = new Phaser.Game(config);

