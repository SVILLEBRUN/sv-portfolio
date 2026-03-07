<template>
    <div></div>
</template>

<script setup lang="ts">
const props = defineProps<{
    project: Object
}>()
console.log('Projet', props.project)

</script>