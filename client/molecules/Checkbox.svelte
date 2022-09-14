<script>
  import LabeledElement from '../atoms/LabeledElement.svelte';
  export let name;
  export let onChange;
</script>

<LabeledElement {...$$props}>
  <input
    type="checkbox"
    {name}
    on:change={(e) => onChange(e.target.name, +e.target.checked)}
  />
</LabeledElement>
