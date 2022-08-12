
export default class Boot extends Phaser.Scene{
    constructor() {
        super('Boot')
    }

    //Loading images
    loadSprites(){
        this.load.image('newTv', 'Alzheimer-sGame/Sprites/images/newTv.png')

        this.load.image('doorSelect', '../Sprites/images/doorhighlight.png')

        this.load.image('home', '../Sprites/images/astherHome.png')

        this.load.image('wardrobe', '../Sprites/images/wardrobeHighlight.png')

        this.load.image('bakery', '../Sprites/images/juliesShop.png')

        this.load.image('frontPorch', '../Sprites/images/frontPartPorch.png')

        this.load.image('backPorch', '../Sprites/images/backPartPorch.png')

        this.load.image('BakeryFront', '../Sprites/images/BakeryFront.png')

        this.load.image('BakeryBack', '../Sprites/images/BakeryBack.png')

        this.load.image('BakeryKitchen', '../Sprites/images/BakeryKitchen.png')

        this.load.image('collider', '../Sprites/images/collide.png')

        this.load.image('dialogBox', '../Sprites/images/dialogBox.png')

        this.load.image('townBackground', '../Sprites/images/background.png')

        this.load.image('questBox', '../Sprites/images/questsBox.png')

        this.load.image("town", "../Sprites/images/town.png")

        this.load.image("sadMar", "../Sprites/images/marSad.png")

        this.load.image("happyMar", "../Sprites/images/marNormal.png")

        this.load.image("groupPicture", "../Sprites/images/cuadro.png")

        this.load.image("interactionBox", "../Sprites/images/interactionBox.png")

        this.load.image('bakeryChange', '../Sprites/images/ChangeBakery.png')

        this.load.image('minigameKitchen', "../Sprites/images/minigameKitchen.png")

        this.load.image("dirtyKitchen", "../Sprites/images/kitchenDirty.png")

        this.load.image('kitchen', "../Sprites/images/kitchen.png")

        this.load.image('flour', "../Sprites/images/flour.png")

        this.load.image('butter', "../Sprites/images/butter.png")

        this.load.image('eggs', "../Sprites/images/eggs.png")

        this.load.image('milk', "../Sprites/images/milk.png")

        this.load.image('sugar', "../Sprites/images/sugar.png")

        this.load.image('vanilla', "../Sprites/images/vanilla.png")
        
        this.load.image('cookieSprite', '../Sprites/images/cookieSprite.png')

        this.load.image('cookiePan', '../Sprites/images/cookiesPan.png')

        this.load.json('dialog', 'plugins/dialog.json')

        this.load.json('quests', "plugins/quests.json")

        this.load.scenePlugin({key: 'QuestsPlugin', url: 'plugins/quest_plugin.js'})

        this.load.scenePlugin({key:'DialogModalPlugin', url:'plugins/dialog_plugin.js'});
    }

