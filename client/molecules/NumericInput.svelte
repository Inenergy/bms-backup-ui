<script>
  import { serialData } from '../stores';
  import onChange from '../utils/inputHandler';
  import { INPUTS } from '../../common/constants';
  export let attrs = {};

  const { name, label, units } = attrs;

  let value = $serialData[name];
  let updateBlocked;

  const range = INPUTS[name].constraints;
  const step = INPUTS[name].step || 1;

  $: min = range[0];
  $: max = range[1];

  serialData.subscribe(updateValueIfNecessary);

  function updateValueIfNecessary(data) {
    if (Math.abs(data[name] - value) > step && !updateBlocked) {
      value = data[name];
    }
  }

  function normalizeValue() {
    value = Math.max(min, Math.min(value, max));
    onChange(name, value);
  }
</script>

<label>
  <span>{label}</span>
  <input
    type="number"
    bind:value
    on:change={normalizeValue}
    on:focus={() => (updateBlocked = true)}
    on:blur={() => (updateBlocked = false)}
    {name}
    {step}
    {min}
    {max}
  />
  {#if units}
    <em> {units}</em>
  {/if}
</label>

<style>
  input {
    width: 5em;
  }
</style>
