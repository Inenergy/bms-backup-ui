const { SERIAL_DATA } = require('../../common/constants');

function validate(bytes) {
  if (bytes.length != 7) throw new Error('Invalid buffer recieved');
}

function parseErrors(errors) {
  let i = -1;
  return {
    minFcVoltage: Boolean(errors & (2 ** ++i)),
    maxBatVoltage: Boolean(errors & (2 ** ++i)),
    minBatVoltage: Boolean(errors & (2 ** ++i)),
    maxFcTemp: Boolean(errors & (2 ** ++i)),
    minFcTemp: Boolean(errors & (2 ** ++i)),
    thermistor: Boolean(errors & (2 ** ++i)),
  };
}

function parseStatus(status) {
  let result = {};
  result.stabilizationMode = status & 3;
  result.settingMode = (status & 12) >> 2;
  let i = 4;
  result = Object.assign(result, {
    allowCS: Boolean(status & (2 ** ++i)),
    wasPurged: Boolean(status & (2 ** ++i)),
    wasCS: Boolean(status & (2 ** ++i)),
    FCOn: Boolean(status & (2 ** ++i)),
    BMS1On: Boolean(status & (2 ** ++i)),
    BMS2On: Boolean(status & (2 ** ++i)),
    BMS3On: Boolean(status & (2 ** ++i)),
    BMS4On: Boolean(status & (2 ** ++i)),
    DcDcOn: Boolean(status & (2 ** 15)),
  });
  return result;
}

module.exports = function parse(bytes) {
  validate(bytes);
  let packetId = bytes[0];
  let entryIdx =
    packetId < 30 ? ((packetId - 3) / 4) * 3 : ((packetId - 39) / 4) * 6 + 18;
  const parsedBytes = {};
  let i = 1;
  while (i < 7) {
    const entry = SERIAL_DATA[entryIdx];
    let value;
    if (entryIdx === 2) {
      value = parseStatus(bytes.readUInt16BE(i));
      i += 2;
    } else if (entryIdx === 14) {
      value = parseErrors(bytes.readUInt16BE(i));
      i += 2;
    } else if (packetId < 30) {
      value = bytes.readUInt16BE(i) / (entry.divider || 1);
      i += 2;
    } else {
      value = bytes[i] / (entry.divider || 1);
      i += 1;
    }
    parsedBytes[entry.name] = value;
    entryIdx++;
  }
  return parsedBytes;
};
