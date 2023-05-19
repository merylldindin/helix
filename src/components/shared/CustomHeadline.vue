<script lang="ts" setup>
import { PropType } from "vue";

defineProps({
  level: {
    default: 1,
    type: Number as PropType<1 | 2 | 3 | 4 | 5 | 6>,
  },
  text: {
    required: true,
    type: String,
  },
  typography: {
    default: undefined,
    type: String,
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
  </div>
</template>

<style lang="scss" scoped>
.headline-wrapper {
  position: relative;
  width: fit-content;
}
</style>
