export default class BakeryKitchen extends Phaser.Scene{
    constructor() {
        super('bakeryKitchen')
    }

    //#region World Variables
    player;
    moveRight;
    moveLeft;
    moveRight2;
    moveLeft2;
    npc;
    hasSponge;
    index;
    mudArr = [];
    interact;
    mudCollected;
    indexUsed = []
    indexDestroyed
    maxIndex
    direction
    buttonPressed;
    buttonsPressed;
    dialogDone;
    dialogIndex;
    letPlayerMove;
    firstPart;
    playerPos;
    questsData;
    questNum;
    itemsArray;
    startMinigame;
    printItem;
    food;
    notClicked;
    alreadyDisabled;
    addedItem;
    foodIndex;
    maxDialogIndex;
    askForItem;
    finishedMinigame;
    bg;
    cakeDone;
    settingIteractive
    disableIteractive
    julieEInteractive
    julieDInteractive
    arrowArray =[];
    interactBox;
    textTalk;
    foodArrow;
    selectArrow;
    fourthDialogDone
    foodImage
    notSayingHey;
    movementText;
    //#endregion

    preload(){
        this.mudArr = [];
        this.indexUsed = [];
        this.load.scenePlugin({key:'DialogModalPlugin', url:'plugins/dialog_plugin.js'});
        this.load.scenePlugin({key: 'QuestsPlugin', url: 'plugins/dialog_plugin.js'})

    }

    init(data){
        this.playerPos = {x: data.x, y: data.y}
        this.questData = data.quests;
    }

