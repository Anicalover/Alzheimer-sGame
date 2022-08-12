import  Animations  from "./animations.js";
import Behaviors from "./behaviors.js"

export default class Base{
    constructor(config){
        this.scene = config.scene
        this.velocities = config.velocities

        this.sprite = this.scene.physics.add
            .sprite(config.x, config.y, config.key)
            .setCollideWorldBounds(true)
            .setGravityY(this.velocities.gravity)
            .setSize(12, 22)
            .setOffset(11, 9)
            .setOrigin(0.5, 1)
            .setDepth(2);

        this.sprite.context = this;

        this.animations = new Animations({
            scene: config.scene,
            name: config.name,
            config: config.animationsConfig,
            texture: config.key
        })

        this.sequence = this.animations.sequence;

        this.direction = "right"

        this.behaviors = new Behaviors({
            scene: this.scene,
            entity: this,
            name: config.name
        })
    }

    freeze(){
        this.sprite.body.moves = false;
    }

    destroy(){
        this.sprite.destroy();
    }
}