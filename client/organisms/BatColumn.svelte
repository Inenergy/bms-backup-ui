<script>
  import { serialData, chargePercent } from '../stores';
  import { STABILIZATION_MODES } from '../../common/constants';
  import Input from '../molecules/NumericInput.svelte';
  import sendSerialCommand from '../utils/inputHandler';

  const stabilizationOptions = STABILIZATION_MODES.map((name, i) => ({
    name,
    value: i + 1,
  }));

  $: stabilizationMode = $serialData.status.stabilizationMode;

  function changeStablizationMode(e) {
    const { name, value } = e.currentTarget;
    sendSerialCommand(name, value);
  }

  const limitsRow = [
    { name: 'minBatVoltage', label: 'Мин напр', units: 'В' },
    { name: 'maxBatVoltage', label: 'Макс напр', units: 'В' },
    { name: 'maxBatCurrent', label: 'Макс ток', units: 'A' },
  ];

  const voltageThresholdRow = [
    { name: 'minBatVoltageThreshold', label: 'Мин напр', units: 'В' },
    { name: 'maxBatVoltageThreshold', label: 'Макс напр', units: 'В' },
  ];

  const coefficientsRow = [
    { name: 'PStabilizationCoefficient', label: 'P' },
    { name: 'IStabilizationCoefficient', label: 'I' },
    { name: 'DStabilizationCoefficient', label: 'D' },
  ];

  const tempLimitsRow = [
    { name: 'minFCTemp', label: 'Мин напр', units: 'В' },
    { name: 'maxFCTemp', label: 'Макс напр', units: 'В' },
  ];
</script>

<h2>АКБ</h2>
<div class="row">
  <div class="column">
    <span class="emphasize">{$serialData.batVoltage.toFixed(2)}В</span>
  </div>
  <div class="column">
    <span class="emphasize">{$serialData.batCurrent.toFixed(2)}А</span>
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
    <div class="column-33">
      <Input attrs={input} />
    </div>
  {/each}
</div>

<div class="row">
  <div class="column">
    <Input
      attrs={{
        label: 'Вентилятор 45% + ',
        units: '%',
        name: 'fanLoadCorrective',
      }}
    />
  </div>
  <div class="column">
    {$serialData.fanRPM}
    об/мин
  </div>
</div>

<div class="row">
  <div class="column">Коэфф. стабилизации</div>
  {#each coefficientsRow as input}
    <div class="column column-25">
      <Input attrs={input} />
    </div>
  {/each}
</div>

<div class="row">
  <label>
    Режим стабилизации
    <select name="stabilizationMode" on:blur={changeStablizationMode}>
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
  <div class="column">Пределы ТЭ</div>
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
