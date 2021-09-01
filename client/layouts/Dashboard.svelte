<script>
  import FCColumn from '../organisms/FCColumn.svelte';
  import BatColumn from '../organisms/BatColumn.svelte';
  import Timer from '../molecules/Timer.svelte';
  import Version from '../atoms/Version.svelte';
  import StateLine from '../organisms/StateLine.svelte';
  import ModeSelector from '../molecules/ModeSelector';
</script>

<div class="container">
  <Timer />
  <Version />
  <div class="row">
    <ModeSelector />
  </div>
  <div class="row">
    <div class="column"><FCColumn /></div>
    <div class="column"><BatColumn /></div>
  </div>
  <StateLine />
</div>

<style>
  .container {
    position: relative;
  }
</style>
