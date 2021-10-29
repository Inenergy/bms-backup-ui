const EventEmitter = require('events');
const { SERIAL_DATA } = require('../../common/constants');

const emitter = new EventEmitter();

let interval = setInterval(sendData, 1000);

const dataMap = SERIAL_DATA.reduce((a, e) => {
  a[e.name] = 0;
  return a;
}, {});
for (const key in dataMap) dataMap[key] = 0;

dataMap.maxBatVoltage = 100;
dataMap.minBatVoltage = 41;
dataMap.temp5 = 0;
dataMap.maxFCTemp = 1;
dataMap.status = {
  BMS1On: 1,
  BMS2On: 1,
  DcDcOn: 1,
  wasPurged: 1,
  wasCS: 1,
};
dataMap.errors = {
  maxBatVoltage: 1,
};

function sendData() {
  emitter.emit('data', generateData());
}

function generateData() {
  for (const key of [
    'FCVoltage',
    'FCCurrent',
    'batVoltage',
    'fanLoadCorrective',
    'fanLoad',
  ])
    dataMap[key] = +(Math.random() * 100).toFixed(3);
  return dataMap;
}

emitter.sendCommand = (...cmd) => {
  console.log('Sending command to serial:', cmd);
  emitter.emit('command sent');
};

emitter.close = () => {
  emitter.removeAllListeners;
  clearInterval(interval);
};

module.exports = emitter;
