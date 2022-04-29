<script setup lang="ts">
import { type TFallacy, getFallacyData } from '~~/composables/useFallacyData';
import { useUrlSearchParams, useMediaQuery } from '@vueuse/core';

const params = useUrlSearchParams<{ fallacy: string; search: string }>('hash-params');
const isMobileView = useMediaQuery('(max-width: 768px)');

const fallacies = await getFallacyData();
const searchInput = ref('');
const activeFallacy = ref<TFallacy | null>();

onMounted(() => {
  searchInput.value = params.search || '';
});

onMounted(() => {
  const fallacy = fallacies.find((f) => f.title === params.fallacy);
  console.log(params.fallacy);
  if (fallacy) activeFallacy.value = fallacy;
  else if (!isMobileView.value) activeFallacy.value = fallacies[0];
});

watch(
  () => searchInput.value,
  (value) => (params.search = value)
);
watch(
  () => activeFallacy.value?.title,
  (value) => (params.fallacy = value || '')
);
</script>

<template>
  <header class="pt-5">
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
          @click="activeFallacy = fallacy"
        />
      </template>
    </FallacyList>
    <Transition
      :duration="300"
      leaveToClass="opacity-0 !-bottom-full"
      enterFromClass="opacity-0 !-bottom-full"
      class="transition-all duration-300 md:transition-none"
    >
      <FallacyDescription
        class="fixed bottom-0 left-0 right-0 h-1/2 border-t border-gray-300 bg-white shadow-xl md:static md:h-full md:border-0 md:shadow-none"
        :fallacy="activeFallacy"
        @deactivateFallacy="activeFallacy = null"
        v-if="!!activeFallacy"
      />
    </Transition>
  </main>
</template>
