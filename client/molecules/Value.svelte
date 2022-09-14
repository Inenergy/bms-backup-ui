<script>
  import LabeledElement from '../atoms/LabeledElement.svelte';
  import { __ } from '../utils/translator';
  import { serialData } from '../stores';
  export let name = '';
</script>

<LabeledElement {...$$props}>
  <span>{$serialData[name]}</span>
</LabeledElement>

<style>
  span {
    font-weight: bold;
  }
</style>
