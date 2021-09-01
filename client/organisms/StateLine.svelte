<script>
  import { serialData } from '../stores';
</script>

<div class="row">
  <div class="column">
    <label for="bat-state">АКБ</label>
    <input type="checkbox" id="bat-state" readonly checked={$serialData.state}>
  </div>
  <div class="column">
    <label for="fc-state">ТЭ ЭЛ</label>
    <input type="checkbox" id="fc-state" readonly checked={$serialData.state.FCOn}>
  </div>
  <div class="column">
    <label for="fc-temp-state">ТЭ Темп</label>
    <input type="checkbox" id="fc-temp-state" readonly checked={$serialData.state}>
  </div>
  <div class="column">
    <label for="dcdc-state">Dc-Dc</label>
    <input type="checkbox" id="dcdc-state" readonly checked={$serialData.state.DcDcOn}>
  </div>
  <div class="column">
    <label for="fan-state">Вентилятор</label>
    <input type="checkbox" id="fan-state" readonly checked={$serialData.state}>
  </div>
  <div class="column">
    <label for="bms-state">BMS</label>
    <input type="checkbox" id="bms-1-state" readonly checked={$serialData.state.BMS1On}>
    <input type="checkbox" id="bms-2-state" readonly checked={$serialData.state.BMS2On}>
    <input type="checkbox" id="bms-3-state" readonly checked={$serialData.state.BMS3On}>
    <input type="checkbox" id="bms-4-state" readonly checked={$serialData.state.BMS4On}>
  </div>
</div>