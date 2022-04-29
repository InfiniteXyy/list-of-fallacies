<script setup lang="ts">
defineProps<{ modelValue: string }>();
</script>

<template>
  <input
    :value="modelValue"
    @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    class="focus:scale-102 w-full rounded border border-gray-200 py-2 px-4 font-medium outline-none transition-all focus:border-gray-400 focus:shadow-lg"
  />
</template>
