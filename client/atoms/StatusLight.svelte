<script>
  export let status = 0;
  export let label = '';
  import { __ } from '../utils/translator';

  const statuses = ['green', 'green blink', 'yellow', 'red'];
</script>

<span class={statuses[status]}>
  {$__(label)}
</span>

<style>
  span {
    display: flex;
    height: 100%;
    min-height: 4em;
    position: relative;
    width: 100%;
    background-color: lightgrey;
    border-radius: 0.4rem;
    color: white;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-weight: bold;
    padding: 0 0.4rem;
  }
  .red {
    background-color: #e10600;
  }
  .yellow {
    background-color: #ffc107;
  }
  .green {
    background-color: #28a745;
  }
  .blink {
    animation: blink alternate infinite;
  }
</style>
