<script>
  export let status = 0;

  const statuses = ['green', 'green blink', 'yellow', 'red']
</script>

<span class={statuses[status]}></span>

<style>
  span {
    width: 2rem;
    height: 2rem;
    background-color: lightgrey;
    border: 1px solid;
    display: inline-block;
    border-radius: 50%;
    margin-left: 0.8rem;
  }
  .red {
    background-color: #E10600;
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