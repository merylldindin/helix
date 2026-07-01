<script lang="ts" setup>
import { onBeforeUnmount, ref, watch } from "vue";

defineProps({
  definition: {
    required: true,
    type: String,
  },
  term: {
    required: true,
    type: String,
  },
});

const isOpen = ref(false);
const root = ref<HTMLElement | null>(null);

const closeOnOutsideClick = (event: MouseEvent) => {
  if (root.value && !root.value.contains(event.target as Node)) isOpen.value = false;
};

const toggleDefinition = () => {
  isOpen.value = !isOpen.value;
};

watch(isOpen, (opened) => {
  if (opened) document.addEventListener("click", closeOnOutsideClick);
  else document.removeEventListener("click", closeOnOutsideClick);
});

onBeforeUnmount(() => document.removeEventListener("click", closeOnOutsideClick));
</script>

<template>
  <span ref="root" class="custom-definition" :class="{ 'is-open': isOpen }">
    <span
      :aria-expanded="isOpen"
      class="custom-definition__term"
      role="button"
      tabindex="0"
      @click.stop="toggleDefinition"
      @keydown.enter.prevent="toggleDefinition"
      @keydown.esc="isOpen = false"
      @keydown.space.prevent="toggleDefinition"
    >
      {{ term }}
    </span>

    <span class="custom-definition__popover" role="tooltip">
      <span class="custom-definition__label text-1">{{ term }}</span>
      <span class="text-2">{{ definition }}</span>
    </span>
  </span>
</template>

<style lang="scss" scoped>
.custom-definition {
  position: relative;
  display: inline;

  &__term {
    border-bottom: 1px dotted
      color-mix(in srgb, rgb(var(--v-theme-primary)) 55%, transparent);
    cursor: help;
  }

  &__popover {
    position: absolute;
    bottom: calc(100% + 8px);
    left: 0;
    z-index: 20;
    display: block;
    width: max-content;
    max-width: min(320px, 80vw);
    padding: 0.6rem 0.75rem;
    border-radius: 6px;
    border: 1px solid color-mix(in srgb, rgb(var(--v-theme-primary)) 18%, transparent);
    background: rgb(var(--v-theme-surface));
    box-shadow: 0 6px 20px rgb(0 0 0 / 14%);
    color: color-mix(in srgb, rgb(var(--v-theme-primary)) 82%, transparent);
    line-height: 1.45;
    text-align: left;
    white-space: normal;
    opacity: 0;
    visibility: hidden;
    transition:
      opacity 0.15s ease,
      visibility 0.15s ease;
  }

  &__label {
    display: block;
    margin-bottom: 0.4rem;
    padding-bottom: 0.35rem;
    border-bottom: 1px solid
      color-mix(in srgb, rgb(var(--v-theme-primary)) 15%, transparent);
    color: rgb(var(--v-theme-primary));
    font-weight: 700;
  }

  &:hover &__popover,
  &.is-open &__popover {
    opacity: 1;
    visibility: visible;
  }
}
</style>
