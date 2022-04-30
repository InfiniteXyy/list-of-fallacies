<script setup lang="ts">
import { Icon } from '@iconify/vue';

defineProps<{ title?: string; visible: boolean }>();
const emit = defineEmits<{ (e: 'cancel'): void }>();

const isMobileView = useIsMobile();

const isFullScreen = ref(false);
const touchMovement = ref(0);
const touchStart = ref(0);
const isDragging = ref(false);

function onTouchStart(e: TouchEvent) {
  if (isFullScreen.value || !isMobileView.value) return;
  const touch = e.touches.item(0);
  if (touch) {
    touchStart.value = touch.clientY;
    isDragging.value = true;
  }
}

function onTouchMove(e: TouchEvent) {
  if (!isDragging.value) return;
  const touch = e.touches.item(0);
  if (touch) touchMovement.value = Math.max(0, touch.clientY - touchStart.value);
}

function onTouchEnd() {
  isDragging.value = false;
  if (touchMovement.value > 100) nextTick(() => emit('cancel'));
  touchMovement.value = 0;
}
</script>

<template>
  <Transition
    leaveToClass="opacity-0 !-bottom-full"
    enterFromClass="opacity-0 !-bottom-full"
    class="transition-all duration-300 md:transition-none"
    :style="{
      bottom: isDragging ? `${-touchMovement}px` : undefined,
      transition: isDragging ? 'none' : undefined,
    }"
  >
    <div
      v-if="visible"
      class="fixed bottom-0 left-0 right-0 flex h-2/3 flex-col overflow-auto border-t border-gray-300 bg-white px-4 shadow-xl md:static md:h-full md:border-0 md:shadow-none"
      :class="{ '!h-full': isFullScreen }"
    >
      <header
        class="color-gray-600 sticky top-0 mb-4 flex items-center bg-white pt-4"
        @touchstart="onTouchStart"
        @touchmove.prevent="onTouchMove"
        @touchend="onTouchEnd"
      >
        <h2 class="mr-auto text-lg font-bold">{{ title }}</h2>
        <Icon
          :icon="!isFullScreen ? 'mdi:fullscreen' : 'mdi:fullscreen-exit'"
          class="cursor-pointer text-3xl md:hidden"
          @click="isFullScreen = !isFullScreen"
        />
        <Icon class="ml-2 cursor-pointer text-3xl md:hidden" icon="carbon:close" @click="$emit('cancel')" />
      </header>

      <slot />
    </div>
  </Transition>
</template>
