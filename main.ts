let avoiding = 0
let LFSR = 0
let LFSL = 0
function avoid_function () {
    hard_right()
    maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, 50)
    basic.pause(200)
    while (avoiding) {
        if (maqueen.Ultrasonic(PingUnit.Centimeters) < 20) {
            maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 50)
        } else {
            SoftLeft()
        }
        if (maqueen.readPatrol(maqueen.Patrol.PatrolLeft) == 0 || maqueen.readPatrol(maqueen.Patrol.PatrolRight) == 0) {
            avoiding = 0
            hard_right()
        }
    }
}
function hard_right () {
    maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 50)
    maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CCW, 50)
    basic.pause(200)
}
function SoftRight () {
    maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 25)
    maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 60)
}
function SoftLeft () {
    maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 25)
    maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 60)
}
basic.forever(function () {
    if (maqueen.Ultrasonic(PingUnit.Centimeters) < 15) {
        avoiding = 1
        avoid_function()
    }
    LFSR = maqueen.readPatrol(maqueen.Patrol.PatrolRight)
    LFSL = maqueen.readPatrol(maqueen.Patrol.PatrolLeft)
    if (LFSL == 0 && LFSR == 0) {
        maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, 60)
    } else if (LFSL == 0) {
        SoftLeft()
    } else if (LFSR == 0) {
        SoftRight()
    } else {
        maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, 60)
    }
})
