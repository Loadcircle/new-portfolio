import gamepadController from './gamepadController';

class CharacterController{
    constructor(){
        this.samuari = document.querySelector('.samuari');
        this.samuraiDirection = document.querySelector('.samuraiDirection');
        this.inAnimation = false;
        this.init();
    }
    init(){        
        window.addEventListener('gamepadconnected', () => {
            this.gamepadConnected();
        });

        window.addEventListener('gamepaddisconnected', ()=>{
            if(this.animationFrame) cancelAnimationFrame(this.animationFrame);
        });
    }
    gamepadDisconnected(){
        console.log('gamepad disconnected');
        if(this.animationFrame) cancelAnimationFrame(this.animationFrame);
    }
    gamepadConnected(){
        console.log('gamepad connected');       
        this.animation(); 
    }
    animation(){
        const gamepad = navigator.getGamepads()[0];
        gamepadController(gamepad);
        this.animationFrame = requestAnimationFrame(()=>this.animation());
    }


    //char animations
    get controlActions(){
        return {
            joysticksCallbacks: {
                leftVertical : this.movementAction,
            },
            buttonsCallbacks : {
                rpBottomButton: this.jumpAction,
                rpLeftButton: this.attackAction,
            }
        }
    }
    movementAction(axis){
        console.log(axis)
    }
    jumpAction(button){
        if(this.inAnimation) return null;
        console.log(button);
        this.toggleClass('jump');
    }
    attackAction(button){
        if(this.inAnimation) return null;
        console.log(button);
        this.toggleClass('attack');
    }

    toggleClass(value){
        this.samuari.classList.add(value);
        this.inAnimation = true;
        setTimeout(()=>{
            this.samuari.classList.remove(value);
            this.inAnimation = false;
        }, 1000);
    }
}

const characterController = new CharacterController();
console.log(characterController);