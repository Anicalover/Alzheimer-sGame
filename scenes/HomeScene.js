import GameScene from "./GameScene.js";

export default class HomeScene extends Phaser.Scene{
    constructor(){
       super('welcome'); 
    }

    questsList
    questData;

    preload(){

        this.load.scenePlugin({key: 'QuestsPlugin', url: 'plugins/quest_plugin.js'})
    }

    create(){
        this.questData = this.cache.json.get('quests')

        this.questsList = {
            quest1: {quest: this.questData.Quests[0].text, completion: false},
            quest2: {quest: this.questData.Quests[1].text, completion: false},
            quest3: {quest: this.questData.Quests[2].text, completion: false},
            quest4: {quest: this.questData.Quests[3].text, completion: false},
            quest5: {quest: this.questData.Quests[4].text, completion: false},
            quest6: {quest: this.questData.Quests[5].text, completion: false, part: 1}, 
        }
        //console.log(this.questsList)
        //Add an animation called "playLoop" for the play button.
        let playBtnAnim = this.anims.create({
            key:'playLoop',
            frames: this.anims.generateFrameNumbers('playbtn'),
            frameRate: 20,
            repeat: -1,
            repeatDelay: 5000
        })

        let arrowAnim = this.anims.create({
            key: "arrowMove",
            frames: this.anims.generateFrameNumbers('arrow'),
            frameRate: 20,
            repeat: -1
        })

        //Add the background to the scene
        this.add.image(500,300, 'newTv')

        //Add the play Button the the scene, scaling it to make it smaller 
        //and adding the play loop for the button to animate.
        let playButton = this.add.sprite(370, 270, 'playbtn').setScale(0.7).play('playLoop')
        let arrow = this.add.sprite(490, 260, 'arrow').setScale(0.7)

        //Set the play button to interactive for the player to be able to interact with the button.
        //Adding an even listener 'pointerdown', when the player presses the button
        //It will launch the function called "ChangeScene"
        playButton.setInteractive().on('pointerdown', () => this.ChangeScene())

        playButton.on('pointerover', function(){
            //console.log("painting xD")
            arrow.play('arrowMove')
            arrow.setTintFill(0xffffff, 0xffffff, 0xffffff, 0xffffff)
            playButton.setTintFill(0xffffff, 0xffffff, 0xffffff, 0xffffff)
        })
        playButton.on('pointerout', function(){
            //console.log("de-painting")
            arrow.anims.stop()
            arrow.clearTint()
            playButton.clearTint()
        })

    }

    ChangeScene(){
        //console.log("I was clicked")
        this.scene.start('gameScene', {quests: this.questsList})
    }
}