<script>
  import { serialData } from '../stores';
  import Input from '../molecules/NumericInput.svelte';
  import sendSerialCommand from '../utils/inputHandler';

  const pressureRow = [
    { name: 'minPressure', label: 'Мин', units: 'мБар' },
    { name: 'maxPressure', label: 'Макс', units: 'мБар' },
    { name: 'limitPressure', label: 'Отсечка', units: 'мБар' },
  ];

  const limitsRow = [
    { name: 'minFCVoltage', label: 'Мин напр', units: 'В' },
    { name: 'maxFCCurrent', label: 'Макс ток', units: 'А' },
  ];

  const CSRow = [
    { name: 'CSDuration', label: 'Закоротка', units: 'мс' },
    { name: 'CSDelay', label: 'Задержка', units: 'с' },
  ];

  const purgeRow = [
    { name: 'purgeDuration', label: 'Продувка', units: 'мс' },
    { name: 'purgeDelay', label: 'Задержка', units: 'c' },
    { name: 'CSShift', label: 'Смещение', units: 'с' },
  ];
</script>

<h2>ТЭ</h2>
<div class="row">
  <div class="column">
    <span class="emphasize">{$serialData.FCVoltage.toFixed(2)}В</span>
  </div>
  <div class="column">
    <span class="emphasize">{$serialData.FCCurrent.toFixed(2)}А</span>
  </div>
</div>
<div class="row">
  <div class="column">{$serialData.hydrogenPressure}, бар</div>
  {#each pressureRow as input}
    <div class="column">
      <Input attrs={input} />
    </div>
  {/each}
</div>
<div class="row">
  <div class="column">
    Давление магистрали <strong>{$serialData.busPressure}</strong>, бар
  </div>
  <div class="column">
    Расход топлива <strong>{$serialData.hydrogenConsumption}</strong>, л/ч
  </div>
</div>
<div class="row">
  <div class="column">Температуры ТЭ</div>
  {#each [1, 2, 3, 4, 5] as num}
    <div class="column">{$serialData['temp' + num]}</div>
  {/each}
</div>
<div class="row">
  <div class="column column-33">Температура стабилизации</div>
  <div class="column column-33">
    {$serialData.currentStabilizationTemp}/
    <input
      type="number"
      name="stabilizationTemp"
      on:change={sendSerialCommand}
    />
  </div>
</div>
<div class="row">
  {#each limitsRow as input}
    <div class="column column-33">
      <Input attrs={input} />
    </div>
  {/each}
</div>
<div class="row">
  {#each purgeRow as input}
    <div class="column">
      <Input attrs={input} />
    </div>
  {/each}
</div>
<div class="row">
  {#each CSRow as input}
    <div class="column">
      <Input attrs={input} />
    </div>
  {/each}
  <div class="column">
    <label>
      Разрешена
      <input
        type="checkbox"
        name="allowCS"
        on:change={(e) => sendSerialCommand(e.target.name, +e.target.checked)}
      />
    </label>
  </div>
</div>

<style>
  .emphasize {
    font-size: 3.2em;
    font-weight: 500;
  }
</style>