    //Loading Sprite sheets
    loadSpritesheets(){

        this.load.spritesheet({key: 'selectAnim',
            url: "../Sprites/images/arrowSelect.png",
            frameConfig: {
                frameWidth: 200,
                frameHeight: 200,
                startFrame: 0,
                endFrame: 4
            }
        })

        this.load.spritesheet({ key: "sugarAnim",
            url: "../Sprites/images/sugarAnim.png",
            frameConfig:{
                frameWidth: 100,
                frameHeight: 125,
                startFrame: 0,
                endFrame: 7
            }
        })

        this.load.spritesheet({ key: "flourAnim",
            url: "../Sprites/images/flourAnim.png",
            frameConfig: {
                frameWidth: 100,
                frameHeight: 125,
                startFrame: 0,
                endFrame: 11
            }
        })

        this.load.spritesheet({ key: "butterAnim",
            url: "../Sprites/images/butterAnim.png",
            frameConfig: {
                frameWidth: 100,
                frameHeight: 125,
                startFrame: 0,
                endFrame: 11
            }
        })

        this.load.spritesheet({ key: "eggsAnim",
            url: "../Sprites/images/eggAnim.png",
            frameConfig: {
                frameWidth: 100,
                frameHeight: 125,
                startFrame: 0,
                endFrame: 12
            }
        })

        this.load.spritesheet({
            key: "vanillaAnim",
            url: "../Sprites/images/vanillaAnim.png",
            frameConfig: {
                frameWidth: 100,
                frameHeight: 125,
                startFrame: 0,
                endFrame: 12
            }
        })

        this.load.spritesheet({
            key: "milkAnim",
            url: "../Sprites/images/milkAnim.png",
            frameConfig: {
                frameWidth: 100, 
                frameHeight: 125,
                startFrame: 0,
                endFrame: 8
            }
        })

        this.load.spritesheet({ key: 'astherPWalk',
            url: "../Sprites/images/astherPijamaWalk.png",
            frameConfig: {
                frameWidth: 300,
                frameHeight: 450,
                startFrame: 0,
                endFrame: 5
            }
        })

        this.load.spritesheet({ key: 'asther',
            url: '../sprites/images/asther.png',
            frameConfig:{
                frameWidth: 100,
                frameHeight: 145,
                startFrame: 0,
                endFrame: 7
            }
        })
        
        this.load.spritesheet({key: 'astherJump',
            url: "../Sprites/images/stickJump.png",
            frameConfig:{
                frameWidth: 95,
                frameHeight: 150,
                startFrame: 0,
                endFrame: 14
            }
        })

        this.load.spritesheet({key: 'astherWalk',
            url: "../Sprites/images/AstherWalk.png",
            frameConfig: {
                frameWidth: 300,
                frameHeight: 450,
                startFrame: 0,
                endFrame: 5
            }
        })

        this.load.spritesheet({key: 'astherSprite',
            url: "../Sprites/images/AstherSpritesheet.png",
            frameConfig: {
                frameWidth: 280,
                frameHeight: 450,
                startFrame: 0,
                endFrame:3
            }
        })

        this.load.spritesheet({key:"pls",
            url: "../Sprites/images/porfavor.png",
            frameConfig:{
                frameWidth: 150,
                frameHeight: 250,
                startFrame: 0,
                endFrame: 25
            }
        })

        this.load.spritesheet({key: "julieAvatar",
            url: "../Sprites/images/JulieAvatars.png",
            frameConfig:{
                frameWidth: 266,
                frameHeight: 250,
                startFrame: 0,
                endFrame: 3
            }
        })

        this.load.spritesheet({key: "foxAvatar",
            url: "../Sprites/images/foxAvatars.png",
            frameConfig: {
                frameWidth: 266,
                frameHeight: 250,
                startFrame: 0,
                endFrame: 2
            }
        })

        this.load.spritesheet({key: "startledMar",
            url: "../Sprites/images/startledMar.png",
            frameConfig: {
                frameWidth: 200,
                frameHeight: 255,
                startFrame: 0, 
                endFrame: 12
            }
        })

        this.load.spritesheet({key: "marAvatar",
            url: "../Sprites/images/marAvatar.png",
            frameConfig : {
                frameWidth: 266,
                frameHeight: 250,
                startFrame: 0,
                endFrame: 1
            }
        })

        this.load.spritesheet({ key: "astherAvatar",
            url: "../Sprites/images/avatarSpritesheet.png",
            frameConfig: {
                frameWidth: 266,
                frameHeight: 250,
                startFrame: 0,
                endFrame: 3
            }

        })

        this.load.spritesheet({ key: 'playbtn',
            url: '../sprites/images/playBtnGlitch.png',
            frameConfig:{
                frameWidth:210,
                frameHeight: 120,
                startFrame: 0,
                endFrame: 19
            }
        })

        this.load.spritesheet({ key: 'arrow',
            url: "../Sprites/images/arrowAnim.png",
            frameConfig: {
                frameWidth: 100,
                frameHeigt: 100,
                startFrame: 0,
                endFrame: 7
            }

        })

        // this.load.spritesheet({ key: 'bg', 
        //     url: '../sprites/HomeAnimSprite.png', 
        //     frameConfig: {
        //         frameWidth:1000,
        //         frameHeight: 600,
        //         startFrame: 0,
        //         endFrame: 3
        //     }
        // })

        this.load.spritesheet({ key: 'JulieStand',
            url: '../sprites/images/JulieStanding.png',
            frameConfig: {
                frameWidth: 150,
                frameHeight: 250,
                startFrame: 0,
                endFrame: 3
            }
        })

        this.load.spritesheet({ key: 'JulieLaugh',
            url: '../sprites/images/JulieLaugh.png',
            frameConfig: {
                frameWidth: 150,
                frameHeight: 250,
                startFrame: 0,
                endFrame: 1
            }
        })

        //this.load.spritesheet({ key: 'townBackground',
        // url: '../Sprites/townBackGround.png',
        // frameConfig: {
        //     frameWidth: 1000,
        //     frameHeight: 600,
        //     startFrame: 0,
        //     endFrame: 6
        // }
        // })

        this.load.spritesheet({ key: 'tigerSprite',
            url: '../Sprites/images/tigerSprite.png',
            frameConfig: {
                frameWidth: 150,
                frameHeight: 250,
                startFrame: 0,
                endFrame: 1
            }

        })

        this.load.spritesheet({ key: 'dirt',
            url: '../Sprites/images/dirtSprite.png',
            frameConfig: {
                frameWidth: 150,
                frameHeight: 150,
                frameStart: 0, 
                frameEnd: 1
            }

        })

        this.load.spritesheet({key: 'angryJulie',
            url: "../Sprites/images/angryJulie.png",
            frameConfig:{
                frameWidth: 150,
                frameHeight: 250,
                startFrame: 0,
                endFrame: 3
            }

        })

    }

    preload(){
        this.loadSpritesheets()
        this.loadSprites()

    }

    create(){
        //console.log(XState)
        this.scene.start('welcome')
    }
}