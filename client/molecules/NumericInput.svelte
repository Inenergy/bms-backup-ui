<script>
  import { serialData } from '../stores';
  import onChange from '../utils/inputHandler';
  import { INPUTS } from '../../common/constants';
  import { __ } from '../utils/translator';
  import LabeledElement from '../atoms/LabeledElement.svelte';
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

<LabeledElement {label} {units}>
  <slot />
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
</LabeledElement>

<style>
  input {
    width: 5em;
    height: 2.8rem;
    border-radius: 0.2rem;
  }
</style>
