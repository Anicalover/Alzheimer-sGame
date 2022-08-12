import Welcome from "./HomeScene.js";
import GameScene from "./GameScene.js";

export default class GameOver extends Phaser.Scene{
    constructor(){
        super('gameOver')
    }

    create(){
        let gameOverTxt = this.make.text({
            x: 500,
            y: 270,
            text: "Thank you for playing the game.",
            origin:{x:0.5, y:0.5},
            style:{
                fontSize: '45px'
            }
        })

        let startOverTxt = this.make.text({
            x: 500,
            y: 320,
            text: "Made by Maia Siverio",
            origin: {x: 0.5, y: 0.5}

        })

        this.cameras.main.fadeIn(500)

        let timeLoop = this.time.addEvent({
            delay: 5000,
            callback: this.StartOver,
            callbackScope: this,
            repeat: 0
        })

        // startOverTxt.setInteractive().on('pointerdown', () => this.ChangeScene(0))
        // quitTxt.setInteractive().on('pointerdown', () => this.ChangeScene(1))

    }

    StartOver(){
        this.scene.start('welcome')
    }

    ChangeScene(menuNum){
        if(menuNum == 0){
            this.scene.start('gameScene')
        }
        else if(menuNum == 1){
            this.scene.start('welcome')
        }
    }
}