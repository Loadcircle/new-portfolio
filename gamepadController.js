export default (
    gamepad, 
    //calbacks object with each function for each joystick direction, each function receive axis value
    joysticksCallbacks = {
        leftHorizontal : (axis)=>console.log(`leftHorizontal joystick moved, axies value : ${axis}`),
        leftVertical : (axis)=>console.log(`leftVertical joystick moved, axies value : ${axis}`),
        rightHorizontal : (axis)=>console.log(`rightHorizontal joystick moved, axies value : ${axis}`),
        rightVertical : (axis)=>console.log(`rightVertical joystick moved, axies value : ${axis}`),
     }, 
    //calbacks object with each function for each button, each function receive button value
    buttonsCallbacks = {
        leftArrowButton : (button)=>console.log('leftArrowButton button pressed' + button),
        rightArrowButton : (button)=>console.log('rightArrowButton button pressed' + button),
        topArrowButton : (button)=>console.log('topArrowButton button pressed' + button),
        bottomArrowButton : (button)=>console.log('bottomArrowButton button pressed' + button),
        L1Button : (button)=>console.log('L1Button button pressed' + button),
        L2Button : (button)=>console.log('L2Button button pressed' + button),
        L3Button : (button)=>console.log('L3Button button pressed' + button),
        R1Button : (button)=>console.log('R1Button button pressed' + button),
        R2Button : (button)=>console.log('R2Button button pressed' + button),
        R3Button : (button)=>console.log('R3Button button pressed' + button),
        rpLeftButton : (button)=>console.log('rpLeftButton button pressed' + button),
        rpRightButton : (button)=>console.log('rpRightButton button pressed' + button),
        rpTopButton : (button)=>console.log('rpTopButton button pressed' + button),
        rpBottomButton : (button)=>console.log('rpBottomButton button pressed' + button),
        touchpadButton : (button)=>console.log('touchpadButton button pressed' + button),
        leftActionButton : (button)=>console.log('leftActionButton button pressed' + button),
        rightActionButton : (button)=>console.log('rightActionButton button pressed' + button),
    })=>{

    for (const [index, axis] of gamepad.axes.entries()) {
        switch (index) {
            case 0: //left joystick horizontal axis
                joysticksCallbacks.leftHorizontal(axis);
                break;
            case 1: //right joystick horizontal axis
                joysticksCallbacks.leftVertical(axis);
                break;
            case 2: //left joystick vertical axis
                joysticksCallbacks.rightHorizontal(axis);
                break;
            case 3: //right joystick vertical axis
                joysticksCallbacks.rightVertical(axis);
                break;
        }
    }
     
    for (const [index, button] of gamepad.buttons.entries()) {
        switch (index) {
            case 0: // button
                buttonsCallbacks.rpBottomButton(button);
                break;
            case 1: // button
                buttonsCallbacks.rpRightButton(button);
                break;
            case 2: // button
                buttonsCallbacks.rpLeftButton(button);
                break;
            case 3: // button
                buttonsCallbacks.rpTopButton(button);
                break;
            case 4: // button
                buttonsCallbacks.L1Button(button);
                break;
            case 5: // button
                buttonsCallbacks.R1Button(button);
                break;
            case 6: // button
                buttonsCallbacks.L2Button(button);
                break;
            case 7: // button
                buttonsCallbacks.R2Button(button);
                break;
            case 8: // button
                buttonsCallbacks.leftActionButton(button);
                break;
            case 9: // button
                buttonsCallbacks.rightActionButton(button);
                break;
            case 10: // button
                buttonsCallbacks.L3Button(button);
                break;
            case 11: // button
                buttonsCallbacks.R3Button(button);
                break;
            case 12: // button
                buttonsCallbacks.topArrowButton(button);
                break;
            case 13: // button
                buttonsCallbacks.bottomArrowButton(button);
                break;
            case 14: // button
                buttonsCallbacks.leftArrowButton(button);
                break;
            case 15: // button
                buttonsCallbacks.rightActionButton(button);
                break;
            case 16: // button
                buttonsCallbacks.touchpadButton(button);
                break;
        }
    }
}