export default class BakeryScene extends Phaser.Scene{
    constructor(){
        super("bakeryScene")
    }
    player;
    moveRight;
    moveLeft;
    moveRight2;
    moveLeft2;
    letPlayerMove;
    npc;
    tigerNpc;
    npcSawPlayer
    spriteIndex
    firstLoop
    direction
    npcStopLaugh
    dialogData
    dialogDone
    interactButton;
    dialogIndex;
    buttonPressed
    charPic;
    alreadyTalked;
    dialogDone;
    buttonsPressed;
    printOnce;
    textTalk;
    interactBox;
    pressedOnce;
    playerPos;
    questData;
    eggsBox;
    questNum;
    setVisibleOnce;
    printDataOnce;
    cookie

    preload(){
        this.load.scenePlugin({key:'DialogModalPlugin', url:'plugins/dialog_plugin.js'});
        this.load.scenePlugin({key:'QuestsPlugin', url: 'plugins/quest_plugin.js'})
    }

    init(data){
        this.playerPos = {x: data.x, y: data.y}
        this.questData = data.quest
    }
    
    create(){
        //Dialog plugin and json load
        
        this.setVisibleOnce = false;
        this.printDataOnce = false;
        this.pressedOnce = false;
        this.printOnce = false;
        this.buttonsPressed = 0;
        this.alreadyTalked = false;
        this.buttonPressed = false;
        this.dialogIndex = -1;
        this.data = this.cache.json.get('dialog')
        this.plugins.install('DialogModalPlugin')

        //console.log(this.questData, "ekide quest")

        this.direction = "left"
        this.npcSawPlayer = true;
        this.letPlayerMove = true;
        this.spriteIndex = 2;
        this.firstLoop = true;
        this.npcStopLaugh = false;

        let julieIdle = this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('JulieStand'),
            frameRate: 4,
            repeat: -1
        })

        let julieLaugh = this.anims.create({
            key:'laugh',
            frames: this.anims.generateFrameNumbers('JulieLaugh'),
            frameRate: 4,
            repeat: -1
        })

        //Furniture
        this.add.rectangle(0, 300, 150, 250, 0xa36b4b)
        this.add.rectangle(950, 300, 150, 250, 0xa36b4b)
        this.cameras.main.fadeIn(500, 0, 0 ,0)

        this.add.image(500, 300, 'BakeryBack');
        this.tigerNpc = this.add.sprite(860, 290, 'tigerSprite', 0)
        this.add.image(500, 300, 'BakeryFront')
       
        //Add input keys for the player to be able to use.
        this.moveRight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
        this.moveLeft = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
        this.interactButton = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
        this.moveRight2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
        this.moveLeft2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)

        
        
        //rectangle(700, 330, 50, 150, 0x48964d)

        if(!this.questData.quest2.completion){
            this.add.image(500, 300, 'BakeryBack');
            this.tigerNpc = this.add.sprite(860, 290, 'tigerSprite', 0)
            this.add.image(500, 300, 'BakeryFront')
            this.arrowSelect = this.add.sprite(800,250, 'selectAnim').play('arrowAnim').setScale(0.3)
            this.AddJulie(this.questData.quest2.quest)
            this.questNum = 2

            this.dialogDone = false;
        }else if(!this.questData.quest4.completion){
            this.questNum = 4;
            this.add.image(500, 300, 'BakeryBack');
            this.tigerNpc = this.add.sprite(860, 290, 'tigerSprite', 0)
            this.add.image(500, 300, 'BakeryFront')
            this.arrowSelect = this.add.sprite(60, 200, 'selectAnim').play('arrowAnim').setScale(0.4)
            this.npc.destroy()
            this.AssignQuest(850, 100, 740, 70, this.questData.quest4.quest, true)
        }else if(!this.questData.quest5.completion){
            //console.log("doing quest 5")
            this.questNum = 5;
            this.add.image(500, 300, 'BakeryBack');
            this.tigerNpc = this.add.sprite(860, 290, 'tigerSprite', 0)
            this.add.image(500, 300, 'BakeryFront')
            this.AddJulie(this.questData.quest5.quest)
            this.arrowSelect = this.add.sprite(800, 250, 'selectAnim').play('arrowAnim').setScale(0.4)
            this.eggsBox = this.add.image(40, 30, "eggs").setScrollFactor(0)
            this.eggsBox.setVisible(true)
            this.dialogDone = false;
        }else if(!this.questData.quest6.completion){
            //console.log(this.questData.quest6.part, "part ekide")
            if(this.questData.quest6.part == 2){
                this.add.image(500, 300, 'bakeryChange');
                this.tigerNpc = this.add.sprite(860, 290, 'tigerSprite', 0)
                this.dialogDone = false;
                this.questNum = 6;
                this.AddJulie(this.questData.quest5.quest)
                
            }
            if(this.questData.quest6.part == 1){
                this.questNum = 6;
                this.cookie = this.add.image(50, 50, 'cookieSprite').setScrollFactor(0)
                this.AssignQuest(850, 100, 740, 70,this.questData.quest6.quest)
            }
            

        }

        this.player = this.add.sprite(this.playerPos.x, this.playerPos.y, 'astherSprite', 0).setScale(0.5)
    }

    update(){
        //Mikey, Mickey, Mikki, Meeki, Mikky, Mikkey, Micky
        //Check if the player is pressing the 
        //Button for moving to the right ('D')
        //and move accordingly.
        //#region Movement
        if(this.moveRight.isDown && this.letPlayerMove
            || this.moveRight2.isDown && this.letPlayerMove){
            if(this.player.x < 980){
                this.player.x += 5;
                //this.player.destroy();
                if(this.isMoving == false){
                    this.player.anims.play('walk');
                    //this.player.setFrame(1)
                    this.isMoving = true;
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
                //this.player.destroy()
                if(this.isMoving == false){
                    this.player.anims.play('walk')
                    //this.player.setFrame(1)
                    this.isMoving = true;
                }
                this.player.x -= 5;

                if(this.direction == "right"){
                    this.player.flipX = false
                    this.direction = "left"
                }
            }
        }else if(this.player.x < 680){
            this.isMoving = false;
            this.player.anims.stop();
            this.player.setTexture("astherSprite",0)
            //this.player = this.add.sprite(this.player.x, this.player.y, 'asther').setScale(0.7)
        }
        //#endregion

        if(this.questData.quest6.part == 1 && this.player.x <= 500 && this.questData.quest5.completion){
            this.cookie.setVisible(false)
            this.AssignQuest(850, 100, 740, 70,this.questData.quest4.quest)
        }

        if(this.CheckDistance(this.player, this.npc)){

            if(!this.printOnce){
                
                this.interactBox.setVisible(true);
                //this.textTalk.setFill("black")
                this.textTalk.setVisible(true);

                this.printOnce = true;
            }
            if(!this.firstLoop && !this.setVisibleOnce && !this.questData.quest6.completion){
                this.interactBox.setVisible(false);
                //this.textTalk.setFill("black")
                this.textTalk.setVisible(false);
                this.setVisibleOnce = true;
            }

            if(this.interactButton.isDown && !this.buttonPressed){
                
                //#region Second Quest Dialog
                if(!this.dialogDone && !this.questData.quest2.completion){
                    if(this.sys.DialogModalPlugin.isAnimating() && this.buttonsPressed == 0){
                        this.AddDialogToScene(this.data.SecondDialog[this.dialogIndex], false)
                        

                    }else if(this.dialogIndex < 5){
                        if(!this.sys.DialogModalPlugin.isAnimating()){
                            this.interactBox.setVisible(false);
                            //this.textTalk.setFill("black")
                            this.textTalk.setVisible(false);
                            this.arrowSelect.setVisible(false)
                            this.dialogIndex++;
                            this.AddDialogToScene(this.data.SecondDialog[this.dialogIndex], true)

                        }
                    }else if(this.dialogIndex >= 5){
                        this.sys.DialogModalPlugin.toggleWindow();
                        this.sys.QuestsPlugin.toggleWindow();
                        this.arrowSelect.x = 950
                        this.arrowSelect.setVisible(true)
                        this.dialogDone = true;
                        this.alreadyTalked = true;
                        this.letPlayerMove = true;
                    }
                }
                
                else if(this.dialogDone && this.questNum == 2 && !this.setVisibleOnce){
                    if(this.sys.DialogModalPlugin.isAnimating()){
                        this.pressedOnce  = false;
                        this.AddDialogToScene(this.data.SecondDialog[5], false)
                        this.pressedOnce  = true;

                    }
                    
                    else if(!this.pressedOnce){
                        if(!this.sys.DialogModalPlugin.isAnimating()){
        
                            this.pressedOnce  = true;
                            this.AddDialogToScene(this.data.SecondDialog[5], true)
                        }
                    }
                    else if(!this.sys.DialogModalPlugin.isAnimating() && this.pressedOnce){
                        this.sys.DialogModalPlugin.toggleWindow();
                        this.alreadyTalked = true;
                        this.letPlayerMove = true;
                        this.pressedOnce = false;
                        
                    }
                }
                //#endregion
                
                //#region Fifth Quest Dialog
                if(!this.dialogDone && this.questNum == 5){
                    if(this.sys.DialogModalPlugin.isAnimating() && this.buttonsPressed == 0){
                        this.AddDialogToScene(this.data.SixthDialog[this.dialogIndex], false)
                        
                    }
                    else if(this.dialogIndex < 2){
                        if(!this.sys.DialogModalPlugin.isAnimating()){
                            this.dialogIndex++;
                            this.AddDialogToScene(this.data.SixthDialog[this.dialogIndex], true)

                        }
                    }
                    else if(this.dialogIndex >= 2){
                        this.sys.DialogModalPlugin.toggleWindow();
                        this.sys.QuestsPlugin.toggleWindow();
                        this.eggsBox.setVisible(false)
                        this.dialogDone = true;
                        this.letPlayerMove = true;
                    }
                }
                
                else if(this.dialogDone && this.questNum == 5){
                    if(this.sys.DialogModalPlugin.isAnimating()){
                        this.pressedOnce  = false;
                        this.AddDialogToScene(this.data.SixthDialog[2], false)
                        this.pressedOnce  = true;

                    }
                    
                    else if(!this.pressedOnce){
                        if(!this.sys.DialogModalPlugin.isAnimating()){
        
                            this.pressedOnce  = true;
                            this.AddDialogToScene(this.data.SixthDialog[2], true)
                        }
                    }
                    else if(!this.sys.DialogModalPlugin.isAnimating() && this.pressedOnce){
                        this.sys.DialogModalPlugin.toggleWindow();
                        this.letPlayerMove = true;
                        this.pressedOnce = false;
                        
                    }
                }
                //#endregion
                
                if(this.questNum == 6 && this.questData.quest6.part == 2 && !this.dialogDone){
                    if(this.sys.DialogModalPlugin.isAnimating()){
                        this.AddDialogToScene(this.data.TenthDialog[this.dialogIndex], false)
                        
                    }
                    else if(this.dialogIndex < 6){
                        if(!this.sys.DialogModalPlugin.isAnimating()){
                            this.dialogIndex++;
                            this.AddDialogToScene(this.data.TenthDialog[this.dialogIndex], true)

                        }
                    }
                    else if(this.dialogIndex >= 6){
                        this.sys.DialogModalPlugin.toggleWindow();
                        this.sys.QuestsPlugin.toggleWindow();
                        
                        this.dialogDone = true;
                        this.letPlayerMove = true;
                    }
                }
                
                this.buttonPressed = true;
            }

            if(this.interactButton.isUp){
                this.buttonPressed = false
            }
        }else{
            this.interactBox.setVisible(false);
            this.textTalk.setVisible(false);
            this.printOnce = false;
        }

        if(this.dialogDone && this.questNum == 6 && this.questData.quest6.part == 2){
            this.interactBox.setVisible(false);
            //this.textTalk.setFill("black")
            this.textTalk.setVisible(false);
            this.letPlayerMove = false;
            this.player.flipX = false;
            if(this.player.x > 150){
                this.questData.quest6.completion = true;
                this.player.x--;
                this.player.anims.play('walk', true)
                this.npc.x--;
            }else if(this.npc.x > 100){
                this.player.anims.stop()
                this.npc.x--;
            }else if(this.npc.x <= 100 && this.player.x > -100){
                this.npc.flipX = true;
                this.player.anims.play('walk', true)
                this.player.x--;
            }else if(this.player.x <= -100 && this.npc.x > -100){
                this.npc.flipX = false;
                this.player.anims.stop()
                this.npc.x--;
            }else if(this.player.x <= -100 && this.npc.x <= -100){
                this.ChangeScene(1)
                
            }
        }

        if(this.dialogDone && !this.printDataOnce){
            this.printDataOnce = true;
        }


        if(!this.questData.quest2.completion){
            if(this.player.x >= 900 && this.alreadyTalked ){
                this.Time(this.npc.x, this.npc.y)

                if(this.firstLoop){
                    this.firstLoop = false
                    this.npc.flipX = true;
                }

                if(this.npc.x <= 900 && this.dialogDone){
                    this.npc.x++
                }

                this.letPlayerMove = false;
                this.player.x++
                //if(this.isMoving == false){
                    this.player.anims.play('walk', true)
                // this.isMoving = true;
                //}
                this.player.flipX = true;

                if(this.player.x > 1000){
                    if(!this.npcStopLaugh){
                        this.npcStopLaugh = true;
                        this.npc.destroy()
                        this.tigerNpc.destroy()
                        this.npc = this.add.sprite(this.npc.x, this.npc.y, 'JulieStanding')
                        this.tigerNpc = this.add.sprite(this.tigerNpc.x, this.tigerNpc.y, 'tigerSprite', 0)
                        this.npc.flipX = true;
                        this.npc.anims.play('idle')
                    }
                    this.npc.x++;
                }

                this.player.setDepth(1)
                this.npc.setDepth(1)
                
            }
        }

        if(this.npc.x >= 1050 && !this.questData.quest2.completion){
            this.questData.quest2.completion = true;
            this.ChangeScene(0)
        }

        if(this.player.x >= 950 && this.questData.quest3.completion && this.questData.quest4.completion && this.questNum != 6){
             
            this.ChangeScene(0)
        }

        if(this.player.x <= 50 && this.questData.quest6.part == 1){
            this.ChangeScene(1)
        }
    }

    ChangeScene(index){
        if(index == 0){
            this.scene.pause()
            this.scene.start('bakeryKitchen', {x: 150, y: 480, quests: this.questData})
            this.scene.bringToTop('bakeryKitchen')
        }else if(index == 1){
            this.scene.start('townScene', {x:-233, y:580, quests: this.questData})

            this.scene.bringToTop('townScene')
        }
    }

    AddDialogToScene(dialog, animate){

        if(!this.pressedOnce){
            this.sys.DialogModalPlugin.toggleWindow();
        }

        this.PrintDialogue(dialog.text,
                            dialog.name, 
                            dialog.spriteSheet, 
                            dialog.imageFrame, animate)

    }

    Time(x, y){
        let timeloop = this.time.addEvent({
            delay: 2000,
            callback: this.ChangeSprite,
            callbackScope: this,
            repeat: 1
        })
    }

    ChangeSprite(){
        //console.log("changing sprite")
        this.npc.destroy()
        this.npc = this.add.sprite(this.npc.x, this.npc.y, 'JulieLaugh').play('laugh')
        this.npc.flipX = true;
        this.spriteIndex--;

        this.tigerNpc.destroy()
        this.tigerNpc = this.add.sprite(this.tigerNpc.x, this.tigerNpc.y, 'tigerSprite', 1)
    }

    PrintDialogue(text, spriteName, spritePic, imageIndex, animate){
        this.letPlayerMove = false
        this.sys.DialogModalPlugin.init(spriteName, spritePic, imageIndex)
        this.sys.DialogModalPlugin._createWindow();
        this.sys.DialogModalPlugin.setText(text, animate)
        
       
    }

    CheckDistance(character, target){
        if(character.x > (target.x - 200) && character.x < (target.x + 200)){
            ////console.log("is this in range? ", "ekide")
            return true;
        }else{
            return false;
        }
    }

    AssignQuest(x, y, textX, textY, quest, setScroll){
        
        this.QuestsPlugin.init();
        this.QuestsPlugin.setText(x, y, textX, textY, quest, setScroll)
    }

    AddJulie(quest){
        this.AssignQuest(850, 100, 740, 70, quest, true)
            this.npc = this.add.sprite(850, 400, 'JulieStanding', 1)
            this.npc.anims.play('idle')

            this.interactBox = this.add.image(this.npc.x, 250, "interactionBox")

            this.textTalk = this.make.text({
                x: this.npc.x,
                y: 250,
                text: "Talk with Julie.",
                origin: {x: 0.5, y: 0.5},
                //color: 0x000000
            })
    }
}