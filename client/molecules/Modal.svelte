<script>
  import Portal from '../atoms/Portal.svelte';
  import { fly } from 'svelte/transition';
  import { onDestroy } from 'svelte';
  export let size = 'md';
  export let position = 'center';
  export let onDismiss = Function.prototype;
  export let locked = false;

  document.addEventListener('keydown', closeOnEsc);

  function closeOnEsc(e) {
    if (e.key === 'Escape' && !locked) onDismiss();
  }

  onDestroy(() => document.removeEventListener('keydown', closeOnEsc));

  function dismissSelf() {
    if (!locked) onDismiss();
  }
</script>

<Portal>
  <div class="overlay" on:click|self={dismissSelf}>
    <div class="modal {size} {position}" transition:fly={{ y: -200 }}>
      <slot />
    </div>
  </div>
</Portal>

<style>
  .overlay {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 9010;
    display: flex;
  }
  .modal {
    background-color: white;
    padding: 2.4rem;
    margin: auto;
    width: 40%;
    min-width: 30rem;
    border-radius: 0.8rem;
    box-shadow: 0 0 0.8rem rgba(0, 0, 0, 0.5);
    max-height: 70vh;
    overflow-y: hidden;
    display: flex;
    flex-direction: column;
  }
  .modal.top {
    margin-top: 10vh;
  }
  .modal.sm {
    width: 30%;
    min-height: 20vh;
    min-width: 20rem;
    padding: 0.8rem 1.2rem;
  }
</style>
