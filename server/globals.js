const path = require('path');

const IS_RPI = process.platform === 'linux' && process.arch == 'arm';

exports.isPi = IS_RPI;

exports.PORT = {
  name: IS_RPI ? '/dev/serial0' : 'COM17',
  baudRate: 230400,
};

exports.CONFIG_PATH = path.join(__dirname, '..', 'config');