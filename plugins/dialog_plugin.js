var conversations;

var DialogModalPlugin = function (scene){
    this.scene = scene;
    this.systems = scene.sys;

    if(!scene.sys.settings.isBooted){
        scene.sys.events.once('boot', this.boot, this)
    }
}

DialogModalPlugin.register = function (PluginManager){
    PluginManager.register('DialogModalPlugin', DialogModalPlugin, 'dialogModal');
}

DialogModalPlugin.prototype = {
    boot: function(){
        var eventEmitter = this.systems.events;
        eventEmitter.on('shutdown', this.shutdown, this);
        eventEmitter.on('destroyDialog', this.destroyDialog, this)
    },
    shutdown: function() {
        //if(this.timedEvent) this.timedEvent.remove();
        if(this.text) this.text.destroy()
    },
    destroyDialog: function(){
        this.shutdown();
        this.scene = undefined;
    }, 
    init: function(name, charImage, imageIndex, isScrolling, opts) {
        if (!opts) opts = {};

        this.borderThickness = opts.borderThickness || 3;
        this.borderColor = opts.borderColor || 0x907748;
        this.borderAlpha = opts.borderAlpha || 1;
        this.windowAlpha = opts.windowAlpha || 0.8;
        this.windowColor = opts.windowColor || 0x303030;
        this.windowHeight = opts.windowHeight || 150;
        this.padding = opts.padding || 32;
        this.closeBtnColor = opts.closeBtnColor || 'darkgoldenrod';
        this.dialogSpeed = opts.dialogSpeed || 3;
        this.boxColor = opts.boxColor || 0xffffff;
        this.name = opts.name || name;

       

        this.usedDialog = []
        this.eventCounter = 0;
        this.visible = true;

        this.charSprite;
        this.charImage = charImage
        this.imageIndex = imageIndex
        this.text;
        this.printName;
        this.dialogBox;
        this.animating;
        this.height = 440;
        this.charHeight = 448;
        this.nameHeight = 400;

        this.dialog;
        this.graphics;
        this.closeBtn

        //this._createWindow(isScrolling);
    }, 
    setHeight: function(height, charHeight, nameHeight){
        this.height = height;
        this.charHeight = charHeight;
        this.nameHeight = nameHeight
    },
    _getGameWidth: function(){
        return this.scene.sys.game.config.width;
    },

    _getGameHeight: function(){
        return this.scene.sys.game.config.height
    },

    _calculateWindowDimensions: function (width, height){
        var x = this.padding;
        var y = height - this.windowHeight - this.padding;

        var rectWidth = width - (this.padding * 2);
        var rectHeight = this.windowHeight;

        return{
            x,
            y,
            rectWidth,
            rectHeight
        };
    },
    _createInnerBox: function(x, y, rectWidth, rectHeight){
        this.graphics.fillStyle(this.boxColor)
        this.graphics.fillRect(x * 2, y + 12, rectWidth/7, rectHeight/1.2)
        
    },
    _createInnerWindow: function (x, y, rectWidth, rectHeight){
        this.graphics.fillStyle(this.windowColor, this.windowAlpha)
        this.graphics.fillRect(x + 45, y - 37, rectWidth/7, rectHeight/4)
        this.graphics.fillStyle(this.windowColor, this.windowAlpha);
        this.graphics.fillRect(x + 1, y + 1, rectWidth - 1, rectHeight - 1);
    },

    _createOuterWindow: function (isScrolling, x, y, rectWidth, rectHeight){
        // this.graphics.lineStyle(this.borderThickness, this.borderColor, this.borderAlpha)
        // this.graphics.strokeRect(x + 45, y - 37, rectWidth/7, rectHeight/4)
        // this.graphics.lineStyle(this.borderThickness, this.borderColor, this.borderAlpha)
        // this.graphics.strokeRect(x, y, rectWidth, rectHeight);
        if(isScrolling){
            this.dialogBox = this.scene.add.image(500, this.height, 'dialogBox').setScrollFactor(0)//540
            this.charSprite = this.scene.add.image(155, this.charHeight, this.charImage, this.imageIndex).setScale(0.5).setScrollFactor(0)//548
        }else{
            this.dialogBox = this.scene.add.image(500, 480, 'dialogBox').setScrollFactor(0)
            this.charSprite = this.scene.add.image(155, 488, this.charImage, this.imageIndex).setScale(0.5).setScrollFactor(0)
        }

    },
    _createCloseModalButton: function(){
        var self = this;

        this.closeBtn = this.scene.make.text({
            x: this._getGameWidth() - this.padding - 14,
            y: this._getGameHeight() - this.windowHeight - this.padding + 3,
            text: 'X',
            style: {
                font: 'bold 12px Arial',
                fill: this.closeBtnColor
            }
        })

        // this.closeBtn.setInteractive()

        // this.closeBtn.on('pointerover', function(){
        //     this.setTint(0xff0000)
        // })

        // this.closeBtn.on('pointerout', function(){
        //     this.clearTint()
        // })

        // this.closeBtn.on('pointerdown', function(){
        //     self.toggleWindow()
        // })

        // if(self.timedEvent) self.timedEvent.remove()
        // if(self.text) self.text.destroy()
    },
    _createModalButtonBorder: function(){
        var x = this._getGameWidth() - this.padding - 20
        var y = this._getGameHeight() - this.windowHeight - this.padding
        this.graphics.strokeRect(x, y, 20, 20)        
    },
    toggleWindow: function(){
        //console.log("destroying")
        this.visible = !this.visible
        // if (this.text) this.text.visible = this.visible
        // if(this.dialogBox) this.dialogBox.visible = this.visible
        // if(this.charSprite) this.charSprite.visible = this.visible
        // if(this.printName) this.printName.visible = this.visible
        // if (this.graphics) this.graphics.visible = this.visible

        if(this.text) this.text.destroy()
        if(this.dialogBox) this.dialogBox.destroy()
        if(this.charSprite) this.charSprite.destroy()
        if(this.printName) this.printName.destroy()
        if (this.graphics) this.graphics.destroy()
    },
    setText: async function(text, animate, isScrolling, textHeight, nameHeight){
        this.eventCounter = 0;
        this.dialog = text.split('')  

        if(this.timedEvent) this.timedEvent.remove();

        var tempText = animate ? '' : text;
        this._setText(tempText, this.name, isScrolling, textHeight, nameHeight)

        if(animate){
            this.timedEvent = this.scene.time.addEvent({
                delay: 150 - (this.dialogSpeed * 30),
                callback: this._animateText,
                callbackScope: this,
                loop: true
            })
        }else{
            this.animating = false;
        }

    },
    _animateText: function(){
        this.eventCounter++;

        this.text.setText(this.text.text + this.dialog[this.eventCounter - 1])
        if(this.eventCounter == this.dialog.length){
            this.animating = false;
            this.timedEvent.remove();
        }else{
            this.animating = true;
        }
        
    },
    isAnimating: function(){
        return this.animating
    },
    _setText:  function(text, name, isScrolling,  textHeight, nameHeight){

        if(this.text) this.text.destroy()

        var x = this.padding + 230
        var y = this._getGameHeight() - this.windowHeight - this.padding + 20

        var name = this.name
        var nameX = this.padding + 95
        var nameY = this._getGameHeight() - this.windowHeight - this.padding - 35

        this.printName = this.scene.make.text({
            x: nameX,
            y: nameY,
            text: name,
            style: {
                font: 'bold 30px Arial',
                fill: 0x433E40
            }
        })

        //const tkm = convers.Asther[0].text;
        ////console.log(tkm, " ekide")

        this.text = this.scene.make.text({
            x,
            y,
            text,
            style: {
                wordWrap: {width: this._getGameWidth() - (this.padding * 2) - 245}
            }
        })

        if(isScrolling){
            this.printName.y = nameHeight;
            this.text.y = textHeight
            this.printName.setScrollFactor(0)
            this.text.setScrollFactor(0)
        }
    },

    _createWindow: function(isScrolling){
        var gameHeight = this._getGameHeight();
        var gameWidth = this._getGameWidth();
        var dimensions = this._calculateWindowDimensions(gameWidth, gameHeight)
        this.graphics = this.scene.add.graphics();

        this._createOuterWindow(isScrolling, dimensions.x, dimensions.y, dimensions.rectWidth, dimensions.rectHeight)
        // this._createInnerWindow(dimensions.x, dimensions.y, dimensions.rectWidth, dimensions.rectHeight)
        // this._createInnerBox(dimensions.x, dimensions.y, dimensions.rectWidth, dimensions.rectHeight)
        // this._createCloseModalButton();
        // this._createModalButtonBorder();

    }
}