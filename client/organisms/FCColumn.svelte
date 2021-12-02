<script>
  import { serialData } from '../stores';
  import Input from '../molecules/NumericInput.svelte';
  import sendSerialCommand from '../utils/inputHandler';
  import { __ } from '../utils/translator';

  const pressureRow = [
    { name: 'minPressure', label: 'min', units: 'mbar' },
    { name: 'maxPressure', label: 'max', units: 'mbar' },
    { name: 'limitPressure', label: 'limit', units: 'mbar' },
  ];

  const limitsRow = [
    { name: 'minFCVoltage', label: 'min voltage', units: 'V' },
    { name: 'maxFCCurrent', label: 'max current', units: 'A' },
  ];

  const CSRow = [
    { name: 'CSDuration', label: 'short', units: 'ms' },
    { name: 'CSDelay', label: 'delay', units: 's' },
  ];

  const purgeRow = [
    { name: 'purgeDuration', label: 'purge', units: 'ms' },
    { name: 'purgeDelay', label: 'delay', units: 's' },
    { name: 'CSShift', label: 'shift', units: 's' },
  ];
</script>

<h2>{$__('FC')}</h2>
<div class="row">
  <div class="column">
    <span class="emphasize">{$serialData.FCVoltage.toFixed(2) + $__('V')}</span>
  </div>
  <div class="column">
    <span class="emphasize">{$serialData.FCCurrent.toFixed(2) + $__('A')}</span>
  </div>
</div>
<div class="row">
  <div class="column">{$serialData.hydrogenPressure}, {$__('bar')}</div>
  {#each pressureRow as input}
    <div class="column">
      <Input attrs={input} />
    </div>
  {/each}
</div>
<div class="row">
  <div class="column span-2">
    {$__('bus pressure')} <strong>{$serialData.busPressure}</strong>, {$__('bar')}
  </div>
  <div class="column">
    {$__('fuel consumption')} <strong>{$serialData.hydrogenConsumption}</strong>, {$__('l/h')}
  </div>
</div>
<div class="row">
  <div class="column">{$__('FC temperatures')}</div>
  {#each [1, 2, 3, 4, 5] as num}
    <div class="column">{$serialData['temp' + num]}</div>
  {/each}
</div>
<div class="row">
  <div class="column column-33">{$__('stabilization temperature')}</div>
  <div class="column column-33">
    {$serialData.currentStabilizationTemp}/
    <Input
      attrs = {{
        label: '',
        name: "stabilizationTemp",
      }}
    />
  </div>
</div>
<div class="row">
  {#each limitsRow as input}
    <div class="column column-33">
      <Input attrs={input} />
    </div>
  {/each}
</div>
<div class="row">
  {#each purgeRow as input}
    <div class="column">
      <Input attrs={input} />
    </div>
  {/each}
</div>
<div class="row">
  {#each CSRow as input}
    <div class="column">
      <Input attrs={input} />
    </div>
  {/each}
  <div class="column">
    <label>
      {$__('allowed')}
      <input
        type="checkbox"
        name="allowCS"
        on:change={(e) => sendSerialCommand(e.target.name, +e.target.checked)}
      />
    </label>
  </div>
</div>

<style>
  .emphasize {
    font-size: 3.2em;
    font-weight: 500;
  }
  .span-2 {
    height: 3em;
  }
</style>
