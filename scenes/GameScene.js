
import Player from "../Sprites/Player/index.js"

export default class GameScene extends Phaser.Scene{
    constructor(){
        super('gameScene');
    }
    //#region Variables
    moveRight;
    moveLeft;
    moveUp;
    moveDown;
    interactLetter;
    playerX;
    playerY;
    player;
    graphics;
    loopedTwice;
    letPlayerMove;
    walk;
    direction;
    isMoving;
    box;
    dialogue;
    startingDialog;
    dialogOn;
    pressed;
    characterScale;
    picBox;
    charPic;
    data;
    questData;
    alreadyChanged;
    dialogIndex;
    buttonsPressed;
    dialogDone;
    questsList = [];
    wardrobe;
    door;
    arrowSelect
    pressedOnce;
    completedQuests;
    npc;
    moveRight2 
    moveLeft2 
    julieInteract;
    //#endregion

    preload(){
        this.load.scenePlugin({key:'DialogModalPlugin', url:'plugins/dialog_plugin.js'});
        this.load.scenePlugin({key: 'QuestsPlugin', url: 'plugins/quest_plugin.js'})
    }

    init(data){
        this.questsList = data.quests;
    }

    create(){
        //console.log(this.questsList)
        this.alreadyChanged = false;
        this.pressedOnce = false;

        //Json Loading
        this.data = this.cache.json.get('dialog')
        this.questData = this.cache.json.get('quests')

        ////console.log(this.questData ,"ekide");

        ////console.log(this.data.FirstDialog[0]);
        this.dialogIndex = 0;
        this.buttonsPressed = 0;
        this.dialogDone = false;

        ////console.log(this.questsList, "ekide quests")

        this.pressed = false;
        this.dialogOn = true;
        //this.timeCount = 5;
        //this.loopedTwice = false;
        this.isMoving = false;
        this.letPlayerMove = true;
        this.direction = "left";

        this.characterScale = 1.8;

        this.plugins.install('DialogModalPlugin')
        
        ////console.log(this.sys.plugins.scenePlugins)
        
        this.add.image(500, 300, 'home')

        let arrowAnim = this.anims.create({
            key: 'arrowAnim',
            frames: this.anims.generateFrameNumbers('selectAnim'),
            frameRate: 12,
            repeat: -1
        })

        let walkAnim = this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNumbers('astherWalk'),
            frameRate: 10,
            repeat: -1
        })

        let pWalkAnim = this.anims.create({
            key: 'PWalk',
            frames: this.anims.generateFrameNumbers('astherPWalk'),
            frameRate: 10,
            repeat: -1
        })

        let selectWardrobe = this.anims.create({
            key: 'select',
            frames: this.anims.generateFrameNumbers('pls'),
            frameRate: 30,
            repeat: -1
        })

        

        //Add graphics to be able to draw shapes to the scene.
        this.graphics = this.add.graphics({x: 0, y: 0})

        //Start the item in a random position on the screen.
        this.playerX = 700//Phaser.Math.Between(50, 950);
        this.playerY = 200//Phaser.Math.Between(50, 550)

        //Add input keys for the player to be able to use.
        this.moveRight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
        this.moveLeft = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
        this.interactLetter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
        this.moveRight2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
        this.moveLeft2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)

        //Setting bounds in the world so the player cannot run off the screen.
        this.physics.world.setBounds(0, 0, 500, 700)

        //this.wadrobeSelect = this.add.sprite(240, 220, 'pls').play('select')
        this.wardrobe = this.add.sprite(466, 319, 'wardrobe')
        this.door = this.add.sprite(45, 410, 'doorSelect')
        this.arrowSelect = this.add.sprite(466, 100, 'selectAnim').play('arrowAnim').setScale(0.3)
        
        this.cameras.main.fadeIn(1500, 0, 0 ,0)

        this.add.image( 853, 250, "groupPicture").setScale(0.4)

        //Start a Timer
        //this.StartTimer(4)

        //Add the menu text at the top right 
        // of the screen.
        let menuTxt = this.make.text({
            x: 970,
            y: 10,
            text: "Menu",
            origin: {x: 0.5, y: 0}
        })

        //Add the player to the scene and set it to interactive.
        //let player2 = this.physics.add(new Player(this, 100, 100));
        this.physics.world.setBounds(-50, 0, 1200, 550, true, true, false, true)

        if(!this.questsList.quest6.completion){
            

            this.player = this.physics.add.sprite(this.playerX, 450, 'astherSprite', 3).setScale(0.6)//.play('walk')//.setInteractive()
            this.player.setCollideWorldBounds(true)

            //Setting the menu text to interactive, when the player clicks on it 
            // it will be sent to the menu scene.
            menuTxt.setInteractive().on('pointerdown', () => this.ChangeScene(0))

            let movementText = this.make.text({
                x: 200,
                y: 50,
                text: "You can use A and D to move left and right, or use the LEFT and RIGHT arrow keys. To interact with objects or people use the SPACEBAR. ",
                origin: {x: 0.5, y: 0.5},
                style: {
                    wordWrap: { width: 300}
                }
            })
    
            movementText.setColor("#000000")
            movementText.setShadow(2, 2, "#000000", 5);
            movementText.setShadowFill(true)

            this.PrintDialogue('Asther', this.data.FirstDialog[0].text, 'astherAvatar', 0, true)
            
        }
        else if(this.questsList.quest6.completion){
            this.julieInteract = false;
            
            this.player = this.physics.add.sprite(150, 450, 'astherSprite', 3).setScale(0.6)//.play('walk')//.setInteractive()
            this.player.setCollideWorldBounds(true)
            this.npc = this.add.sprite( 100, this.playerY + 180, 'JulieStanding', 1).setScale(1.3).play('idle')
            this.PrintDialogue('Julie', this.data.FinishingQuest[0].text, 'julieAvatar', 0, true)
        }

        

        this.wardrobe.setVisible(false)
        this.door.setVisible(false)
        this.arrowSelect.setVisible(false)
    }

    update(){
        this.graphics.clear();

        if (this.questsList.quest1.completion && !this.questsList.quest6.completion){
            if(this.CheckDistance(this.player, this.wardrobe)){
                this.wardrobe.setVisible(true)
            }else{
                this.wardrobe.setVisible(false)
            }

            this.arrowSelect.x = 50
            this.arrowSelect.y = 190
            this.door.setVisible(true)
        }

        

        //#region Movement
        //Check if the player is pressing the 
        //Button for moving to the right ('D')
        //and move accordingly.
        if(this.moveRight.isDown && this.letPlayerMove 
        || this.moveRight2.isDown && this.letPlayerMove){
            if(this.player.x < 980){
                this.player.setVelocityX(300)

                if(this.questsList.quest1.completion){
                    this.player.anims.play('walk', true)
                }else if(!this.questsList.quest1.completion){
                    this.player.anims.play('PWalk', true)
                }
                if(this.direction == "left"){
                    this.player.flipX = true
                    this.direction = "right"
                }
            }
        }
        //Check if the player is pressing the 
        //Button for moving to the left ('A')
        //and move accordingly.
        else if(this.moveLeft.isDown && this.letPlayerMove
        || this.moveLeft2.isDown && this.letPlayerMove){
            if(this.player.x > 30){

                if(this.questsList.quest1.completion){
                    this.player.anims.play('walk', true)
                }else if(!this.questsList.quest1.completion){
                    this.player.anims.play('PWalk', true)
                }
                
                this.player.setVelocityX(-300)

                if(this.direction == "right"){
                    this.player.flipX = false
                    this.direction = "left"
                }
            }
        }
        else{
            this.player.setVelocityX(0)
            this.player.anims.stop();
            
            if(!this.questsList.quest1.completion){
                this.player.setTexture('astherSprite', 3)
            }else{
                this.player.setTexture('astherSprite', 0)
            }
            //this.player = this.add.sprite(this.player.x, this.player.y, 'asther').setScale(0.7)
        }
        //#endregion

        //Once the player is done changin, 
        //they may cross to the town.
        if(this.player.x <= 70 && this.alreadyChanged){
            this.ChangeScene(1)
        }

        if(this.interactLetter.isDown && !this.questsList.quest6.completion
            ){
            if(!this.pressed){
                
                //if the dialog is not done 
                //this will continue the dialog 
                if(!this.dialogDone){
                    if(this.sys.DialogModalPlugin.isAnimating() && this.buttonsPressed == 0){
                        this.WriteDialog('Asther', false)

                    }else if(this.dialogIndex <= 0){
                        if(!this.sys.DialogModalPlugin.isAnimating()){
                            this.WriteDialog('Asther', true)
                        }
                    }else if(this.dialogIndex > 0){
                        this.sys.DialogModalPlugin.toggleWindow();
                        this.letPlayerMove = true;
                        this.dialogDone = true;
                    }
                } 

                if(!this.dialogOn && this.dialogDone ){ //this.questsList.quest1.completion

                    //Assign the next quest once the player is done changing.
                    if(!this.questsList.quest1.completion){
                        this.wardrobe.setVisible(true)
                        this.arrowSelect.setVisible(true)
                        this.AssignQuest(this.questsList.quest1.quest)
                    }
                
                }
               
                //This will check if the dialog is on in the scene.
                if(this.dialogOn && !this.pressed){
                    this.dialogOn = false
                }
            }

            if(this.CheckDistance(this.player, this.wardrobe) && !this.pressed){
                this.pressed = true;

                this.questsList.quest1.completion = true;
                
                
                this.dialogOn = true;
                //this.charPic.destroy()
                

                if(this.sys.DialogModalPlugin.isAnimating() && this.buttonsPressed == 0){
                    this.sys.DialogModalPlugin.toggleWindow();
                    this.letPlayerMove = false;
                    this.PrintDialogue('Asther', this.data.FirstDialog[2].text, "astherAvatar", 1, false )
                    this.AssignQuest(this.questsList.quest2.quest)
                    this.dialogOn = false;
                    this.alreadyChanged = true;
                }else if(this.dialogIndex == 1 && !this.pressedOnce){
                    this.pressedOnce = true;
                    this.letPlayerMove = false;
                    //this.sys.DialogModalPlugin.toggleWindow();
                    this.PrintDialogue('Asther', this.data.FirstDialog[2].text, 'astherAvatar', 1, true)
                }else{
                    this.sys.DialogModalPlugin.toggleWindow();
                    this.AssignQuest(this.questsList.quest2.quest)
                    this.letPlayerMove = true;
                    this.dialogOn = false;
                    this.alreadyChanged = true;
                    this.pressedOnce = false;
                }

                
            }
            
            this.pressed = true;
        }

        if(this.interactLetter.isDown && this.questsList.quest6.completion){
            if(!this.pressed){
                if(this.questsList.quest6.completion && this.questsList.quest6.part == 2){
                    if(!this.julieInteract){
                        if(this.sys.DialogModalPlugin.isAnimating() && this.buttonsPressed == 0){
                            this.sys.DialogModalPlugin.toggleWindow();
                            this.letPlayerMove = false;
                            this.PrintDialogue('Julie' ,this.data.FinishingQuest[0].text, "julieAvatar", 0, false )
                            this.dialogOn = false;
                            this.alreadyChanged = true;
                        }else if(this.dialogIndex == 0 && !this.pressedOnce){
                            this.pressedOnce = true;
                            this.letPlayerMove = false;
                            this.sys.DialogModalPlugin.toggleWindow();
                            this.PrintDialogue('Julie', this.data.FinishingQuest[0].text, 'julieAvatar', 0, true)
                        }else{
                            this.sys.DialogModalPlugin.toggleWindow();
                            this.letPlayerMove = true;
                            this.dialogOn = false;
                            this.julieInteract = true
                            this.pressedOnce = false;
                        }
                    }
            }
                this.pressed = true
            }
        }


        if(this.julieInteract){
            this.npc.x++;
            this.npc.flipX = true;
            if(this.npc.x > 1000){
                this.npc.destroy()
                let timeLoop = this.time.addEvent({
                    delay: 1200,
                    callback: this.GameOver,
                    callbackScope: this,
                    repeat: 0
                })
            }
        }

        if(this.interactLetter.isUp
        ){
            this.pressed = false;
        }

        
    }

    GameOver(){
        this.scene.start('gameOver')
    }

    // Pauses the Game scene and launches 
    // The menu scene. This way the 
    // Game scene wont be restarted 
    // once the player decides to resume the
    // game.
    ChangeScene(index){

        if(index == 0){
            this.scene.pause()
            this.scene.launch('menuScene')
        }else if(index == 1){
            this.player.x = 150;
            this.moveLeft.isDown = false;
            this.scene.start('townScene', { x: 950, 
                                            y: 500, 
                                            quests: this.questsList})
            this.scene.bringToTop('townScene')
        }
    }

    //When this event is called, the player will be moved 
    // to x: 100 and y: 500.
    onEvent(){
        this.timeCount--;

        if(this.timeCount == 0 && this.loopedTwice == false){
            this.timeCount = 5;
            this.player.x = 100;
            this.player.y = 500;
            this.loopedTwice = true;
            this.SetPlayerDraggable()
            this.StartTimer(4)
        }
    }

    StartTimer(repetition){
        //Adding time for the screen.
        this.timeLoop = this.time.addEvent({
            delay: 1000,
            callback: this.onEvent,
            callbackScope: this,
            repeat: repetition
        });
    }

    SetPlayerDraggable(){
        //Make the player draggable in the scene
        this.input.setDraggable(this.player);

        //When the player starts dragging the object
        // it will bring it to the top if something is
        // in front of it.
        this.input.on('dragstart', function(pointer, gameObj){
            this.children.bringToTop(gameObj);
        }, this)

        //When the player is dragging the object, it will
        // move the object according to the mouse position.
        this.input.on('drag', function(pointer, gameObj, dragX, dragY){
            gameObj.x = dragX;
            gameObj.y = dragY;
        })

        //once the player drops the object it will check if it was dropped
        // in a certain box radius.
        this.input.on('dragend', function(pointer, dragX, dragY, dropped){
            //console.log("x: " + pointer.x + " y: " + pointer.y)

            // If the box is dropped in a certain radius, the box will be 
            // sent to an specific point in that radius. 
                if(pointer.x < (this.playerX + 100) && pointer.x > (this.playerX - 100)){
                    if(pointer.y < (this.playerY + 100) && pointer.y > (this.playerY - 100)){
                        //console.log("dropped x: " + pointer.x + " y: " + pointer.y)
                        this.player.x = this.playerX;
                        this.player.y = this.playerY;
                    }
                }
            
        }, this)
    }

    PrintDialogue(name, text, spritePic, imageIndex, animate){
        this.letPlayerMove = false;
        this.sys.DialogModalPlugin.init(name, spritePic, imageIndex)
        this.sys.DialogModalPlugin._createWindow();
        this.dialogCreated = true;
        
        this.sys.DialogModalPlugin.setText(text, animate)
    }

    CheckDistance(character, target){
        if(character.x > (target.x - 100) && character.x < (target.x + 100)){
            ////console.log("is this in range? ", "ekide")
            return true;
        }else{
            return false;
        }
    }

    AssignQuest(quest){
        this.QuestsPlugin.init();
        this.QuestsPlugin.setText(850, 100, 740, 70 , quest)
    }

    WriteDialog(name, animate){
        this.sys.DialogModalPlugin.toggleWindow();
        if(animate){
            this.dialogIndex++;
        }
        this.PrintDialogue(name, this.data.FirstDialog[this.dialogIndex].text, "astherAvatar", 0, animate)
    }

}