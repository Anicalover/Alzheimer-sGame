import Welcome from "./HomeScene.js";
import GameScene from "./GameScene.js";
import GameOver from "./GameOverScene.js";
import TownScene from "./TownScene.js";

export default class MenuScene extends Phaser.Scene{
    constructor(){
       
        super('menuScene')
    }

    create(){

        //Add a camera to set a background color to the scene
        let camera = this.cameras.add(0, 0, 1000, 600);
        
        //Setting the background color to the camera
        camera.setBackgroundColor('#4488AA')

        //this.stage.backgroundColor = "#4488AA";

        let homeTxt = this.make.text({
            x: 500,
            y: 250,
            text: "Home",
            origin:{x: 0.5, y:0.5}
        })

        let resumeTxt = this.make.text({
            x: 500,
            y: 300,
            text: "Resume",
            origin: { x: 0.5, y: 0.5}
        })

        let quitTxt = this.make.text({
            x: 500,
            y: 350,
            text: "Quit",
            origin:{x: 0.5, y:0.5}
        })

        //this.stage.backgroundColor = "#4488AA";

        homeTxt.setInteractive().on('pointerdown', () => this.ChangeScene(0))
        resumeTxt.setInteractive().on('pointerdown', () => this.ChangeScene(1))
        quitTxt.setInteractive().on('pointerdown', () => this.ChangeScene(2))
    }

    ChangeScene(menuNum){
        if(menuNum == 0){
            this.scene.start('welcome')
            this.scene.stop('gameScene')
        }
        else if(menuNum == 1){
            this.scene.resume('gameScene')
            this.scene.stop()
        }
        else if(menuNum == 2){
            this.scene.start('gameOver')
            this.scene.stop('gameScene')
        }
    }
}