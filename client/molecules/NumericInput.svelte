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

  const min = range[0];
  const max = range[1];

  serialData.subscribe(updateValueIfNecessary);

  function updateValueIfNecessary(data) {
    if (Math.abs(data[name] - value) > step && !updateBlocked) {
      value = data[name];
    }
  }

  function normalizeValue() {
    value = Math.round(Math.max(min, Math.min(value, max)) / step) * step;
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
