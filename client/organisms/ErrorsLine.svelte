<script>
  import { serialData } from '../stores';
  import StatusLight from '../atoms/StatusLight.svelte';
  import { ERRORS } from '../../common/constants';

  const warnings = ['minFcTemp'];

  $: errors = $serialData.errors;

  const labels = [
    'Мин напряжение ТЭ',
    'Макс напряжение АКБ',
    'Мин напряжение АКБ',
    'Макс температура ТЭ',
    'Мин температура ТЭ',
    'Обрыв термистора',
    'Ток ТЭ',
    'Высокое давление ТЭ',
    'Низкое давление ТЭ',
    'Отсечка ТЭ',
    'Ошибка ТЭ',
    'Макс ток АКБ',
    'Ошибка АКБ',
  ];
</script>

<div class="row">
  {#each ERRORS as key, i}
    <div class="column">
      <label for={key}>{labels[i]}</label>
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
