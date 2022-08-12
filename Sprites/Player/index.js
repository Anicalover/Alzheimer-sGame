import Base from "../Base/index.js"

export default class Asther extends Phaser.Physics.Arcade.Sprite{
    constructor(config){
        var velocities = {
            walk: 5,
            gravity: 20,
            turning: 2
        }

        super({
            scene: config.scene,
            key: config.key,
            name: "Asther",
            x: config.x,
            y: config.y,
            velocities: velocities,
            animationConfig: AnimaitonConfig
        })

        this.scene = config.scene;
        this.velocities = velocities;
        this.direction = "left"

        const { LEFT, RIGHT } = Phaser.Input.Keyboard.KeyCodes;

        this.keys = this.scene.input.keyboard.addKeys({
            A: LEFT,
            D: RIGHT
        })

        this.scene.events.on("talkingStarted", this.talk, this)
        this.scene.events.on("talkingStopped", this.stopTalk, this)
    }
}