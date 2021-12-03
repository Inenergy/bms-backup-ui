<script>
  import { serialData, chargePercent } from '../stores';
  import StatusLight from '../atoms/StatusLight.svelte';
  import { __ } from '../utils/translator';

  let batStatus,
    FCStatus,
    fanStatus,
    FCTempStatus,
    BMSStatus,
    BMSState = [];

  $: DcDcStatus = $serialData.status.DcDcOn ? 0 : 3;

  serialData.subscribe((data) => {
    getFCStatus(data);
    getFCTempStatus(data);
    getFanStatus(data);
    getBMSStatus(data);
  });

  chargePercent.subscribe(getBatStatus);

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

  function getBatStatus(charge) {
    charge = Number(charge);
    if (charge >= 100 || charge <= 0) batStatus = 3;
    else if (charge > 90 || charge < 10) batStatus = 2;
    else batStatus = 0;
  }

  function getFCStatus(data) {
    if (data.FCCurrent >= data.maxFCCurrent) {
      FCStatus = 3;
    } else if (!data.status.FCOn) {
      FCStatus = 2;
    } else if (
      data.FCVoltage > data.minFCVoltage &&
      data.FCCurrent < data.maxFCCurrent * 0.9
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
        ? temps.reduce((sum, n) => sum + n, 0) / 5 // 1 for mid temp
        : Math.max(...temps); // 0 for max temp
      if (Math.abs(temp - data.stabilizationTemp) > 3) FCTempStatus = 2;
      else FCTempStatus = 0;
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
    <StatusLight status={batStatus} label="battery" />
  </div>
  <div class="column">
    <StatusLight status={FCStatus} label="fc electro" />
  </div>
  <div class="column">
    <StatusLight status={FCTempStatus} label="fc temp" />
  </div>
  <div class="column">
    <StatusLight status={DcDcStatus} label="Dc-Dc" />
  </div>
  <div class="column">
    <StatusLight status={fanStatus} label="fan" />
  </div>
  <div class="column" style="display: flex;">
    <!-- <StatusLight status={$serialData[`BMS${i}On`] ? BMSStatus : 0} /> -->
    {#each BMSState as isOn}
      <StatusLight status={isOn ? BMSStatus : 0} label={'BMS'} />
    {/each}
  </div>
  <div class="column">
    <StatusLight
      status={$serialData.status.wasPurged ? 0 : void 0}
      label="purge"
    />
  </div>
  <div class="column">
    <StatusLight status={$serialData.status.wasCS ? 0 : void 0} label="short" />
  </div>
</div>
