 enum ButtonText {
    "START",
    "SELECT",
    "PAD_UP",
    "PAD_DOWN",
    "PAD_LEFT",
    "PAD_RIGHT",
    "TRIANGLE",
    "CROSS",
    "SQUARE",
    "CIRCLE",
    "L1",
    "R1",
    "L2",
    "R2",
    "L3",
    "R3"
}

let X = ButtonText.PAD_DOWN

basic.showString(X.toString())

//basic.showString(ButtonText["L2"].toString());

let keys = Object.keys(X);

for (let button of keys) {

    basic.showString(button)
}