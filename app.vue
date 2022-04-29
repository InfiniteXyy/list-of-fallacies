<script setup lang="ts">
useHead({
  title: '谬误列表',
  link: [{ rel: 'icon', type: 'image/png', href: '/favicon.png' }],
  meta: [
    { name: 'description', content: '收集了一些谬误的笔记' },
    { name: 'keywords', content: '谬误' },
  ],
});
</script>

<template>
  <div class="mx-auto flex h-full w-[1400px] max-w-full flex-col py-10 px-5">
    <NuxtPage />
  </div>
</template>

<style>
@import '@unocss/reset/tailwind.css';

html,
body,
#__nuxt {
  height: 100%;
}
</style>
