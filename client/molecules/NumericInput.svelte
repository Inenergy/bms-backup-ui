<script>
  import { serialData } from '../stores';
  import onChange from '../utils/inputHandler';
  import { INPUTS } from '../../common/constants';
  import { __ } from '../utils/translator';
  export let attrs = {};

  const { name, label, units } = attrs;

  let value = $serialData[name];
  let updateBlocked;

  const range = INPUTS[name].constraints;
  const step = INPUTS[name].step || 1;
  const precision = Math.abs(Math.min(-1, +step.toExponential().slice(-2)));

  const min = range[0];
  const max = range[1];

  serialData.subscribe(updateValueIfNecessary);

  function updateValueIfNecessary(data) {
    if (Math.abs(data[name] - value) > step && !updateBlocked) {
      value = data[name];
    }
  }

  function normalizeValue() {
    value = Number(Math.max(min, Math.min(value, max)).toPrecision(precision));
    onChange(name, value);
    updateBlocked = false;
  }

  const blockUpdates = () => (updateBlocked = true);
</script>

<label>
  <span>{$__(label)}</span>
  <input
    type="number"
    bind:value
    on:change={normalizeValue}
    on:input={blockUpdates}
    {name}
    {step}
    {min}
    {max}
  />
  {#if units}
    <em> {$__(units)}</em>
  {/if}
</label>

<style>
  label {
    display: inline-block;
  }
  input {
    width: 5em;
  }
</style>
