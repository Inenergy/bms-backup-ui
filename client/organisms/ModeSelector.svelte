<script>
  import { serialData } from '../stores';
  import sendSerialCommand from '../utils/inputHandler';
  import { OPERATION_MODES } from '../../common/constants';
  import { __ } from '../utils/translator';
  import Select from '../molecules/Select.svelte';

  const modeOptions = OPERATION_MODES.map((label, i) => ({
    label,
    value: i + 1,
  }));

  $: operationMode = $serialData.status.operationMode;
</script>

<div>
  <h4>{$__('operation mode')}</h4>
  <Select
    name="operationMode"
    onChange={sendSerialCommand}
    currentValue={operationMode}
    options={modeOptions}
  />
</div>
