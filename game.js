import gamepadController from './gamepadController';

class CharacterController{
    constructor(){
        this.samurai = document.querySelector('.samurai');
        this.samuraiDirection = document.querySelector('.samuraiDirection');
        this.walkSpeed = 0.3;
        this.runSpeed = 0.8;
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
        this.setDirection(axis);
        if(this.inAnimation) return null;
        if(axis < 0.2 && axis > - 0.2){
            this.samurai.classList.remove('walk', 'run');            
        }else if(axis < -0.7 || axis > 0.7){
            this.samurai.classList.add('run');
            this.samurai.classList.remove('walk');
        }
        else{
            this.samurai.classList.add('walk');
            this.samurai.classList.remove('run');
        }
    }
    setDirection(axis){
        const position = Number(this.samuraiDirection.dataset.position) || 0;
        if(axis < -0.2){
            this.samurai.style.transform = 'scaleX(-1)';
            if(position >= 0){
                const speed = axis < -0.7 ? this.runSpeed : this.walkSpeed;
                const nPosition = position-speed;


                this.samuraiDirection.style.transform = `translateX(${nPosition}px)`;
                this.samuraiDirection.dataset.position = nPosition;
            }
        }else if(axis > 0.2){
            this.samurai.style.transform = 'scaleX(1)';       
            
            if(position <= 500){
                const speed = axis > 0.7 ? this.runSpeed : this.walkSpeed;
                const nPosition = position+speed;
                this.samuraiDirection.style.transform = `translateX(${nPosition}px)`;
                this.samuraiDirection.dataset.position = nPosition;
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
        this.samurai.classList.add(value);
        this.inAnimation = true;
        setTimeout(()=>{
            this.samurai.classList.remove(value);
            this.inAnimation = false;
        }, 1000);
    }
}

const characterController = new CharacterController();
console.log(characterController);