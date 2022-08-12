var QuestsPlugin = function(scene){
    this.scene = scene;
    this.systems = scene.sys

    if(!scene.sys.settings.isBooted){
        scene.sys.events.on('boot', this.boot, this)
    }
}

QuestsPlugin.register = function(PluginManager){
    PluginManager.register('QuestPlugin', QuestsPlugin, 'questPlugin')
}

QuestsPlugin.prototype = {
    boot: function(){
        var eventEmitter = this.systems.events;
        eventEmitter.on('shutdown', this.shutdown, this)
        eventEmitter.on('destroy', this.destroy, this)

    },
    shutdown: function(){
        
    },
    destroy: function(){
        this.shutdown
        this.scene = undefined
    },
    init: function(){

        this.visibility = true;
        this.text;

       
    },
    setText: function(x, y, textX, textY, text, setScroll){

        if(setScroll){
            this.box = this.scene.add.image(x, y, 'questBox').setScale(0.8).setScrollFactor(0)
        

            this.text = this.scene.make.text({
                x: textX,//740,
                y: textY,//70,
                text,
                style: {
                    wordWrap: {width: 250}
                }
            })

            this.text.setScrollFactor(0)
        }else{
            this.box = this.scene.add.image(x, y, 'questBox').setScale(0.8)
        

            this.text = this.scene.make.text({
                x: textX,//740,
                y: textY,//70,
                text,
                style: {
                    wordWrap: {width: 250}
                }
            })
        }
    },
    toggleWindow: function(){
        this.visibility = !this.visibility;
        if(this.text) this.text.visible = this.visibility;
        if(this.box) this.box.visible = this.visibility;
    }
}