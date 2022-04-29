<script setup lang="ts">
import { type TFallacy, getFallacyData } from '~~/composables/useFallacyData';
import { useUrlSearchParams } from '@vueuse/core';

const params = useUrlSearchParams<{ fallacy: string; search: string }>('hash-params');
const fallacies = await getFallacyData();
const searchInput = ref('');
const activeFallacy = ref<TFallacy | null>();

onMounted(() => {
  searchInput.value = params.search || '';
});

watchEffect(() => {
  params.search = searchInput.value;
});

onMounted(() => {
  const fallacy = fallacies.find((f) => f.title === params.fallacy);
  if (fallacy) activeFallacy.value = fallacy;
  else activeFallacy.value = fallacies[0];
});

function activateFallacy(fallacy: TFallacy) {
  activeFallacy.value = fallacy;
  params.fallacy = fallacy.title;
}
</script>

<template>
  <header class="">
    <h1 class="text-2xl font-bold">谬误列表</h1>
    <div class="text-xs">
      <small class="text-gray-400">数据来源于 </small>
      <a class="underline" href="https://zh.wikipedia.org/wiki/谬误列表">Wikipedia</a>
    </div>
    <UiInput class="mt-4" v-model="searchInput" placeholder="输入关键词搜索" />
  </header>

  <main class="mt-2 grid h-full grid-cols-1 items-start gap-4 overflow-hidden md:grid-cols-2">
    <FallacyList :keyword="searchInput">
      <template v-slot="fallacy: TFallacy">
        <FallacyCard
          :isActive="activeFallacy?.title === fallacy.title"
          :fallacy="fallacy"
          @click="activateFallacy(fallacy)"
        />
      </template>
    </FallacyList>
    <FallacyDescription
      class="fixed bottom-0 left-0 right-0 h-1/2 border-t border-gray-300 bg-white p-4 shadow-xl md:static md:h-full md:border-0 md:p-0 md:shadow-none"
      :fallacy="activeFallacy"
      @deactivateFallacy="activeFallacy = null"
      v-if="!!activeFallacy"
    />
  </main>
</template>
