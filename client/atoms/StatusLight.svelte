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
  }
  .red {
    background-color: red;
  }
  .yellow {
    background-color: yellow;
  }
  .green {
    background-color: green;
  }
  .blink {
    animation: blink alternate infinite;
  }
</style>