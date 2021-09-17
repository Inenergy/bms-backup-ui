<script>
  import { serialData } from '../stores';
  import sendSerialCommand from '../utils/inputHandler';
  import { OPERATION_MODES } from '../../common/constants';

  const modeOptions = OPERATION_MODES.map((name, i) => ({ name, value: i + 1 }));

  $: operationMode = $serialData.status.operationMode

  function handleInput(e) {
    const {name, value} = e.currentTarget;
    sendSerialCommand(name, +value);
  }
</script>

<div class="row">
<h3>Режим работы</h3>
<select name="operationMode" on:change={handleInput}>
  {#each modeOptions as option}
    <option
      value={option.value}
      selected={operationMode == option.value}>{option.name}</option
    >
  {/each}
</select>

<h4>Температура воздуха {$serialData.temp6}</h4>
</div>


<style>
  .row {
    height: 100%;
    flex-direction: column;
  }
  h3 {
    margin-top: 3em;
  }
  h4 {
    margin: auto;
  }
</style>
