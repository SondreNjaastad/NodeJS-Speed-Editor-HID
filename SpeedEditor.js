var HID = require('node-hid');

class SpeedEditor {
    device;


    constructor() {
        this.device = new HID.HID(7899,55822);


        this.device.write([0x03, 0x02, 0x00, 0x00, 0x00, 0x00, 0xff]);
        this.device.write([0x02, 0x20, 0x00, 0x00, 0x00]);
 
        setInterval(() => {
            this.device.sendFeatureReport([0x06, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]);
            console.log(`-> ${this.toHexString([0x06, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00])}`)
            var report = this.device.getFeatureReport(6, 10);
            console.log(`<- ${this.toHexString(report)}`)

            this.device.sendFeatureReport([0x06, 0x01, 0, 0, 0, 0, 0, 0, 0, 0]);
            console.log(`-> ${this.toHexString([0x06, 0x01, 0, 0, 0, 0, 0, 0, 0, 0])}`)
            var report = this.device.getFeatureReport(6, 10);
            console.log(`<- ${this.toHexString(report)}`)

            this.device.sendFeatureReport([0x06, 0x03, 1, 2, 3, 4, 5, 6, 7, 8]);
            console.log(`-> ${this.toHexString([0x06, 0x03, 1, 2, 3, 4, 5, 6, 7, 8])}`)
            var report = this.device.getFeatureReport(6, 10);
            console.log(`<- ${this.toHexString(report)}`)

            this.device.sendFeatureReport([0x06, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]);
            console.log(`-> ${this.toHexString([0x06, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00])}`)
            var report = this.device.getFeatureReport(6, 10);
            console.log(`<- ${this.toHexString(report)}`)

            console.log("")
        }, 5000);

        this.device.on("data", function(data) {
            console.log(data);
        });
    }

    // 0: SHTL & 0x02, JOG & 0x01, SCRL & 0x04
    btnBank = [0, 0];

    buttonCodes = {
        SHTL: 0x02,
        JOG: 0x01,
        SCRL: 0x04
    }

    toHexString(byteArray) {
        return Array.from(byteArray, function(byte) {
            return (('0' + (byte & 0xFF).toString(16)).slice(-2) + " ").toUpperCase();
        }).join('')
    }

    SetLight = (code, value) => {
        if(value == 1){
            this.btnBank[0] |= code;
        } else if(value == 0) {
            this.btnBank[0] |= (0 && code);
        } else {
            throw('Invalid argument!');
        }

        this.device.write([0x04, this.btnBank[0]]);
    };
};

module.exports = SpeedEditor;