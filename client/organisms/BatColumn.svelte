<script>
  import { serialData, chargePercent } from '../stores';
  import { STABILIZATION_MODES } from '../../common/constants';
  import Input from '../molecules/NumericInput.svelte';
  import sendSerialCommand from '../utils/inputHandler';
  import { __ } from '../utils/translator';

  const stabilizationOptions = STABILIZATION_MODES.map((name, i) => ({
    name,
    value: i + 1,
  }));

  $: stabilizationMode = $serialData.status.stabilizationMode;

  function changeStablizationMode(e) {
    const { name, value } = e.currentTarget;
    sendSerialCommand(name, +value);
  }

  const limitsRow = [
    { name: 'minBatVoltage', label: 'min voltage', units: 'V' },
    { name: 'maxBatVoltage', label: 'max voltage', units: 'V' },
    { name: 'maxBatCurrent', label: 'max current', units: 'A' },
  ];

  const voltageThresholdRow = [
    { name: 'minBatVoltageThreshold', label: 'FC on threshold voltage', units: 'V' },
    { name: 'maxBatVoltageThreshold', label: 'FC off threshold voltage', units: 'V' },
  ];

  const coefficientsRow = [
    { name: 'PStabilizationCoefficient', label: 'P' },
    { name: 'IStabilizationCoefficient', label: 'I' },
    { name: 'DStabilizationCoefficient', label: 'D' },
  ];

  const tempLimitsRow = [
    { name: 'minFCTemp', label: 'min', units: 'C' },
    { name: 'maxFCTemp', label: 'max', units: 'C' },
  ];
</script>

<h2>{$__('battery')}</h2>
<div class="row">
  <div class="column">
    <span class="emphasize">{$serialData.batVoltage.toFixed(2)}{$__('V')}</span>
  </div>
  <div class="column">
    <span class="emphasize">{$serialData.batCurrent.toFixed(2)}{$__('A')}</span>
  </div>
  <div class="column">
    <span class="emphasize">{$chargePercent}%</span>
  </div>
</div>
<div class="row">
  {#each limitsRow as input}
    <div class="column">
      <Input attrs={input} />
    </div>
  {/each}
</div>

<div class="row">
  {#each voltageThresholdRow as input}
    <div class="column column-33">
      <Input attrs={input} />
    </div>
  {/each}
</div>

<div class="row">
  <div class="column">
    <strong>{$__('fan')} {$serialData.fanLoad}% + </strong>
    <Input
      attrs={{
        label: ``,
        units: '%',
        name: 'fanLoadCorrective',
      }}
    />
  </div>
  <div class="column">
    {$serialData.fanRPM}
    {$__('rpm', false)}
  </div>
</div>

<div class="row">
  <div class="column">{$__('stabilization coefficient')}</div>
  {#each coefficientsRow as input}
    <div class="column column-25">
      <Input attrs={input} />
    </div>
  {/each}
</div>

<div class="row">
  <label>
    {$__('stabilization mode')}
    <select name="stabilizationMode" on:change={changeStablizationMode}>
      {#each stabilizationOptions as option}
        <option
          value={option.value}
          selected={option.value == stabilizationMode}>{option.name}</option
        >
      {/each}
    </select>
  </label>
</div>

<div class="row">
  <div class="column">{$__('FC temperature limits')}</div>
  {#each tempLimitsRow as input}
    <div class="column column-33">
      <Input attrs={input} />
    </div>
  {/each}
</div>

<style>
  .emphasize {
    font-size: 3.2em;
    font-weight: 500;
  }
</style>
