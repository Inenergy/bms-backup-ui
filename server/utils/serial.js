const Serial = require('serialport');
const { PORT } = require('../globals');
const EventEmitter = require('events');
const parse = require('./serialParser');

const emitter = new EventEmitter();
const serial = new Serial(PORT.name, { baudRate: PORT.baudRate });

serial.on('data', handleData);
let storedBuffer = Buffer.alloc(0);

function handleData(incomingBuffer) {
  if (incomingBuffer.toString('ascii').startsWith('ok')) return;
  storedBuffer = Buffer.concat([storedBuffer, incomingBuffer]);
  if (!(storedBuffer.length % 7)) {
    try {
      emitter.emit('data', parse(storedBuffer));
      storedBuffer = Buffer.alloc(0);
    } catch (e) {
      console.error(e.message);
    }
  }
}

let commandQueue = [];
let portBusy = false;
let failedAttempts = 0;

function sendCommand(id, value) {
  const buf = Buffer.from([0x10, id, value, id + value + 0x10]);
  commandQueue.push(buf);
  if (!portBusy) {
    portBusy = true;
    writeCommandFromQueue();
  }
}

function writeCommandFromQueue() {
  if (!commandQueue.length) {
    portBusy = false;
    return;
  }

  const cmd = commandQueue.shift();

  console.log('Sending command:', cmd);
  serial.write(cmd);

  serial.once('data', (bytes) => {
    console.log('Recieved answer:', bytes);

    if (!bytes.toString('ascii').includes('ok')) {
      if (failedAttempts < 3) {
        commandQueue.unshift(cmd);
        failedAttempts++;
      }
    } else {
      failedAttempts = 0;
      serial.emit('command sent');
    }

    writeCommandFromQueue();
  });
}

function close() {
  if (serial.isOpen) serial.close();
}

emitter.close = close;
emitter.sendCommand = sendCommand;

module.exports = emitter;
