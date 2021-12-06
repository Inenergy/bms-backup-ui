<script>
  import Dashboard from './layouts/Dashboard.svelte';
  import Version from './atoms/Version.svelte';
  import Timer from './molecules/Timer.svelte';
  import { appInitialized } from './stores';
  import UpdateModal from './organisms/UpdateModal.svelte';

  appInitialized.subscribe((flag) => {
    if (flag) {
      document.getElementById('loading').remove();
    }
  });
</script>

<div class="container">
  <div class="row">
      <Timer />
  </div>
  <Version />
  {#if $appInitialized}
    <UpdateModal />
    <Dashboard />
  {/if}
</div>

<style>
  .container {
    position: relative;
  }
</style>
