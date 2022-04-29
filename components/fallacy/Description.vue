<script setup lang="ts">
import { TFallacy } from '~~/composables/useFallacyData';
defineProps<{ fallacy: TFallacy }>();
</script>

<template>
  <div class="py-4">
    <div v-if="!fallacy.examples?.length" class="flex flex-col items-center justify-center pt-10">
      <div class="mb-4 text-gray-300">{{ fallacy.title }} - 暂无示例</div>
      <div class="i-carbon-tropical-warning text-8xl text-gray-300" />
    </div>
    <div v-else>
      <h4 class="mb-4 text-sm font-bold text-gray-500">{{ fallacy.title }} - 示例</h4>
      <div
        v-for="example in (fallacy.examples || [])"
        class="mb-6 whitespace-pre-line rounded-sm border-l-2 border-yellow-400 bg-yellow-50 p-2 pl-4 text-sm leading-6"
      >
        {{ example }}
      </div>
    </div>
  </div>
</template>
