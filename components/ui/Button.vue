<template>
  <button
    type="button"
    class="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-5 py-2 text-sm font-bold text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
  >
    <slot name="prefix-icon" />
    <span class="overflow-hidden text-ellipsis whitespace-nowrap"><slot /></span>
    <slot name="suffix-icon" />
  </button>
</template>
