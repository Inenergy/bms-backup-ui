const parse = require('../utils/serialParser');
const { ERRORS, STATUS, STATUS_MODES } = require('../../common/constants');

test('parses params data correctly', () => {
  const bytes = Buffer.alloc(14);
  bytes[0] = 3;
  bytes.writeUInt16BE(45864, 1);
  bytes.writeUInt16BE(12754, 3);
  bytes.writeUInt16BE(2 ** 16 - 1, 5);
  bytes[7] = 7;
  bytes.writeUInt16BE(345, 8);
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
  expect(parsedBytes.FCVoltage).toBeCloseTo(45.864);
  expect(parsedBytes.FCCurrent).toBeCloseTo(12.754);
  expect(parsedBytes.temp1).toBeCloseTo(34.5);
});

test('parses errors data correctly', () => {
  const bytes = Buffer.alloc(7);
  bytes[0] = 19;
  bytes.writeUInt16BE(45864, 1);
  bytes.writeUInt16BE(1200, 3);
  bytes.writeUInt16BE(2 ** 16 - 1, 5);
  const parsedBytes = parse(bytes);
  const expectedErrors = ERRORS.reduce((obj, key) => {
    obj[key] = true;
    return obj;
  }, {});
  expect(parsedBytes.errors).toEqual(expectedErrors);
  expect(parsedBytes.busPressure).toBeCloseTo(45.864);
  expect(parsedBytes.fanRPM).toBe(1200);
});

test('parses state data correctly', () => {
  const bytes = Buffer.from([
    39, 200, 154, 34, 32, 10, 192, 43, 2, 154, 34, 32, 100, 19,
  ]);
  expect(parse(bytes)).toEqual({
    minFCPressure: 2,
    maxFCPressure: 1.54,
    minFCTemp: 34,
    maxFCTemp: 32,
    purgeDuration: 10,
    purgeValvePressure: 1.92,
    fanLoad: 2,
    CSDuration: 154,
    CSDelay: 34,
    CSShift: 32,
    minBatVoltageThreshold: 10,
    maxBatVoltageThreshold: 1.9,
  });
});
