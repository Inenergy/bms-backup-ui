<script>
  import { __ } from '../utils/translator';
  export let label = '';
  export let units = '';
  export let highlight = false;
</script>

<div class:highlight>
  <span>{$__(label)}</span>
  <slot />
  {#if units}
    <em>{$__(units, true)}</em>
  {/if}
</div>

<style>
  div {
    display: flex;
  }
  div.highlight {
    font-size: 1.6em;
    margin-bottom: 0.4rem;
  }
  span {
    min-width: 16rem;
  }
  em {
    display: inline-block;
    margin-left: 0.4rem;
  }
</style>
