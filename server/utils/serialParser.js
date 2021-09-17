const {
  SERIAL_DATA,
  ERRORS,
  STATUS,
  STATUS_MODES,
} = require('../../common/constants');

function validate(bytes) {
  if (bytes.length % 7) throw new Error('Invalid buffer recieved');
}

function parseErrors(errors) {
  return ERRORS.reduce((obj, key, i) => {
    obj[key] = Boolean(errors & (2 ** i));
    return obj;
  }, {});
}

function parseStatus(status) {
  let result = {};
  STATUS_MODES.forEach((key, i) => {
    result[key] = (status & (4 ** i + 2 ** (2 * i + 1))) >> (2 * i);
  });
  Object.assign(
    result,
    STATUS.reduce((obj, key, i) => {
      obj[key] = Boolean(status & (2 ** (i + 4)));
      return obj;
    }, {})
  );
  return result;
}

function parseChunk(chunk) {
  let packetId = chunk[0];
  let entryIdx =
    packetId < 30 ? ((packetId - 3) / 4) * 3 : ((packetId - 39) / 4) * 6 + 18;
  const parsedBytes = {};
  let i = 1;
  while (i < 7) {
    const entry = SERIAL_DATA[entryIdx];
    let value;
    if (entryIdx === 2) {
      value = parseStatus(chunk.readUInt16BE(i));
      i += 2;
    } else if (entryIdx === 14) {
      value = parseErrors(chunk.readUInt16BE(i));
      i += 2;
    } else if (packetId < 30) {
      value = chunk.readUInt16BE(i) / (entry.divider || 1);
      i += 2;
    } else {
      value = chunk[i] / (entry.divider || 0) + (entry.add || 0);
      i += 1;
    }
    parsedBytes[entry.name] = value;
    entryIdx++;
  }
  return parsedBytes;
}

module.exports = function parse(bytes) {
  validate(bytes);
  const parsedBytes = {};
  const totalChunks = bytes.length / 7;
  for (let i = 0; i < totalChunks; ++i) {
    Object.assign(parsedBytes, parseChunk(bytes.slice(i * 7, (i + 1) * 7)));
  }
  return parsedBytes;
};
