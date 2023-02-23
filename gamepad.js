let letprint = true;
const ball = document.querySelector('#ball');
window.addEventListener('gamepadconnected', (event) => {
    const update = () => {
        const output = document.getElementById('axes');
        output.innerHTML = ''; // clear the output

        const gamepad = navigator.getGamepads()[0];
        if (!gamepad) return null;        
        if(letprint){
            console.log(gamepad);
            letprint = false;
        }
        for (const [index, axis] of gamepad.axes.entries()) {

            if(index == 0){
                ball.style.left = (axis*180)+'px';
            }
            if(index == 1){
                ball.style.top = (axis*180)+'px';
            }



            output.insertAdjacentHTML('beforeend',
            `<label>${index}
                <progress value=${axis * 0.5 + 0.5}></progress>
                </label>`);
        }

        for (const [index, button] of gamepad.buttons.entries()) {
            output.insertAdjacentHTML('beforeend',
              `<label>${index}
                 <progress value=${button.value}></progress>
                 ${button.touched ? 'touched' : ''}
                 ${button.pressed ? 'pressed' : ''}
               </label>`);
          }

        requestAnimationFrame(update);
    };
    update();
  });