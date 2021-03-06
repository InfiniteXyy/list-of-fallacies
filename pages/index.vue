<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { type TFallacy, getFallacyData } from '~~/composables/useFallacyData';
import { useUrlSearchParams, useMediaQuery } from '@vueuse/core';

const params = useUrlSearchParams<{ fallacy: string; search: string }>('hash-params');
const isMobileView = useIsMobile();
const fallacies = await getFallacyData();
const searchInput = ref('');
const activeFallacy = ref<TFallacy | null>();

onMounted(() => {
  searchInput.value = params.search || '';
});

onMounted(() => {
  const fallacy = fallacies.find((f) => f.title === params.fallacy);
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

const currentIndex = computed(() => {
  return fallacies.findIndex((f) => f.title === activeFallacy.value?.title);
});

const prevItem = computed(() => {
  return currentIndex.value > 0 ? fallacies[currentIndex.value - 1] : null;
});

const nextItem = computed(() => {
  return currentIndex.value < fallacies.length - 1 ? fallacies[currentIndex.value + 1] : null;
});
</script>

<template>
  <header class="pt-5">
    <h1 class="text-2xl font-bold">谬误列表</h1>
    <div class="text-xs">
      <small class="text-gray-400">数据来源于 </small>
      <a class="underline" href="https://zh.wikipedia.org/wiki/谬误列表">Wikipedia</a>
    </div>
    <UiInput v-model="searchInput" class="mt-4" placeholder="输入关键词搜索" />
  </header>

  <main class="mt-2 grid h-full grid-cols-1 items-start gap-4 overflow-hidden md:grid-cols-2">
    <!-- Left Panel -->
    <FallacyList :keyword="searchInput">
      <template #default="fallacy: TFallacy">
        <FallacyCard
          :isActive="activeFallacy?.title === fallacy.title"
          :fallacy="fallacy"
          @click="activeFallacy = fallacy"
        />
      </template>
    </FallacyList>

    <!-- Right Panel -->
    <UiDrawer :title="activeFallacy?.title" :visible="!!activeFallacy" @cancel="activeFallacy = null">
      <FallacyDescription v-if="!!activeFallacy" :fallacy="activeFallacy">
        <template #control-button>
          <div class="grid grid-cols-2 gap-2" :class="!prevItem || !nextItem ? '!grid-cols-1' : ''">
            <UiButton v-if="prevItem" @click="activeFallacy = prevItem">
              <template #prefix-icon>
                <Icon icon="carbon:arrow-left" class="flex-shrink-0" />
              </template>
              {{ prevItem?.title }}
            </UiButton>
            <UiButton v-if="nextItem" class="justify-end" @click="activeFallacy = nextItem">
              {{ nextItem?.title }}
              <template #suffix-icon>
                <Icon icon="carbon:arrow-right" class="flex-shrink-0" />
              </template>
            </UiButton>
          </div>
        </template>
      </FallacyDescription>
    </UiDrawer>
  </main>
</template>
