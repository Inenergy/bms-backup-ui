<script>
  import { serialData } from '../stores';
  import sendSerialCommand from '../utils/inputHandler';
  import { OPERATION_MODES } from '../../common/constants';

  const modeOptions = OPERATION_MODES.map((name, i) => ({ name, value: i + 1 }));

  $: operationMode = $serialData.status.operationMode

  function handeInput(e) {
    const {name, value} = e.currentTarget;
    sendSerialCommand(name, value);
  }
</script>

<select name="operationMode" on:blur={handeInput}>
  {#each modeOptions as option}
    <option
      value={option.value}
      selected={operationMode == option.value}>{option.name}</option
    >
  {/each}
</select>
