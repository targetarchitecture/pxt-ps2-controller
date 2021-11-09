namespace TargetArchitecture.PS2 {

    let topics: string[] = ["ps2/sticks/left", "ps2/sticks/right", "ps2/buttons", "ps2/rumble"];
    let btns: string[] = ["START", "SELECT", "PAD_UP", "PAD_DOWN", "PAD_LEFT", "PAD_RIGHT", "TRIANGLE", "CROSS", "SQUARE", "CIRCLE", "L1", "R1", "L2", "R2", "L3", "R3"];

    export const enum Buttons {
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

    /**
     * Connect the PS2 controller
    */
    //% subcategory="PS2"
    //% block="Connect the PS2 controller"
    //% weight=30
    export function connectController() {
        for (let topic of topics) {
            RainbowSparkleUnicorn.IoT.listen(topic);
        }
    }

    const PS2_CONTROLLER_BUTTON_PRESSED_ANY = 6009;
    const PS2_CONTROLLER_BUTTON_PRESSED = 6010;
    //... 16 Buttons to 6026 


    /**
    * Process the PS2 MQTT messages
    * @param topic of the MQTT message
    * @param message the MQTT message
    */
    //% subcategory="PS2"
    //% block="process MQTT message for topic %topic with content %message"
    //% weight=65
    export function processNewMQTTMessage(topic: string, message: string) {

        if (topic.includes("ps2/buttons")) {
            //button topic
            for (let pin = 0; pin < btns.length; pin++) {
                let btn = btns[pin];
                if (message.includes(btn)) {
                    control.raiseEvent(PS2_CONTROLLER_BUTTON_PRESSED + pin, pin + pinOffset)
                    control.raiseEvent(PS2_CONTROLLER_BUTTON_PRESSED_ANY, pin + pinOffset)
                }
            }
        }
    }


    /**
 * Do something when a switch is pushed.
 * @param btn the controller button to be checked
 * @param handler body code to run when the button is pressed
 */
    //% subcategory="PS2"
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
    //% subcategory="PS2"
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