const { writable } = require('svelte/store');
const { SERIAL_DATA } = require('../common/constants');
const { isLoading } = require('./utils/translator');
const client = require('./utils/wsClient');

const initialData = SERIAL_DATA.reduce((a, e) => {
  a[e.name] = 0;
  return a;
}, {});
const serialData = writable(initialData);
const chargePercent = writable(0);
let Ka = 1;
let Kb = 0;

const appInitialized = writable(false);

const localeLoaded = new Promise(
  (resolve) => void isLoading.subscribe((f) => (f ? void 0 : resolve()))
);

const connectionEstablished = new Promise((resolve, reject) => {
  client.once('serial data', resolve);
  client.on('connect_error', reject);
});

Promise.all([localeLoaded, connectionEstablished])
  .then(() => {
    appInitialized.set(true);
  })
  .catch(console.error);

client.on('serial data', (packet) => {
  serialData.update((data) => {
    for (let key in packet) {
      data[key] = packet[key];
    }
    if (
      data.maxBatVoltage != packet.maxBatVoltage ||
      data.minBatVoltage != packet.minBatVoltage
    )
      updateChargeCoefficients(packet.minBatVoltage, packet.maxBatVoltage);
    chargePercent.set(Math.round(packet.batVoltage * Ka + Kb));
    return data;
  });
});

function updateChargeCoefficients(min, max) {
  Ka = 100 / (max - min);
  Kb = -(100 * min) / (max - min);
}

function getValue(store) {
  let $val;
  store.subscribe(($) => ($val = $))();
  return $val;
}

const time = writable('');

client.on('time', time.set);

module.exports = {
  serialData,
  appInitialized,
  getValue,
  time,
  chargePercent,
};
