<script>
  import FCColumn from '../organisms/FCColumn.svelte';
  import BatColumn from '../organisms/BatColumn.svelte';
  import Timer from '../molecules/Timer.svelte';
  import Version from '../atoms/Version.svelte';
  import StateLine from '../organisms/StateLine.svelte';
  import CommonColumn from '../organisms/CommonColumn.svelte';
</script>

<div class="container">
  <Timer />
  <Version />
  <div class="row">
    <div class="column"><FCColumn /></div>
    <div class="column column-20"><CommonColumn /></div>
    <div class="column"><BatColumn /></div>
  </div>
  <StateLine />
</div>

<style>
  .container {
    position: relative;
    margin-top: 5em;
  }
</style>