    create(){
        //#region Minigame Variables
        this.itemsArray = [
           {name: "flour", anim: 'pourFlour', taken: false, poured: false},
           {name: "butter", anim: 'pourButter', taken: false, poured: false}, 
           {name: "eggs", anim: 'pourEggs', taken: false, poured: false}, 
           {name: "milk", anim: 'pourMilk', taken: false, poured: false},
           {name: "sugar", anim: 'pourSugar', taken: false, poured: false }, 
           {name: "vanilla", anim: 'pourVanilla', taken: false, poured: false}
        ];
        this.notSayingHey = true;
        this.startMinigame = false;
        this.fourthDialogDone  =false;
        this.printItem = true;
        this.notClicked = true;
        this.alreadyDisabled = false;
        this.addedItem = false;
        this.foodIndex = 0;
        this.maxDialogIndex = 4;
        this.askForItem = false;
        this.finishedMinigame = false;
        this.settingIteractive = false;
        this.disableIteractive = true;
        this.julieEInteractive = false;
        this.julieDInteractive = true;
        //#endregion

        //#region Dialog and Plugin Variables
        this.buttonPressed = false;
        this.firstPart = false;
        this.buttonsPressed = 0;
        this.dialogIndex = -1;
        this.dialogDone = false;
        this.letPlayerMove = false;
        this.data = this.cache.json.get('dialog')
        this.plugins.install('DialogModalPlugin')
        //#endregion

        //#region player and cleaning variables
        this.direction = "left"
        this.index = 0
        this.hasSponge = true;
        this.mudCollected = 0;
        this.indexDestroyed = false;
        this.maxIndex = 9

        this.moveLeft = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
        this.moveRight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
        this.interact = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
        this.moveRight2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
        this.moveLeft2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        //#endregion

        let pour1 = this.anims.create({ key: "pourFlour",
            frames: this.anims.generateFrameNumbers('flourAnim'),
            frameRate: 10,
            repeat: 0
        })

        let pour2 = this.anims.create({ key: "pourButter",
            frames: this.anims.generateFrameNumbers('butterAnim'),
            frameRate: 10,
            repeat: 0
        })

        let pour3 = this.anims.create({ key: "pourEggs",
            frames: this.anims.generateFrameNumbers('eggsAnim'),
            frameRate: 10,
            repeat: 3
        })

        let pour4 = this.anims.create({ key: "pourVanilla",
            frames: this.anims.generateFrameNumbers('vanillaAnim'),
            frameRate: 10,
            repeat: 0
        })

        let pour5 = this.anims.create({ key: "pourMilk",
            frames: this.anims.generateFrameNumbers('milkAnim'),
            frameRate: 10,
            repeat: 0
        })

        let pour6 = this.anims.create({key: "pourSugar",
            frames: this.anims.generateFrameNumbers('sugarAnim'),
            frameRate: 10,
            repeat: 0
        })

        //Angry anim
        let angry = this.anims.create({
            key: 'angry',
            frames: this.anims.generateFrameNumbers('angryJulie'),
            frameRate: 4,
            repeat: -1,
            delay: 1000
        })

        //Startled anim
        let startled = this.anims.create({
            key: 'startled',
            frames: this.anims.generateFrameNumbers('startledMar'),
            frameRate: 16,
            repeat: 0,
            delay: 2000,
        })
        
        if(!this.questData.quest3.completion){
            this.questNum = 3;
            this.add.image(700, 300, 'dirtyKitchen')
            
            for(let i = 0; i < 10; i++)
            {
                let posX = Phaser.Math.Between(300, 1300);
                let posY = Phaser.Math.Between(350, 450);
                this.mudArr.push(this.add.image(posX, posY, 'dirt', Phaser.Math.Between(0, 1)).setScale(0.6))
                this.arrowArray.push(this.add.sprite(posX, posY - 50, 'selectAnim').play('arrowAnim').setScale(0.2))
            }

            this.npc2 = this.add.sprite(600, 400, 'happyMar').setScale(0.7).play('startled')
            this.npc = this.add.sprite(150, 370, 'JulieStand').play('idle')
            this.npc.flipX = true;
            this.player = this.add.sprite(210, 390, 'astherSprite', 0).setScale(0.5)

            this.sys.DialogModalPlugin.toggleWindow();
            this.dialogIndex++;
            this.WriteDialog(this.data.ThirdDialog[this.dialogIndex], true, true)
            this.interactBox = this.add.image(this.npc.x + 175, 230, "interactionBox")
            this.selectArrow = this.add.sprite(30, 200, ' selectAnim').play('arrowAnim').setScale(0.3)

            this.textTalk = this.make.text({
                x: this.npc.x + 175,
                y: 230,
                text: "Hey...",
                origin: {x: 0.5, y: 0.5},
                //color: 0x000000
            })

            this.selectArrow.setVisible(false)
            this.interactBox.setVisible(false)
            this.textTalk.setVisible(false)
            this.Time();
        }
        else if(!this.questData.quest5.completion)
        {
            
            this.questNum = 5
            this.add.image(700, 300, 'minigameKitchen')
            this.cakeDone = this.add.image(1000, 270, 'cookiePan').setScale(0.4)
            this.npc = this.add.sprite(150, 370, 'JulieStand').play('idle')
            this.npc.flipX = true;
            this.foodArrow = this.add.sprite(800,250, 'selectAnim').play('arrowAnim').setScale(0.3)
            this.foodImage = this.add.image(50, 50, 'flour').setScale(0.3)
            
            this.player = this.add.sprite(210, 390, 'astherSprite', 0).setScale(0.5)


            this.movementText = this.make.text({
                x: 200,
                y: 80,
                text: "When Julie asks you for the items, go look for the items, once you are near the item you may click on it to retrieve it. After retrieving the item you have to go back to Julie and click her to give her the item. (You must be close to Julie to give her the item.",
                origin: {x: 0.5, y: 0.5},
                style: {
                    wordWrap: { width: 300}
                }
            })
    
            this.movementText.setColor("#000000")
            this.movementText.setShadow(2, 2, "#000000", 5);
            this.movementText.setShadowFill(true)
            this.movementText.setScrollFactor(0)
            this.bg = this.add.rectangle(500, 300, 2500, 800, 0x000000)
            this.cakeDone.visible = false;
            this.bg.visible = false;
            this.foodImage.setVisible(false)
            this.foodArrow.setVisible(false)

            this.sys.DialogModalPlugin.toggleWindow()
            this.dialogIndex++;
            this.WriteDialog(this.data.SeventhDialog[this.dialogIndex], true, true)
        }

        this.cameras.main.fadeIn(1000, 0, 0, 0)


        
    }

