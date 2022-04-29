<script setup lang="ts">
import { TFallacy } from '~~/composables/useFallacyData';
const props = defineProps<{ fallacy: TFallacy }>();
defineEmits<{ (e: 'deactivateFallacy'): void }>();

const displayedUrl = computed(() => {
  return decodeURIComponent(props.fallacy.htmlUrl || '');
});
</script>

<template>
  <div class="overflow-auto">
    <div class="sticky top-0 mb-4 flex items-center justify-between bg-white">
      <h2 class="text-lg font-bold">{{ fallacy.title }}</h2>
      <div class="i-carbon-close cursor-pointer text-3xl md:hidden" @click="$emit('deactivateFallacy')" />
    </div>
    <div v-if="!fallacy.examples?.length" class="flex flex-col items-center justify-center pb-10">
      <div class="mb-4 text-gray-300">暂无示例</div>
      <div class="i-carbon-tropical-warning text-8xl text-gray-300" />
    </div>
    <div v-else>
      <h4 class="mb-4 text-sm font-bold text-gray-500">示例</h4>
      <div
        v-for="example in fallacy.examples || []"
        class="mb-6 whitespace-pre-line rounded-sm border-l-2 border-yellow-400 bg-yellow-50 p-2 pl-4 text-sm leading-6"
      >
        {{ example }}
      </div>
    </div>
    <template v-if="displayedUrl">
      <h4 class="mb-4 text-sm font-bold text-gray-500">Wikipedia Link</h4>
      <a
        :href="displayedUrl"
        class="block overflow-hidden text-ellipsis border border-gray-100 p-4 text-gray-400 hover:bg-gray-50"
      >
        {{ displayedUrl }}
      </a>
    </template>
  </div>
</template>
