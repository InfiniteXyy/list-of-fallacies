<script setup lang="ts">
import { TFallacy } from '~~/composables/useFallacyData';
const fallacies = useFallacyData();
const searchInput = ref('');
const activeFallacy = ref<TFallacy | null>(fallacies[0] || null);

const filteredFallacies = computed(() => {
  console.log(searchInput.value);
  return fallacies.filter((i) => i.title.includes(searchInput.value) || i.title === activeFallacy.value.title);
});

function activateFallacy(fallacy: TFallacy) {
  activeFallacy.value = fallacy;
}
</script>

<template>
  <header class="p-2 pb-0">
    <h1 class="text-2xl font-bold">谬误列表</h1>
    <div class="text-xs">
      <small class="text-gray-400">数据来源于 </small>
      <a class="underline" href="https://zh.wikipedia.org/wiki/谬误列表">Wikipedia</a>
    </div>
    <UiInput class="mt-4" v-model="searchInput" placeholder="输入关键词搜索" />
  </header>

  <main class="h-full overflow-auto p-2">
    <div class="grid h-full grid-cols-2 items-start gap-4 md:gap-8">
      <div class="mt-4 grid grid-flow-row gap-4">
        <FallacyCard
          v-for="fallacy in filteredFallacies"
          :isActive="activeFallacy.title === fallacy.title"
          :fallacy="fallacy"
          @click="activateFallacy(fallacy)"
        />
      </div>
      <div class="sticky top-0">
        <FallacyDescription :fallacy="activeFallacy" v-if="!!activeFallacy" />
      </div>
    </div>
  </main>
</template>
