const SpeedEditor = require('./SpeedEditor');

var device = new SpeedEditor();

device.SetLight(device.buttonCodes.SCRL, 1);
device.SetLight(device.buttonCodes.JOG, 0);
device.SetLight(device.buttonCodes.SHTL, 1);