
export default class TownScene extends Phaser.Scene{
    constructor(){
        super('townScene')
    }
    displayQuestOnce;
    player;
    moveRight;
    moveLeft;
    moveRight2;
    moveLeft2;
    interact; 
    direction
    objectPos
    jump;
    pressed;
    buttonsPressed;
    letPlayerMove;
    alright;
    questsData;
    buttonPressed;
    dialogIndex;
    questNum;
    eggsBox;
    acquireText;
    eggAcquired;
    npc;
    inventoryEggs;
    cookie

    //player variables 
    isFalling;
    onFloor;
    gravity;
    velocity;
    pressedOnce;

    //World Building Variables
    floorPlataform;

    preload(){
        this.load.scenePlugin({key:'DialogModalPlugin', url:'plugins/dialog_plugin.js'});
        this.load.scenePlugin({key: 'QuestsPlugin', url: 'plugins/quest_plugin.js'})
    }

    init(data){
        this.objectPos = {x: data.x, y: data.y};
        this.questsData = data.quests;
    }

    create(){
        //Player behavior
        this.displayQuestOnce = false;
        this.eggAcquired = true;
        this.alright = false;
        this.letPlayerMove = true;
        this.buttonPressed= true;
        this.dialogIndex = -1;
        this.buttonsPressed = 0
        this.pressedOnce = false;
        this.isFalling = false;
        this.onFloor = true;
        this.gravity = 10;
        this.velocity = 5;

        //Json and Plugins
        this.data = this.cache.json.get('dialog')
        this.questData = this.cache.json.get('quests')
        this.plugins.install('DialogModalPlugin')

        //console.log(this.questsData, "ekide")

        this.pressed = false;
        this.direction = "left"

        //Add input keys for the player to be able to use.
        this.moveRight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
        this.moveLeft = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
        this.interact = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
        this.jump = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
        this.moveRight2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
        this.moveLeft2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)


        let jumpAnim = this.anims.create({
            key: 'jumping',
            frames: this.anims.generateFrameNumbers('astherJump'),
            frameRate: 12,
            repeat: -1
        })

        //DRAWING
        let town = this.add.image(0,300, 'town')//.play('bgIdle')
        //Align.scaleToGameW(town, 2)
        // this.cameras.add(0, 0, town.displayWidth, town.displayHeight, true)
        this.cameras.main.fadeIn(500, 0, 0 ,0)
        this.cameras.main.height = 600;

        //World Building

        this.physics.world.setBounds(-1200, 0, 2400, 580, true, true, false, true)

        this.add.image(900, 400, 'backPorch')
        this.add.image(900, 400, 'frontPorch')

        this.interactBox = this.add.image(-400, 280, "interactionBox")
        this.textTalk = this.make.text({
            x: -400,
            y: 280,
            text: "Press SPACE to talk.",
            origin: {x: 0.5, y: 0.5}
        })
        this.textTalk.addColor = "#ffffff"
        this.player = this.physics.add.sprite(this.objectPos.x, this.objectPos.y,'astherSprite', 0).setScale(0.4)
        this.player.setOrigin(0.5, 1)
        //this.player.setBounce(0.2)
        this.player.setCollideWorldBounds(true)
        this.player.body.setGravityY(500)

        if(!this.questsData.quest2.completion){
            this.arrowSelect = this.add.sprite(-250, 300, 'selectAnim').play('arrowAnim').setScale(0.3)
            this.AssignQuest(850, 100, 740, 70, this.questsData.quest2.quest, true)
        }
        else if(!this.questsData.quest4.completion && this.questsData.quest3.completion){
            this.questNum = 4;
            this.arrowSelect = this.add.sprite(-465, 300, 'selectAnim').play('arrowAnim').setScale(0.3)
            this.eggsBox = this.add.image(40, 60, "eggs").setScrollFactor(0)
            this.acquireText = this.make.text({
                x: -450,
                y: 250,
                text: "You acquired the eggs. ",
                origin: {x: 0.5, y: 0.5}
            })
            this.acquireText.addColor = "#000000"
            this.eggsBox.setVisible(false)
            this.acquireText.setVisible(false)
            this.AssignQuest(850, 100, 740, 70, this.questsData.quest4.quest, true)
        }else if (!this.questsData.quest6.completion){
            this.questNum = 6;
            this.AssignQuest(850, 130, 740, 120, this.questsData.quest4.quest, true)
        }
        
        if(this.questsData.quest6.completion){
            this.npc = this.add.sprite(this.objectPos.x - 50, this.objectPos.y - 110, 'JulieStanding', 1).play('idle').setScale(0.7)
        }

