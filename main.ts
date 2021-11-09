
namespace TargetArchitecture.PS2 {

    let topics: string[] = ["ps2/sticks/left", "ps2/sticks/right", "ps2/buttons", "ps2/rumble", "ps2/info", "ps2/ip", "ps2/dial", "ps2/error"];

    export declare const enum Buttons {
        //% block="START"
        START = 0,
        //% block="SELECT"
        SELECT = 1,
        //% block="PAD_UP"
        PAD_UP = 2,
        //% block="PAD_DOWN"
        PAD_DOWN = 3,
        //% block="PAD_LEFT"
        PAD_LEFT = 4,
        //% block="PAD_RIGHT"
        PAD_RIGHT = 5,
        //% block="TRIANGLE"
        TRIANGLE = 6,
        //% block="CROSS"
        CROSS = 7,
        //% block="SQUARE"
        SQUARE = 8,
        //% block="CIRCLE"
        CIRCLE = 9,
        //% block="L1"
        L1 = 10,
        //% block="R1"
        R1 = 11,
        //% block="L2"
        L2 = 12,
        //% block="R2"
        R2 = 13,
        //% block="L3"
        L3 = 14,
        //% block="R3"
        R3 = 15
    }

    let pinOffset = 1000;

    export function connectController() {
        for (let topic of topics) {
            RainbowSparkleUnicorn.IoT.listen(topic);
        }
    }

    export const PS2_CONTROLLER_BUTTON_PRESSED_ANY = 6009;
    export const PS2_CONTROLLER_BUTTON_PRESSED = 6010;
    //... 16 Buttons to 6026 

    export function processNewMQTTMessage(message: string) {
        if (message.includes("PAD_LEFT")) {
            control.raiseEvent(PS2_CONTROLLER_BUTTON_PRESSED + pin, pin + pinOffset)
            control.raiseEvent(PS2_CONTROLLER_BUTTON_PRESSED_ANY, pin + pinOffset)

        }
    }



    /**
 * Do something when a switch is pushed.
 * @param btn the controller button to be checked
 * @param handler body code to run when the button is pressed
 */
    //% subcategory="Button"
    //% block="on button %btn"
    //% weight=65
    export function onPressed(
        btn: Buttons,
        handler: () => void
    ) {
        control.onEvent(
            PS2_CONTROLLER_BUTTON_PRESSED + btn,
            EventBusValue.MICROBIT_EVT_ANY,
            () => {
                handler();
            }
        );

    }

    /**
* Do something when any button is pressed.
* @param handler body code to run when any button is pressed
*/
    //% subcategory="Button"
    //% block="on any any button"
    //% weight=65
    export function onAnyPressed(
        handler: (btn: Buttons) => void
    ) {
        control.onEvent(
            PS2_CONTROLLER_BUTTON_PRESSED_ANY,
            EventBusValue.MICROBIT_EVT_ANY,
            () => {
                handler(control.eventValue() - pinOffset);
            }
        );
    }

}