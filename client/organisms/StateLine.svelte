<script>
  import { serialData } from '../stores';
  import StatusLight from '../atoms/StatusLight.svelte';

  let batStatus,
    FCStatus,
    fanStatus,
    FCTempStatus,
    BMSStatus,
    BMSState = [];

  $: DcDcStatus = $serialData.status.DcDcOn ? 0 : 3;

  serialData.subscribe((data) => {
    getBatStatus(data);
    getFCStatus(data);
    getFCTempStatus(data);
    getFanStatus(data);
    getBMSStatus(data);
  });

  function getBMSStatus(data) {
    let counter = 0;
    for (let i = 0; i < 4; ++i) {
      if (data.status[`BMS${i}On`]) counter++;
      BMSState[i] = data.status[`BMS${i}On`];
    }
    if (counter > 2) {
      BMSStatus = 3;
    } else if (counter) {
      BMSStatus = 2;
    } else {
      BMSStatus = 0;
    }
  }

  function getBatStatus(data) {
    const min = Math.ceil(data.minBatVoltage * 10) / 10;
    const max = Math.floor(data.maxBatVoltage * 10) / 10;
    const diff = max - min;
    const minThreshold = min + diff * 0.1;
    const maxThreshold = max - diff * 0.1;
    if (data.batVoltage >= max || data.batVoltage <= min) {
      batStatus = 3;
    } else if (
      data.batVoltage < maxThreshold &&
      data.batVoltage > minThreshold
    ) {
      batStatus = 0;
    } else {
      batStatus = 2;
    }
  }

  function getFCStatus(data) {
    const min = Math.ceil(data.minFCCurrent * 10) / 10;
    const max = Math.floor(data.maxFCCurrent * 10) / 10;
    const diff = max - min;
    const maxThreshold = max - diff * 0.1;
    if (data.FCCurrent >= max) {
      FCStatus = 3;
    } else if (!data.status.FCOn) {
      FCStatus = 2;
    } else if (
      data.FCVoltage > data.minFCVoltage &&
      data.FCCurrent < maxThreshold
    ) {
      FCStatus = 0;
    }
  }

  function getFCTempStatus(data) {
    const temps = Array(5)
      .fill(0)
      .map((_, i) => data['temp' + (i + 1)]);
    if (
      temps.some((temp) => temp < data.minFCTemp) ||
      temps.some((temp) => temp > data.maxFCTemp)
    ) {
      FCTempStatus = 3;
    } else if (data.status.stabilizationMode != 2) {
      const temp = data.status.stabilizationMode
        ? Math.max(...temps)
        : temps.reduce((sum, n) => sum + n, 0) / 5;
      if (Math.abs(temp - data.stabilizationTemp) <= 3) FCTempStatus = 0;
      else batStatus = 2;
    }
  }

  function inRange(value, range) {
    return value < range[1] && value > range[0];
  }

  function loadToRPMRange(load) {
    // TODO
    return [-Infinity, Infinity];
  }

  function getFanStatus(data) {
    if (!data.fanRPM) {
      fanStatus = 2;
    } else if (!inRange(data.fanRPM, loadToRPMRange(data.fanLoad))) {
      fanStatus = 3;
    } else {
      fanStatus = 0;
    }
  }
</script>

<div class="row">
  <div class="column">
    <label for="bat-state">АКБ</label>
    <StatusLight status={batStatus} />
  </div>
  <div class="column">
    <label for="fc-state">ТЭ ЭЛ</label>
    <StatusLight status={FCStatus} />
  </div>
  <div class="column">
    <label for="fc-temp-state">ТЭ Темп</label>
    <StatusLight status={FCTempStatus} />
  </div>
  <div class="column">
    <label for="dcdc-state">Dc-Dc</label>
    <StatusLight status={DcDcStatus} />
  </div>
  <div class="column">
    <label for="fan-state">Вентилятор</label>
    <StatusLight status={fanStatus} />
  </div>
  <div class="column">
    <label for="bms-state">BMS</label>
    {#each BMSState as isOn}
      <!-- <StatusLight status={$serialData[`BMS${i}On`] ? BMSStatus : 0} /> -->
      <StatusLight status={isOn ? BMSStatus : 0} />
    {/each}
  </div>
  <div class="column">
    <label for="fan-state">Продувка</label>
    <StatusLight status={$serialData.status.wasPurged || undefined} />
  </div>
  <div class="column">
    <label for="fan-state">Закоротка</label>
    <StatusLight status={$serialData.status.wasCS || undefined} />
  </div>
</div>
