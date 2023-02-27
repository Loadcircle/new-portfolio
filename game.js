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
        const joysticksCallbacks = this.controlActions.joysticksCallbacks;
        const buttonsCallbacks = this.controlActions.buttonsCallbacks;
        const gamepad = navigator.getGamepads()[0];
        gamepadController(gamepad, joysticksCallbacks, buttonsCallbacks);
        this.animationFrame = requestAnimationFrame(()=>this.animation());
    }


    //char animations
    get controlActions(){
        return {
            joysticksCallbacks: {
                leftHorizontal : (axis)=>this.movementAction(axis),
            },
            buttonsCallbacks : {
                rpBottomButton: (button)=>this.jumpAction(button),
                rpLeftButton: (button)=>this.attackAction(button),
            }
        }
    }
    movementAction(axis){
        if(axis < 0.1 && axis > - 0.1){
            this.samuari.classList.remove('walk', 'run');            
        }else if(axis < -0.6 || axis > 0.6){
            this.samuari.classList.add('run');
        }
        else{
            this.samuari.classList.add('walk');
        }

        this.setDirection(axis);
    }
    setDirection(axis){
        const position = this.samuari.dataset.position || 0;
        if(axis < -0.1){
            this.samuraiDirection.style.transform = 'scaleX(-1)';
            // if(position < 0){
            //     this.samuari.style.transform = `translateX(${position+1}px)`;
            //     this.samuari.dataset.position = position+1;
            // }
        }else if(axis > 0.1){
            this.samuraiDirection.style.transform = 'scaleX(1)';           
            console.log(position)
            if(position <= 0){
                this.samuari.style.transform = `translateX(${position+0.1}px)`;
                this.samuari.dataset.position = position-0.1;
            }
        }
    }
    jumpAction(button){
        if(!button.pressed) return null
        if(this.inAnimation) return null;
        this.toggleClass('jump');
    }
    attackAction(button){
        if(!button.pressed) return null
        if(this.inAnimation) return null;
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