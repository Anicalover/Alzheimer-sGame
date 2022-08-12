//import  machina  from "/machina.js"
//import { createmachine, interpret } from "xstate"


export default class Behaviors {

    constructor(){

        const charService = interpret(characterMachine)

        const characterMachine = createMachine({
            id: "character",
            initial: "idle",
            states:{
                idle:{
                    on: {
                        WALK: {
                            target: "walk",
                           // actions: "setAnimation"
                        }
                    }
                },
                walk:{
                    on: {
                        IDLE: {
                            target: "idle",
                           // actions: "setAnimation"
                        }
                    }
                }
            }
        },
        {
            actions: {
                setAnimation: (context, event) => {
                    //console.log(event)
                }
            }
        })

        charService.start();

        document.addEventListener('keydown', e=>{
            if(e.keyCode == 65){
                charService.send({type: "WALK"})
                //console.log("Walking left on behavior")
            }
        })
        
    }
}