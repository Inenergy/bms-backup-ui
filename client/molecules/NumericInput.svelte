<script>
  import { serialData } from '../stores';
  import onChange from '../utils/inputHandler';
  import { INPUTS } from '../../common/constans';
  export let attrs = {};

  const { name, label, units } = attrs;

  let value = $serialData[name];

  const range = INPUTS[name].constraints;
  const step = INPUTS[name].step;

  $: min = range[0];
  $: max = range[1];

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
    on:blur={normalizeValue}
    {name}
    {step}
    {min}
    {max}
  />
  {#if units}
    <em> {label}</em>
  {/if}
</label>

<style>
  input {
    width: 10em;
  }
</style>
