<script setup lang="ts">
import { TFallacy } from '~~/composables/useFallacyData';
defineProps<{ fallacy: TFallacy; isActive?: boolean }>();
</script>

<template>
  <div
    class="underline-gray-300 underline-2 cursor-pointer border border-white p-4 shadow transition hover:shadow-md"
    :class="{ '!border-blue-600': isActive }"
  >
    <div class="mb-4 font-bold hover:underline">{{ fallacy.title }}</div>
    <div class="text-sm text-gray-500">{{ fallacy.description }}</div>
  </div>
</template>
