<script>
  import { serialData } from '../stores';
  import StatusLight from '../atoms/StatusLight.svelte';
  import { ERRORS } from '../../common/constants';
  import { __ } from '../utils/translator';

  const displayErrors = ERRORS;
  const l = displayErrors.length - 2;
  displayErrors[l] = displayErrors.splice(l - 1, 1, displayErrors[l])[0];

  const warnings = ['minFcTemp'];

  $: errors = $serialData.errors;

  const labels = [
    'min FC voltage',
    'max battery voltage',
    'min battery voltage',
    'max FC temperature',
    'min FC temperature',
    'thermistor',
    'FC current',
    'high FC pressure',
    'low FC pressure',
    'Line Pressure',
    'max battery current',
    'FC error',
    'battery error',
  ];
</script>

<div class="row">
  {#each displayErrors as key, i}
    <div class="column">
      <StatusLight
        label={labels[i]}
        status={errors[key] ? (warnings.includes(key) ? 2 : 3) : 0}
      />
    </div>
  {/each}
</div>

<style>
  .row {
    margin-top: 2.4rem;
  }
  label {
    height: 5em;
  }
</style>
