<script>
  import Dashboard from './layouts/Dashboard.svelte';
  import Version from './atoms/Version.svelte';
  import { appInitialized } from './stores';
  import UpdateModal from './organisms/UpdateModal.svelte';

  appInitialized.subscribe((flag) => {
    if (flag) {
      document.getElementById('loading').remove();
    }
  });
</script>

<Version />
{#if $appInitialized}
  <UpdateModal />
  <Dashboard />
{/if}
