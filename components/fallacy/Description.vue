<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { TFallacy } from '~~/composables/useFallacyData';
const props = defineProps<{ fallacy: TFallacy }>();
defineEmits<{ (e: 'deactivateFallacy'): void }>();

const isFullScreen = ref(false);

const displayedUrl = computed(() => {
  return decodeURIComponent(props.fallacy.htmlUrl || '');
});
</script>

<template>
  <div class="flex flex-col overflow-auto px-4" :class="{ '!h-full': isFullScreen }">
    <div class="color-gray-600 sticky top-0 mb-4 flex items-center bg-white pt-4">
      <h2 class="mr-auto text-lg font-bold">{{ fallacy.title }}</h2>
      <Icon
        :icon="!isFullScreen ? 'mdi:fullscreen' : 'mdi:fullscreen-exit'"
        class="cursor-pointer text-3xl md:hidden"
        @click="isFullScreen = !isFullScreen"
      />
      <Icon class="ml-2 cursor-pointer text-3xl md:hidden" icon="carbon:close" @click="$emit('deactivateFallacy')" />
    </div>
    <div class="text-sm">{{ fallacy.description }}</div>
    <div v-if="!fallacy.examples?.length" class="my-5 flex flex-col items-center justify-center">
      <div class="mb-4 text-gray-300">暂无示例</div>
      <Icon icon="carbon:tropical-warning" class="text-5xl text-gray-300 md:text-8xl" />
    </div>
    <div v-else class="mt-4">
      <h4 class="mb-4 text-sm font-bold text-gray-500">示例</h4>
      <div
        v-for="(example, index) in fallacy.examples || []"
        :key="index"
        class="mb-6 whitespace-pre-line rounded-sm border-l-2 border-yellow-400 bg-yellow-50 p-2 pl-4 text-sm leading-6"
      >
        {{ example }}
      </div>
    </div>
    <a
      v-if="displayedUrl"
      :href="displayedUrl"
      class="mb-4 block flex-shrink-0 overflow-hidden text-ellipsis border border-gray-100 p-4 text-gray-400 hover:bg-gray-50"
    >
      {{ displayedUrl }}
    </a>
    <div class="sticky bottom-0 mt-auto bg-white pb-4">
      <slot name="control-button" />
    </div>
  </div>
</template>
