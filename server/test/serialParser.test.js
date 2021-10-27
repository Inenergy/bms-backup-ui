const parse = require('../utils/serialParser');
const { ERRORS, STATUS, STATUS_MODES } = require('../../common/constants');

test('calculates check sum correctly', () => {
  const bytes = Buffer.alloc(7);
  const numbers = [3, 45864, 12754];
  const sum = numbers[1] + numbers[2];
  bytes[0] = numbers[0];
  bytes.writeUInt16BE(numbers[1], 1);
  bytes.writeUInt16BE(numbers[2], 3);
  bytes.writeUInt16BE(sum, 5);
  const parsedBytes = parse(bytes);
  expect(parsedBytes.FCVoltage).toBeCloseTo(45.864);
  expect(parsedBytes.FCCurrent).toBeCloseTo(12.754);
});

test('parses params data correctly', () => {
  const bytes = Buffer.alloc(14);
  const rawValues = [7, 2 ** 16 - 1, 345, 11, 567, 432];
  bytes[0] = 7;
  bytes.writeUInt16BE(rawValues[1], 1);
  bytes.writeUInt16BE(rawValues[2], 3);
  bytes.writeUInt16BE((rawValues[1] + rawValues[2]) % (256 ** 2), 5);
  bytes[7] = 11;
  bytes.writeUInt16BE(rawValues[4], 8);
  bytes.writeUInt16BE(rawValues[5], 10);
  bytes.writeUInt16BE((rawValues[4] + rawValues[5]) % (256 ** 2), 12);
  const parsedBytes = parse(bytes);
  const expectedStatus = STATUS_MODES.reduce((obj, key) => {
    obj[key] = 3;
    return obj;
  }, {});
  Object.assign(
    expectedStatus,
    STATUS.reduce((obj, key) => {
      obj[key] = true;
      return obj;
    }, {})
  );
  expect(parsedBytes.status).toEqual(expectedStatus);
  expect(parsedBytes.temp1).toBeCloseTo(34.5);
});

test('parses errors data correctly', () => {
  const bytes = Buffer.alloc(7);
  const rawValues = [31, 256 ** 2 - 1, 0];
  bytes[0] = 31;
  bytes.writeUInt16BE(2 ** 16 - 1, 1);
  bytes.writeUInt16BE(rawValues[1] % (256 ** 2), 5);
  const parsedBytes = parse(bytes);
  const expectedErrors = ERRORS.reduce((obj, key) => {
    obj[key] = true;
    return obj;
  }, {});
  expect(parsedBytes.errors).toEqual(expectedErrors);
});


test('parses state data correctly', () => {
  const bytes = Buffer.from([
    39, 200, 154, 34, 32, 1, 164, 43, 192, 2, 154, 34, 1, 126,
  ]);
  expect(parse(bytes)).toEqual({
    minPressure: 2000,
    maxPressure: 1540,
    minFCTemp: 34,
    maxFCTemp: 32,
    purgeDuration: 1920,
    purgeDelay: 2,
    limitPressure: 1540,
    fanLoad: 34,
  });
});