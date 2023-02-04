<script lang="ts" setup>
import { PropType } from "vue";

defineProps({
  text: {
    type: String,
    required: true,
  },
  level: {
    type: Number as PropType<1 | 2 | 3 | 4 | 5 | 6>,
    default: 1,
  },
  typography: {
    type: String,
    default: undefined,
  },
  underlined: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <div class="headline-wrapper">
    <h1 v-if="level === 1" :class="typography ? typography : 'headline-1'">
      {{ text }}
    </h1>

    <h2 v-else-if="level === 2" :class="typography ? typography : 'headline-2'">
      {{ text }}
    </h2>

    <h3 v-else-if="level === 3" :class="typography ? typography : 'headline-3'">
      {{ text }}
    </h3>

    <h4 v-else-if="level === 4" :class="typography ? typography : 'headline-4'">
      {{ text }}
    </h4>

    <h5 v-else-if="level === 5" :class="typography ? typography : 'headline-5'">
      {{ text }}
    </h5>

    <h6 v-else-if="level === 6" :class="typography ? typography : 'headline-6'">
      {{ text }}
    </h6>

    <div v-if="underlined" class="headline-underline" />
  </div>
</template>

<style lang="scss" scoped>
.headline-wrapper {
  position: relative;
  width: fit-content;
}

.headline-underline {
  position: absolute;
  bottom: -1rem;
  left: 2rem;
  width: calc(100% - 2rem);
  height: 0.5rem;
  background-color: rgb(var(--v-theme-lemon));
  z-index: 0;

  @include sm-down {
    left: 1rem;
    bottom: -0.5rem;
    width: calc(100% - 1rem);
    height: 0.33rem;
  }
}
</style>
