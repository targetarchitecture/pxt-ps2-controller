
namespace TargetArchitecture.PS2 {

    let topics: string[] = ["ps2/sticks/left", "ps2/sticks/right", "ps2/buttons", "ps2/rumble", "ps2/info", "ps2/ip", "ps2/dial", "ps2/error"];

    export declare const enum Buttons {
        //% block="Pin 0"
        P0 = 0,
        //% block="Pin 1"
        P1 = 1,
        //% block="Pin 2"
        P2 = 2,
        //% block="Pin 3"
        P3 = 3,
        //% block="Pin 4"
        P4 = 4,
        //% block="Pin 5"
        P5 = 5,
        //% block="Pin 6"
        P6 = 6,
        //% block="Pin 7"
        P7 = 7,
        //% block="Pin 8"
        P8 = 8,
        //% block="Pin 9"
        P9 = 9,
        //% block="Pin 10"
        P10 = 10,
        //% block="Pin 11"
        P11 = 11,
        //% block="Pin 12"
        P12 = 12,
        //% block="Pin 13"
        P13 = 13,
        //% block="Pin 14"
        P14 = 14,
        //% block="Pin 15"
        P15 = 15
    }

    export function connectController() {
        for (let topic of topics) {
            RainbowSparkleUnicorn.IoT.listen(topic);
        }
    }

    export function processNewMQTTMessage(message: string) {
        if (message.includes("PAD_LEFT")) {
        }
    }
}