        //this.physics.add.collider(this.player, this.floorPlataform)
    }

    update(){
        
        

        if(this.CheckDistance(this.player, -420)){

            if(this.interact.isDown && !this.buttonPressed && !this.questsData.quest6.completion){

                if(this.questsData.quest3.completion && this.questNum == 4){
                    if(this.sys.DialogModalPlugin.isAnimating()){
                        this.sys.DialogModalPlugin.toggleWindow();
                        this.letPlayerMove = false;
                        this.PrintDialogue(this.data.FifthDialog[this.dialogIndex].text, 
                                            this.data.FifthDialog[this.dialogIndex].name,
                                            this.data.FifthDialog[this.dialogIndex].spriteSheet, 
                                            this.data.FifthDialog[this.dialogIndex].imageFrame, false, true )
                    }
                    
                    else if(this.dialogIndex < 11){
                        if(!this.sys.DialogModalPlugin.isAnimating()){
                            this.letPlayerMove = false;
                            this.arrowSelect.setVisible(false)
                            this.interactBox.setVisible(false)
                            this.textTalk.setVisible(false)
                            this.dialogIndex++;
                            this.sys.DialogModalPlugin.toggleWindow();
                            if(this.dialogIndex == 11){
                                //this.sys.DialogModalPlugin.toggleWindow();
                            }
                            this.PrintDialogue(this.data.FifthDialog[this.dialogIndex].text, 
                                                this.data.FifthDialog[this.dialogIndex].name,
                                                this.data.FifthDialog[this.dialogIndex].spriteSheet, 
                                                this.data.FifthDialog[this.dialogIndex].imageFrame, true, true)
                            
        
                        }
                    }
                    else if(this.dialogIndex >= 11){
                        this.sys.DialogModalPlugin.toggleWindow();
                        this.sys.QuestsPlugin.toggleWindow();
                        this.AssignQuest(850, 145, 740, 115, this.questsData.quest5.quest, true)
                        this.eggsBox.setVisible(true)
                        this.acquireText.setVisible(true)
                        let disableBg = this.time.addEvent({
                            delay: 1000,
                            callback: this.ToggleVisible,
                            callbackScope: this,
                            repeat: 0
                        })
                        this.questsData.quest4.completion = true;
                        this.pressedOnce = false;
                        this.alright= false;
                        
                    }
                }else if(!this.questsData.quest2.completion){
                
                    if(this.sys.DialogModalPlugin.isAnimating()){
                        this.sys.DialogModalPlugin.toggleWindow();
                        this.letPlayerMove = false;
                        this.PrintDialogue(this.data.QuestNotDone[0].text, 
                                            this.data.QuestNotDone[0].name,
                                            this.data.QuestNotDone[0].spriteSheet, 
                                            this.data.QuestNotDone[0].imageFrame, false, true )
                    }
                    
                    else if(!this.pressedOnce){
                        if(!this.sys.DialogModalPlugin.isAnimating()){
                            this.pressedOnce  = true;
                            this.letPlayerMove = false;
                            this.PrintDialogue(this.data.QuestNotDone[0].text, 
                                                this.data.QuestNotDone[0].name,
                                                this.data.QuestNotDone[0].spriteSheet, 
                                                this.data.QuestNotDone[0].imageFrame, true, true)
        
                        }
                    }
                    else if(!this.sys.DialogModalPlugin.isAnimating() && this.pressedOnce ){
                        this.sys.DialogModalPlugin.toggleWindow();
                        this.letPlayerMove = true;
                        this.pressedOnce = false;
                        this.alright= false;
                        
                    }
                }
    
                if(this.questNum == 6 && this.questsData.quest5.completion){
                    if(this.sys.DialogModalPlugin.isAnimating() ){
                        this.sys.DialogModalPlugin.toggleWindow();
                        //console.log("not animating ekide")
                        this.WriteDialog(this.data.NinthDialog[this.dialogIndex], false, true)
                        
                        this.letPlayerMove = false;
                    
                    }
                    else if(this.dialogIndex >= 11){
                        this.sys.DialogModalPlugin.toggleWindow()
                        this.AssignQuest(850, 130, 740, 120, this.questsData.quest5.quest, true)
                        this.questsData.quest6.part = 2;
                        this.dialogDone = true;
                        this.letPlayerMove = true;
                    }
                    else if(this.dialogIndex < 11){
                        if(!this.sys.DialogModalPlugin.isAnimating()){
                            this.sys.DialogModalPlugin.toggleWindow();
                            this.dialogIndex++;
                            this.WriteDialog(this.data.NinthDialog[this.dialogIndex], true, true)
                            this.letPlayerMove = false;
                        }
                    }
                }

                this.buttonPressed = true;
            }

            

            if(!this.printOnce){
                
                this.interactBox.setVisible(true);
                this.textTalk.setFill("black")
                this.textTalk.setVisible(true);

                this.printOnce = true;
            }   
        }else{
            this.interactBox.setVisible(false);
            this.textTalk.setVisible(false);
            this.printOnce = false;
        }

        if(this.player.x >= 944 && this.interact.isDown && !this.questsData.quest2.completion && !this.buttonPressed){
            if(this.sys.DialogModalPlugin.isAnimating()){
                this.sys.DialogModalPlugin.toggleWindow();
                this.letPlayerMove = false;
                this.PrintDialogue("We should go and meet Julie", 
                                    "Asther",
                                    "astherAvatar", 
                                    1, false, false)
            }
            
            else if(!this.pressedOnce){
                if(!this.sys.DialogModalPlugin.isAnimating()){
                    this.pressedOnce  = true;
                    this.letPlayerMove = false;
                    this.PrintDialogue("We should go and meet Julie",
                                        "Asther", 
                                        "astherAvatar", 
                                        1, true, false)

                }
            }
            else if(!this.sys.DialogModalPlugin.isAnimating() && this.pressedOnce ){
                this.sys.DialogModalPlugin.toggleWindow();
                this.letPlayerMove = true;
                this.pressedOnce = false;
                this.alright= false;
                
            }

            this.buttonPressed = true;
        }

        if(this.interact.isUp){
            this.buttonPressed= false;
        }

        if(this.player.x <= 500 && this.player.x >= -499){
            if(this.QuestsPlugin && !this.displayQuestOnce){
                if(!this.questsData.quest2.completion){
                    this.QuestsPlugin.toggleWindow();
                    this.AssignQuest(850, 145, 740, 115, this.questsData.quest2.quest, true)
                    this.displayQuestOnce = true;
                }
                else if(!this.questsData.quest4.completion){
                    this.QuestsPlugin.toggleWindow();
                    this.AssignQuest(850, 145, 740, 115, this.questsData.quest4.quest, true)
                    this.displayQuestOnce = true;
                }
            }
            this.cameras.main.startFollow(this.player, true)
            this.cameras.main.height = 1250;
            this.cameras.main.y = -45;
        }else{
            this.cameras.main.stopFollow()
        }

        if(this.questsData.quest6.completion){
            this.letPlayerMove= false;
            if(this.player.x < 850){
                this.player.flipX = true;
                this.npc.flipX = true;
                this.player.anims.play('walk', true)
                this.player.x++;
                this.npc.x++;
            }
            else if(this.npc.x <= 900){
                this.npc.x++;
            }
            else if (this.player.x < 1100){
                this.npc.flipX = false;
                this.player.anims.play('walk', true)
                this.player.x++;
            }
            else if(this.npc.x < 1100){
                this.npc.flipX = true;
                this.npc.x++;
            }
            else if(this.player.x >= 1100 && this.npc.x >= 1100){
                this.ChangeScene(1)
            }
        }

        //#region Movement
        ///Check if the player is pressing the 
        //Button for moving to the right ('D')
        //and move accordingly.
        if(this.moveRight.isDown && this.letPlayerMove
        || this.moveRight2.isDown && this.letPlayerMove   ){
            if(this.player.x < 980){
                this.player.setVelocityX(700)

                
                this.player.anims.play('walk', true)
                //this.player.setFrame(1)

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

                this.player.anims.play('walk', true)
                //this.player.setFrame(1)
                this.player.setVelocityX(-700)
                

                if(this.direction == "right"){
                    this.player.flipX = false
                    this.direction = "left"
                }
            
        }
        else{
            this.player.setVelocityX(0)
            this.isMoving = false;
            this.player.anims.stop();
            this.player.setTexture('astherSprite', 0)
            //this.player = this.add.sprite(this.player.x, this.player.y, 'asther').setScale(0.7)
        }
        //#endregion

        // if(this.player.x >= 980 && !this.questsData.quest6.completion){
            
        //     this.ChangeScene(1);
        // }

        if(this.player.x > -263 && this.player.x < -195 && this.interact.isDown && !this.questsData.quest6.completion){
            this.ChangeScene(2)
        }
    }

    PrintDialogue(text, spriteName, spritePic, imageIndex, animate, isScrolling){
        this.letPlayerMove = false
        this.sys.DialogModalPlugin.init(spriteName, spritePic, imageIndex, isScrolling)
        this.sys.DialogModalPlugin.setHeight(535, 543)
        this.sys.DialogModalPlugin._createWindow(isScrolling);
        this.sys.DialogModalPlugin.setText(text, animate, isScrolling, 500, 440)
    }

    ToggleVisible(){
        this.acquireText.setVisible(false)
        this.letPlayerMove = true;
    }

    WriteDialog(jsonDialog, animate, scrolling){
        
        
        this.PrintDialogue(jsonDialog.text,
                            jsonDialog.name, 
                            jsonDialog.spriteSheet, 
                            jsonDialog.imageFrame, animate, scrolling)
        
        
    }

    CheckDistance(character, target){
        if(character.x > (target - 200) && character.x < (target + 200)){
            return true;
        }else{
            return false;
        }
    }

    ChangeScene(index){
        if(index == 0){
            this.scene.pause()
            this.scene.launch('menuScene')
        }else if(index == 1){
            //console.log("waiting to change")
            this.scene.pause()
            this.scene.start('gameScene', {quests: this.questsData})
            this.scene.bringToTop('gameScene')
        }else if(index == 2){
            //console.log("Entering bakery")
            this.scene.pause()
            this.scene.start('bakeryScene', {x: 150, y: 450, quest: this.questsData})
            this.scene.bringToTop('bakeryScene')
        }
    }

    AssignQuest(x, y, textX, textY, quest, setScroll){
        
        this.QuestsPlugin.init();
        this.QuestsPlugin.setText(x, y, textX, textY, quest, setScroll)
    }
}