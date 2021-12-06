<script>
  import Dashboard from './layouts/Dashboard.svelte';
  import Version from './atoms/Version.svelte';
  import Timer from './molecules/Timer.svelte';
  import UpdateModal from './organisms/UpdateModal.svelte';
</script>

<div class="container">
  <div class="row">
    <Timer />
  </div>
  <Version />
  <UpdateModal />
  <Dashboard />
</div>

<style>
  .container {
    position: relative;
  }
</style>
