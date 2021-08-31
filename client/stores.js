const { writable, derived } = require('svelte/store');
const { SERIAL_DATA } = require('../common/constants');
const { isLoading } = require('./utils/translator');
const client = require('./utils/wsClient');

const initialData = SERIAL_DATA.reduce((a, e) => {
  a[e.name] = 0;
  return a;
}, {});
const serialData = writable(initialData);

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
    return data;
  });
});

function getValue(store) {
  let $val;
  store.subscribe(($) => ($val = $))();
  return $val;
}

let elapsed = 0,
  timeStart;

const elapsedStore = derived(serialData, (d) => {
  if (d.start.value) {
    if (!timeStart) timeStart = Date.now();
    elapsed = Math.round((Date.now() - timeStart) / 1000);
  } else {
    timeStart = 0;
    elapsed = 0;
  }
  return elapsed;
});

module.exports = {
  serialData,
  appInitialized,
  getValue,
  elapsed: elapsedStore,
};
