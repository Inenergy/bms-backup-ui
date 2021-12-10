<script>
  import sendSerialCommand from '../utils/inputHandler';
  import StateLine from '../organisms/StateLine.svelte';
  import ErrorsLine from '../organisms/ErrorsLine.svelte';
  import layout from '../models/paramsLayout';
  import { __ } from '../utils/translator';
  import Value from '../molecules/Value.svelte';
  import NumericInput from '../molecules/NumericInput.svelte';
  import Select from '../molecules/Select.svelte';
  import Checkbox from '../molecules/Checkbox.svelte';
  import LabeledElement from '../atoms/LabeledElement.svelte';
  import { chargePercent, serialData } from '../stores';
  import ModeSelector from '../organisms/ModeSelector.svelte';
</script>

<div class="row">
  {#each layout as column, i}
    <div class="column">
      {#if i == 0}
        <ModeSelector />
      {/if}
      {#each column as block}
        <fieldset>
          {#if block.title}
            <legend>{$__(block.title)}</legend>
          {/if}
          {#each block.params as param}
            <div>
              {#if param.name == 'charge'}
                <LabeledElement
                  highlight
                  label={param.label}
                  units={param.units}
                >
                  <b>{$chargePercent}</b>
                </LabeledElement>
              {:else if param.name == 'fanLoadCorrective'}
                <NumericInput attrs={param}>
                  <span class="input-appendix">{$serialData.fanLoad}</span>/
                </NumericInput>
              {:else if param.name == 'stabilizationTemp'}
                <NumericInput attrs={param}>
                  <span class="input-appendix">{$serialData.currentStabilizationTemp}</span>/
                </NumericInput>
              {:else if param.type == 'info'}
                <Value {...param} />
              {:else if param.type == 'input'}
                <NumericInput attrs={param} />
              {:else if param.type == 'select'}
                <Select {...param} onChange={sendSerialCommand} />
              {:else if param.type == 'checkbox'}
                <Checkbox {...param} onChange={sendSerialCommand} />
              {/if}
            </div>
          {/each}
        </fieldset>
      {/each}
    </div>
  {/each}
</div>
<StateLine />
<ErrorsLine />

<style>
  legend {
    font-size: 1.2em;
  }
  .input-appendix {
    min-width: 3em;
    display: inline-block;
  }
</style>
