<script setup lang="ts">
const fallacies = await getFallacyData();

const props = defineProps<{ keyword: string }>();

const filteredFallacies = computed(() => {
  return fallacies.filter((i) => {
    return RegExp(props.keyword, 'i').test(i.title) && i.title;
  });
});
</script>

<template>
  <div v-if="!filteredFallacies.length">
    <div class="mt-20 flex items-center justify-center gap-2 text-xl text-gray-300">
      <div class="i-carbon-search"></div>
      <div>没有搜索到结果</div>
    </div>
  </div>
  <div v-else class="border-color-gray-100 flex h-full flex-col overflow-auto border">
    <slot v-for="fallacy in filteredFallacies" v-bind="fallacy" />
  </div>
</template>