    update(){
        //#region Movement
        //Check if the player is pressing the 
        //Button for moving to the right ('D')
        //and move accordingly.
        if(this.moveRight.isDown && this.letPlayerMove 
        || this.moveRight2.isDown && this.letPlayerMove){
            if(this.player.x < 1500){
                this.player.x += 5;
                if(this.isMoving == false){
                    this.player.anims.play('walk');
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
                if(this.isMoving == false){
                    this.player.anims.play('walk')
                    this.isMoving = true;
                }
                this.player.x -= 5;

                if(this.direction == "right"){
                    this.player.flipX = false
                    this.direction = "left"
                }
            }
        }else{
            this.isMoving = false;
            //this.player.anims.stop();
            this.player.setTexture("astherSprite", 0)
        }
        //#endregion

        //Check if the player is within the range of
        //needing the camera to move with them.
        if(this.player.x >= 500 && this.player.x <= 960){
            
            this.cameras.main.startFollow(this.player, true)
            this.cameras.main.height = 780;
        }else{
            this.cameras.main.stopFollow();
        }

        //Checks if the first part of the dialog, 
        //when quest 3 is not done, is done.
        if(this.dialogIndex == 3 && this.firstPart){
            this.npc2.x+= 3;
            if(this.npc2.x > 1100){
                this.dialogIndex++;
                this.npc2.destroy()
            }
        }

        if(this.npc.x > 1000 && this.notSayingHey){
            this.notSayingHey = false
            this.interactBox = this.add.image(this.npc.x + 175, 230, "interactionBox")
            this.selectArrow = this.add.sprite(30, 200, ' selectAnim').play('arrowAnim').setScale(0.3)

            this.textTalk = this.make.text({
                x: this.npc.x + 175,
                y: 230,
                text: "Hey...",
                origin: {x: 0.5, y: 0.5},
                //color: 0x000000
            })
        }

        if(this.interact.isDown && !this.buttonPressed){


            //Dialog when quest 3 (kitchen clean) is not done yet.
            if(!this.dialogDone && !this.questData.quest3.completion){
                    if(this.sys.DialogModalPlugin.isAnimating() ){
                        this.sys.DialogModalPlugin.toggleWindow();
                        this.WriteDialog(this.data.ThirdDialog[this.dialogIndex], false, true)
                        
                        this.letPlayerMove = false;
                    
                    }
                    else if(this.dialogIndex >= 5 || this.dialogIndex == 3){
                        
                        if(this.dialogIndex >= 5){
                            this.sys.DialogModalPlugin.toggleWindow();
                            this.dialogDone = true;
                            this.letPlayerMove = true;
                            this.AssignQuest(850, 100, 740, 70, this.questData.quest3.quest, true)
                        }else if(this.dialogIndex == 3 && this.npc2.x > 1100){
                            this.dialogIndex++;
                        }  
                    }
                    else if(this.dialogIndex < 5){
                        if(!this.sys.DialogModalPlugin.isAnimating()){
                            if(this.dialogIndex == 3 && this.npc2.x > 1100){
                                this.sys.DialogModalPlugin.toggleWindow();
                                this.dialogIndex++;
                                this.WriteDialog(this.data.ThirdDialog[this.dialogIndex], true, true)
                            }
                            if(this.dialogIndex < 3 || this.dialogIndex > 3 ){
                                this.sys.DialogModalPlugin.toggleWindow();
                                this.dialogIndex++;
                                this.WriteDialog(this.data.ThirdDialog[this.dialogIndex], true, true)

                                if(this.dialogIndex == 3){
                                    this.firstPart = true
                                }
                            }

                            this.letPlayerMove = false;
                        }
                    }
                    
                
            }

            //Dialog once the quest 3 (kitchen clean) is done.
            if(this.questData.quest3.completion && !this.questData.quest4.completion && this.CheckDistance(this.player, this.npc)){
                if(this.sys.DialogModalPlugin.isAnimating() ){
                        this.sys.DialogModalPlugin.toggleWindow(); 
                             
                        this.PrintDialogue(this.data.FourthDialog[this.dialogIndex].text,
                                            this.data.FourthDialog[this.dialogIndex].name, 
                                            this.data.FourthDialog[this.dialogIndex].spriteSheet, 
                                            this.data.FourthDialog[this.dialogIndex].imageFrame, false, true)
                    
                    this.letPlayerMove = false;
                
                }
                else if(this.dialogIndex < 1){
                    if(!this.sys.DialogModalPlugin.isAnimating()){
                        this.interactBox.setVisible(false)
                        this.textTalk.setVisible(false)
                        this.dialogIndex++;

                        if(this.dialogIndex == 1){
                            this.sys.DialogModalPlugin.toggleWindow();
                        }
                        this.PrintDialogue(this.data.FourthDialog[this.dialogIndex].text,
                                            this.data.FourthDialog[this.dialogIndex].name, 
                                            this.data.FourthDialog[this.dialogIndex].spriteSheet, 
                                            this.data.FourthDialog[this.dialogIndex].imageFrame, true, true)
                        
                        this.letPlayerMove = false;
                    }
                }
                else if(this.dialogIndex >= 1 ){
                    
                    this.sys.DialogModalPlugin.toggleWindow();
                    this.selectArrow.setVisible(true)
                    this.fourthDialogDone = true;
                    this.dialogIndex--;
                    this.dialogDone = true;
                    this.letPlayerMove = true;
                    this.AssignQuest(850, 100, 740, 70, this.questData.quest4.quest, true)
                    
                }
    
            }

            //Dialog Seven, explaining the minigame that will take place.
            if(!this.dialogDone && this.questNum == 5){
                if(this.sys.DialogModalPlugin.isAnimating() ){
                    this.sys.DialogModalPlugin.toggleWindow();
                    this.WriteDialog(this.data.SeventhDialog[this.dialogIndex], false, true)
                    
                    this.letPlayerMove = false;
                
                }
                else if(this.dialogIndex >= 2){
                    this.sys.DialogModalPlugin.toggleWindow();
                    this.dialogDone = true;
                    this.letPlayerMove = true;
                    this.AssignQuest(850, 100, 740, 70, this.questData.quest5.quest, true)
                    this.startMinigame = true;
                }
                else if(this.dialogIndex < 2){
                    if(!this.sys.DialogModalPlugin.isAnimating()){
                        
                        this.dialogIndex++;

                        this.sys.DialogModalPlugin.toggleWindow();
                        

                        this.WriteDialog(this.data.SeventhDialog[this.dialogIndex], true, true)
                        this.letPlayerMove = false;
                    }
                }
            }

            if(this.questNum == 5 && this.dialogDone && this.startMinigame && this.npc.x > 1000){
                this.interactBox.setVisible(false)
                this.textTalk.setVisible(false)
                if(this.sys.DialogModalPlugin.isAnimating() ){
                    this.sys.DialogModalPlugin.toggleWindow();
                    this.WriteDialog(this.data.SeventhDialog[this.dialogIndex], false, true)
                    
                    this.letPlayerMove = false;
                
                }
                else if(this.dialogIndex >= this.maxDialogIndex){
                    this.sys.DialogModalPlugin.toggleWindow()
                    //this.sys.DialogModalPlugin.toggleWindow()
                    this.dialogDone = true;
                    this.letPlayerMove = true;
                    this.AssignQuest(850, 100, 740, 70, this.questData.quest5.quest, true)
                    this.startMinigame = false;
                    this.printItem = false;
                }
                else if(this.dialogIndex < this.maxDialogIndex){
                    if(!this.sys.DialogModalPlugin.isAnimating()){
                        this.sys.DialogModalPlugin.toggleWindow()
                        this.dialogIndex++;
                        this.WriteDialog(this.data.SeventhDialog[this.dialogIndex], true, true)
                        this.letPlayerMove = false;
                    }
                }
                
            }

            if(this.finishedMinigame){

                //console.log("finished minigame")
                //console.log("entering ekide")
                if(this.sys.DialogModalPlugin.isAnimating() ){
                    this.sys.DialogModalPlugin.toggleWindow();
                    this.WriteDialog(this.data.EightDialog[this.dialogIndex], false, true)
                    
                    this.letPlayerMove = false;
                
                }
                else if(this.dialogIndex >= 2){
                    this.sys.DialogModalPlugin.toggleWindow()
                    this.add.image(50, 50, 'cookieSprite').setScrollFactor(0)
                    this.questData.quest5.completion = true;
                    this.letPlayerMove = true
                    this.AssignQuest(850, 100, 740, 70, this.questData.quest6.quest, true)
                }
                else if(this.dialogIndex < 2){
                    if(!this.sys.DialogModalPlugin.isAnimating()){
                        this.interactBox.setVisible(false)
                        this.textTalk.setVisible(false)
                        this.sys.DialogModalPlugin.toggleWindow()
                        this.dialogIndex++;
                        this.WriteDialog(this.data.EightDialog[this.dialogIndex], true, true)
                        this.letPlayerMove = false;
                    }
                }
                
            }

            

            this.buttonPressed = true;
            
        }

        //writing down what should go next
            
            //Set a timer to start
            //Once those are done, spawn the flour that julie is asking for.
            //after that, the player has to bring julie the item
            // so she can pour it in the bowl
            // repeat until all the ingredients are done and the player wins 
            // if the player fails to do it in the time frame determined,
            // they will have to start from the beggining and will be teleported 
            // to the bakery scene scene.
            //An option to add is to let the player be able to choose if they want 
            //to restart or quit.
        //#region Doing quest number 5: Minigame
        if(this.questNum == 5){

            if(!this.finishedMinigame){
                if(!this.printItem && this.itemsArray[5].poured == false){
                    //console.log(this.itemsArray[this.foodIndex])
                    //console.log(this.foodIndex)
                    this.food = this.add.sprite(Phaser.Math.Between(250, 1000), 310, this.itemsArray[this.foodIndex].name)
                    this.foodImage = this.add.image(50, 50, this.itemsArray[this.foodIndex].name).setScrollFactor(0)
                    this.foodArrow.x = this.food.x;
                    this.foodArrow.y = this.food.y - 50;
                    this.printItem = true;
                    this.settingIteractive = false
                    this.foodArrow.setVisible(true)
                    this.foodImage.setVisible(false)
                    this.food.on('pointerdown', () => this.DestroyFlour())    
                }        

                if(!this.itemsArray[this.foodIndex].taken){
                    if(this.food && this.player.x < (this.food.x + 100) && this.player.x > (this.food.x - 100)){
                        if(!this.settingIteractive){
                            //console.log("huh?!!? ekide")
                            this.food.setInteractive()
                            this.settingIteractive = true;
                            this.disableIteractive = false;
                        }
                    }
                    else{
                        if(!this.disableIteractive){
                            //console.log("disabling huh?!?! ekide")
                            this.food.disableInteractive()
                            this.settingIteractive = false;
                            this.disableIteractive = true;
                        }
                    }
                }
        
                if(this.itemsArray[this.foodIndex].taken){
                    if(this.player.x < (this.npc.x + 100) && this.player.x > (this.npc.x - 100)){
                        if(!this.julieEInteractive){
                            //console.log("setting interactive ekide")
                            this.npc.setInteractive()
                            this.julieEInteractive = true;
                            this.julieDInteractive = false;
                        }
                    }else{
                        if(!this.julieDInteractive){
                            //console.log("disable interactive ekide")
                            this.npc.disableInteractive()
                            this.julieEInteractive = false;
                            this.julieDInteractive = true;
                        }
                    }
                }

                if(!this.notClicked && !this.alreadyDisabled){
                    this.alreadyDisabled = true;
                    this.npc.disableInteractive();
                    //console.log("disabling")
                }
        
                if(this.dialogDone ){
                    if(this.npc.x < 1000){
                        this.npc.x++;
                    }else if(this.npc.x == 1000){
                        this.npc.x++;
                        this.npc.flipX = false
        
                    }
                }  
            }
            
        }
        //#endregion

        
        //Change the button press to false 
        //once the player is not pressing the 
        //button
        if(this.interact.isUp){
            this.buttonPressed = false;
        }

        //Check if the player is able to clean the mud.
        if(!this.questData.quest3.completion){
            if(this.hasSponge && this.dialogDone){
                if(this.index < this.maxIndex){
                    this.index++
                }else{
                    this.index = 0;
                }

                if(this.mudCollected < 10){
                    if((this.player.x <= this.mudArr[this.index].x + 25) &&
                    (this.player.x >= this.mudArr[this.index].x - 25) &&
                    this.interact.isDown ){
                        this.arrowArray[this.index].destroy()
                        this.mudArr[this.index].destroy()
                        this.arrowArray.splice(this.index, 1)
                        this.mudArr.splice(this.index, 1)
                        this.mudCollected++;
                        this.maxIndex--;
                    }
                }
                

            }

            //Check if all mud was collected
            if(this.mudCollected == 10){
                this.npc.destroy();
                this.dialogIndex = -1
                this.sys.QuestsPlugin.toggleWindow();
                this.questData.quest3.completion = true;
                this.npc = this.add.sprite(this.npc.x, this.npc.y, 'JulieStand').play('idle')
                this.npc.flipX = true
                this.mudCollected = 11;   
                this.interactBox.setVisible(true)
                this.textTalk.setVisible(true)
                //console.log(this.mudCollected, this.buttonPressed, "ekide mud?")
            }
        }

        

        //Let the player change scene
        if(this.questNum == 3){
            if(this.questData.quest3.completion && this.dialogDone){
                if(this.player.x <= 100 && this.fourthDialogDone){
                    this.ChangeScene()
                }
                
            }
        }
        else if(this.questNum == 5){
            if(this.questData.quest5.completion){
                if(this.player.x <= 100){
                    this.ChangeScene()
                }
                
            }
        }
        
    }

    DestroyFlour(){
        this.food.destroy();
        this.foodArrow.setVisible(false)
        this.foodImage.setVisible(true);
        this.itemsArray[this.foodIndex].taken = true;

        //console.log("setting julie to interactive")
                
                
        this.npc.on('pointerdown', 
        () => this.PlayFlourAnim(this.itemsArray[this.foodIndex].name, 
                                    this.itemsArray[this.foodIndex].anim))
    }

    ResetFood(){
        this.food.destroy();
        this.foodImage.setVisible(false)
        this.foodImage.destroy()
        this.addedItem = false;
        this.notClicked = true;
        this.printItem = false;
        this.alreadyDisabled = false;

        //console.log(this.askForItem, "ekide item")

        if(this.askForItem && this.questNum == 5 ){
            
            if(this.maxDialogIndex >= 9){
                //console.log("finishing dialog")
                this.sys.DialogModalPlugin.toggleWindow();
                this.letPlayerMove = true;
                this.finishedMinigame = true;
                this.dialogIndex = -1;
                this.startMinigame = false;
                this.movementText.setVisible(false)
                
                this.bg.visible = true;

                let timeLoop = this.time.addEvent({
                    delay: 400,
                    callback: this.ShowCake,
                    callbackScope: this,
                    repeat: 0
                })
                let disableBg = this.time.addEvent({
                    delay: 2100,
                    callback: this.DisableBg,
                    callbackScope: this,
                    repeat: 0
                })
                this.tweens.add({
                    targets: this.bg,
                    alpha: { from: 1, to: 0 },
                    ease: 'Sine.InOut',
                    duration: 2000,
                    repeat: 0,
                    yoyo: false
                  });
            }
            else if(this.dialogIndex <= this.maxDialogIndex){
                if(!this.sys.DialogModalPlugin.isAnimating()){
                    this.sys.DialogModalPlugin.toggleWindow()
                    this.dialogIndex++;
                    this.WriteDialog(this.data.SeventhDialog[this.dialogIndex], true, true)
                    this.letPlayerMove = true
                }
            }
        }
        
        this.itemsArray[this.foodIndex].poured = true
        this.foodIndex++;
        if(this.maxDialogIndex < 9){
            this.maxDialogIndex++;
        }
        this.askForItem = true;
    }

    PlayFlourAnim(sprite, animName){

        this.foodImage.setVisible(false)
        //console.log("playing animation ")
        if(!this.addedItem){
            //console.log("spawining flour ekide")
            this.notClicked = false;

            this.food = this.add.sprite(930, 225, sprite).play(animName)
            this.addedItem = true;
            this.askForItem = true;


            let timeLoop = this.time.addEvent({
                delay: 1200,
                callback: this.ResetFood,
                callbackScope: this,
                repeat: 0
            })
        }
        
    }

    Time(){
        let timeLoop = this.time.addEvent({
            delay: 500,
            callback: this.ChangeSprite,
            callbackScope: this,
            repeat: 0
        })
    }

    ShowCake(){
        this.cakeDone.visible = true;
    }

    DisableBg(){
        this.interactBox = this.add.image(this.npc.x + 175, 230, "interactionBox")
        this.selectArrow = this.add.sprite(30, 200, ' selectAnim').play('arrowAnim').setScale(0.3)

        this.textTalk = this.make.text({
            x: this.npc.x + 175,
            y: 230,
            text: "Hey...",
            origin: {x: 0.5, y: 0.5},
            //color: 0x000000
        })
        this.bg.visible = false;
    }

    //Print dialog in the scene
    PrintDialogue(text, spriteName, spritePic, imageIndex, animate, isScrolling){
        this.letPlayerMove = false;
        this.sys.DialogModalPlugin.init(spriteName, spritePic, imageIndex, isScrolling)
        this.sys.DialogModalPlugin.setHeight(480, 488)
        this.sys.DialogModalPlugin._createWindow(isScrolling);
        this.sys.DialogModalPlugin.setText(text, animate, isScrolling, 440, 380)
        
    }

    //Change the sprite of a character (Julie)
    ChangeSprite(){
        this.npc.destroy()
        this.npc = this.add.sprite(this.npc.x, this.npc.y, 'JulieStand').play('angry')
        this.npc.flipX = true;
    }

    //Change between scenes 
    ChangeScene(){
        this.scene.start('bakeryScene', {x: 900, y: 480, quest: this.questData})
    }

    CheckDistance(character, target){
        if(character.x > (target.x - 200) && character.x < (target.x + 200)){
            ////console.log("is this in range? ", "ekide")
            return true;
        }else{
            return false;
        }
    }

    //Write the dialog in the scene
    WriteDialog(jsonDialog, animate, scrolling){
        //this.sys.DialogModalPlugin.toggleWindow();
        // if(animate){        
        //     this.dialogIndex++;
        // }
        this.PrintDialogue(jsonDialog.text,
                            jsonDialog.name, 
                            jsonDialog.spriteSheet, 
                            jsonDialog.imageFrame, animate, scrolling)
        
        
    }

    //Assign a Quest and show it in the screen
    AssignQuest(x, y, textX, textY, quest, setScroll){
        
        this.QuestsPlugin.init();
        this.QuestsPlugin.setText(x, y, textX, textY, quest, setScroll)
    }
}