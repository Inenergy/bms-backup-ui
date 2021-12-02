<script>
  import { serialData } from '../stores';
  import StatusLight from '../atoms/StatusLight.svelte';
  import { ERRORS } from '../../common/constants';
  import { __ } from '../utils/translator';

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
    'limit FC',
    'FC error',
    'max battery current',
    'battery error',
  ];
</script>

<div class="row">
  {#each ERRORS as key, i}
    <div class="column">
      <label for={key}>{$__(labels[i])}</label>
      <StatusLight
        id={key}
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
