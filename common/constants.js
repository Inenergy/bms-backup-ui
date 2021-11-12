const STATE_DATA = [
  { name: 'minPressure', divider: 0.1 },
  { name: 'maxPressure', divider: 0.1 },
  { name: 'minFCTemp', signed: true },
  { name: 'maxFCTemp', signed: true },
  { name: 'purgeDelay' },
  { name: 'purgeDuration', divider: 0.1 },
  { name: 'limitPressure', divider: 0.1 },
  { name: 'fanLoad' },
  { name: 'CSDuration' },
  { name: 'CSDelay' },
  { name: 'CSShift' },
  { name: 'minBatVoltageThreshold', divider: 10, add: 40 },
  { name: 'maxBatVoltageThreshold', divider: 10, add: 40 },
  { name: 'maxFCCurrent' },
  { name: 'minFCVoltage' },
  { name: 'stabilizationTemp' },
  { name: 'minBatVoltage', divider: 10, add: 40 },
  { name: 'maxBatVoltage', divider: 10, add: 40 },
  { name: 'PStabilizationCoefficient', divider: 100 },
  { name: 'IStabilizationCoefficient', divider: 100 },
  { name: 'DStabilizationCoefficient', divider: 100 },
  { name: 'fanLoadCorrective', signed: true },
  { name: 'maxBatCurrent', divider: 2 },
  { name: 'currentStabilizationTemp' },
];

const PARAMS_DATA = [
  {
    name: 'FCVoltage',
    divider: 1000,
  },
  {
    name: 'FCCurrent',
    divider: 1000,
  },
  {
    name: 'status',
  },
  { name: 'temp1', divider: 10, signed: true },
  { name: 'temp2', divider: 10, signed: true },
  { name: 'temp3', divider: 10, signed: true },
  { name: 'temp4', divider: 10, signed: true },
  { name: 'temp5', divider: 10, signed: true },
  { name: 'temp6', divider: 10, signed: true },
  {
    name: 'batVoltage',
    divider: 1000,
  },
  {
    name: 'batCurrent',
    divider: 100,
    signed: true,
  },
  {
    name: 'hydrogenPressure',
    divider: 1000,
    signed: true,
  },
  { name: 'busPressure', divider: 1000, signed: true },
  {
    name: 'fanRPM',
  },
  { name: 'errors' },
  { name: 'reserve' },
  { name: 'reserve' },
  { name: 'reserve' },
];

const STATUS = [
  'allowCS',
  'wasPurged',
  'wasCS',
  'FCOn',
  'BMS0On',
  'BMS1On',
  'BMS2On',
  'BMS3On',
  'reserve',
  'reserve',
  'reserve',
  'DcDcOn',
];

const STATUS_MODES = ['stabilizationMode', 'operationMode'];

const ERRORS = [
  'minFcVoltage',
  'maxBatVoltage',
  'minBatVoltage',
  'maxFcTemp',
  'minFcTemp',
  'thermistor',
  'FCCurrent',
  'FCLowPressure',
  'FCHighPressure',
  'FCLimit',
  'FCError',
  'maxBatCurrent',
  'batError',
];

const INPUTS = {
  operationMode: {
    constraints: [0, 2],
  },
  allowCS: {
    constraints: [0, 1],
  },
  purgeDelay: {
    constraints: [1, 200],
  },
  purgeDuration: {
    constraints: [20, 400],
    step: 10,
    multiplier: 0.1,
  },
  stabilizationMode: {
    constraints: [1, 3],
  },
  maxFCCurrent: {
    constraints: [0, 100],
    step: 0.5,
    multiplier: 2,
  },
  minFCVoltage: {
    constraints: [0, 100],
    step: 0.5,
    multiplier: 2,
  },
  stabilizationTemp: {
    constraints: [20, 80],
  },
  minFCTemp: {
    constraints: [-40, 60],
  },
  maxFCTemp: {
    constraints: [0, 100],
  },
  minPressure: {
    constraints: [0, 2500],
    multiplier: 0.1,
    step: 50,
  },
  maxPressure: {
    constraints: [0, 2500],
    multiplier: 0.1,
    step: 50,
  },
  minBatVoltage: {
    constraints: [40, 65],
    step: 0.1,
    multiplier: 10,
    subtract: 40,
  },
  maxBatVoltage: {
    constraints: [40, 65],
    step: 0.1,
    multiplier: 10,
    subtract: 40,
  },
  CSDuration: {
    constraints: [0, 200],
  },
  CSDelay: {
    constraints: [0, 100],
  },
  CSShift: {
    constraints: [0, 100],
  },
  PStabilizationCoefficient: {
    constraints: [0, 2.5],
    step: 0.05,
    multiplier: 100,
  },
  IStabilizationCoefficient: {
    constraints: [0, 2.5],
    step: 0.05,
    multiplier: 100,
  },
  DStabilizationCoefficient: {
    constraints: [0, 2.5],
    step: 0.05,
    multiplier: 100,
  },
  fanLoadCorrective: {
    constraints: [-100, 100],
  },
  minBatVoltageThreshold: {
    constraints: [40, 65],
    step: 0.1,
    multiplier: 10,
    subtract: 40,
  },
  maxBatVoltageThreshold: {
    constraints: [40, 65],
    step: 0.1,
    multiplier: 10,
    subtract: 40,
  },
  maxBatCurrent: {
    constraints: [0, 100],
    step: 0.5,
    multiplier: 2,
  },
  limitPressure: {
    constraints: [0, 2500],
    multiplier: 0.1,
  },
};

let i = 0;
for (let key in INPUTS) {
  INPUTS[key].id = ++i * 4;
}

const SERIAL_DATA = [...PARAMS_DATA, ...STATE_DATA];

const OPERATION_MODES = ['Авто', 'Только АКБ', 'Только ТЭ'];

const STABILIZATION_MODES = [
  'По верхней t',
  'По средней t',
  'Стаб откл, вент макс',
];

module.exports = {
  PARAMS_DATA,
  STATE_DATA,
  SERIAL_DATA,
  INPUTS,
  STABILIZATION_MODES,
  OPERATION_MODES,
  ERRORS,
  STATUS,
  STATUS_MODES,
};
