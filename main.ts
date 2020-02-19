radio.onReceivedValue(function (name, value) {
    if (outputting == 0) {
        led.plot(2, 2)
    }
    started_tx = 1
    ref_time = input.runningTime()
    if (name == "temp") {
        temp = value
    } else if (name == "acc") {
        acc = value / 1000
    } else {
        if (name == "alt") {
            alt = value
        }
    }
})
radio.onReceivedString(function (receivedString) {
    basic.showString(receivedString)
})
// This send a command to the rocket to make a
//
//
// reference altitude measurement - this is done
//
//
// before launch
input.onButtonPressed(Button.AB, function () {
    outputting = 1
    basic.showNumber(alt)
    outputting = 0
})
// This command to the rocket is used to start
//
//
// reporting temperature, acceleration and altitude
//
//
// with referenced to pre-launch altitude
input.onButtonPressed(Button.B, function () {
    radio.sendNumber(2)
})
// This send a command to the rocket to make a
//
//
// reference altitude measurement - this is done
//
//
// before launch
input.onButtonPressed(Button.A, function () {
    radio.sendNumber(1)
})
let wd_time = 0
let ref_time = 0
let outputting = 0
let started_tx = 0
let alt = 0
let acc = 0
let temp = 0
basic.showString("base")
radio.setGroup(1)
temp = 0
acc = 0
alt = 0
started_tx = 0
radio.setTransmitPower(7)
basic.forever(function () {
    if (started_tx == 1) {
        wd_time = input.runningTime() - ref_time
        if (wd_time >= 1000) {
            basic.showString("tabt!")
        }
    }
})
basic.forever(function () {
    if (wd_time <= 1000) {
        serial.writeLine("")
        serial.writeNumber(temp)
        serial.writeString(",")
        serial.writeNumber(acc)
        serial.writeString(",")
        serial.writeNumber(alt)
        serial.writeLine("")
        led.unplot(2, 2)
    }
})
