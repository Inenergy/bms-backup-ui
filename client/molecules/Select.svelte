<script>
  import { __ } from '../utils/translator';
  export let options;
  export let name;
  export let label;
  export let onChange;
  export let currentValue;

  function handleInput(e) {
    onChange(e.currentTarget.name, +e.currentTarget.value);
  }
</script>

{#if label}
  <div>{$__(label)}</div>
{/if}
<select {name} on:change={handleInput}>
  {#each options as option}
    <option value={option.value} selected={currentValue == option.value}
      >{option.label}</option
    >
  {/each}
</select>
