const { STABILIZATION_MODES } = require('../../common/constants');
module.exports = [
  [
    {
      title: 'fuel cell',
      params: [
        {
          name: 'FCVoltage',
          type: 'info',
          label: 'voltage',
          units: 'V',
          highlight: true,
        },
        {
          name: 'FCCurrent',
          type: 'info',
          label: 'current',
          units: 'A',
          highlight: true,
        },
        {
          name: 'minFCVoltage',
          type: 'input',
          label: 'min voltage',
          units: 'V',
        },
        {
          name: 'maxFCCurrent',
          type: 'input',
          label: 'max current',
          units: 'A',
        },
        {
          name: 'purgeDuration',
          type: 'input',
          label: 'purge duration',
          units: 'ms',
        },
        { name: 'purgeDelay', type: 'input', label: 'purge delay', units: 's' },
        { name: 'purgeShift', type: 'input', label: 'purge shift', units: 's' },
        {
          name: 'CSDuration',
          type: 'input',
          label: 'short duration',
          units: 'ms',
        },
        { name: 'CSDelay', type: 'input', label: 'short delay', units: 's' },
        { name: 'allowCS', type: 'checkbox', label: 'short allowed' },
      ],
    },
  ],
  [
    {
      title: 'temperatures',
      params: [
        { name: 'temp1', type: 'info', label: 'temperature 1', units: 'C' },
        { name: 'temp2', type: 'info', label: 'temperature 2', units: 'C' },
        { name: 'temp3', type: 'info', label: 'temperature 3', units: 'C' },
        { name: 'temp4', type: 'info', label: 'temperature 4', units: 'C' },
        { name: 'temp5', type: 'info', label: 'temperature 5', units: 'C' },
        { name: 'temp6', type: 'info', label: 'air temperature', units: 'C' },
        {
          name: 'minFCTemp',
          type: 'input',
          label: 'min FC temperature',
          units: 'C',
        },
        {
          name: 'maxFCTemp',
          type: 'input',
          label: 'max FC temperature',
          units: 'C',
        },
        {
          name: 'stabilizationMode',
          type: 'select',
          label: 'stabilization mode',
          options: STABILIZATION_MODES.map((label, i) => ({
            label,
            value: i + 1,
          })),
        },
        { name: 'stabilizationTemp', type: 'input', label: 'stabilization temp', units: 'C' },
        {
          name: 'PStabilizationCoefficient',
          type: 'input',
          label: 'P coefficient',
        },
        {
          name: 'IStabilizationCoefficient',
          type: 'input',
          label: 'I coefficient',
        },
        {
          name: 'DStabilizationCoefficient',
          type: 'input',
          label: 'D coefficient',
        },
      ],
    },
    {
      title: 'fan',
      params: [
        {
          name: 'fanLoadCorrective',
          type: 'input',
          units: '%',
          label: 'corrective',
        },
        { name: 'fanRPM', type: 'info', label: 'rpm' },
      ],
    },
  ],
  [
    {
      title: 'fuel line',
      params: [
        { name: 'busPressure', type: 'info', label: 'line pressure', units: 'bar' },
        { name: 'hydrogenPressure', type: 'info', label: 'H2 pressure', units: 'bar' },
        {
          name: 'hydrogenConsumption',
          type: 'info',
          label: 'H2 consumption',
          units: 'l/h',
        },
        {
          name: 'minPressure',
          type: 'input',
          label: 'min pressure',
          units: 'mbar',
        },
        {
          name: 'maxPressure',
          type: 'input',
          label: 'max pressure',
          units: 'mbar',
        },
        {
          name: 'limitPressure',
          type: 'input',
          label: 'limit pressure',
          units: 'mbar',
        },
      ],
    },
    {
      title: 'battery',
      params: [
        {
          name: 'batVoltage',
          type: 'info',
          label: 'voltage',
          units: 'V',
          highlight: true,
        },
        {
          name: 'batCurrent',
          type: 'info',
          label: 'current',
          units: 'A',
          highlight: true,
        },
        {
          name: 'charge',
          type: 'info',
          label: 'charge',
          units: '%',
          highlight: true,
        },
        {
          name: 'minBatVoltage',
          type: 'input',
          label: 'min voltage',
          units: 'V',
        },
        {
          name: 'maxBatVoltage',
          type: 'input',
          label: 'max voltage',
          units: 'V',
        },
        {
          name: 'maxBatCurrent',
          type: 'input',
          label: 'max current',
          units: 'A',
        },
        {
          name: 'minBatVoltageThreshold',
          type: 'input',
          label: 'FC on voltage',
          units: 'V',
        },
        {
          name: 'maxBatVoltageThreshold',
          type: 'input',
          label: 'FC off voltage',
          units: 'V',
        },
      ],
    },
  ],
];
