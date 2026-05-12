<script lang="ts" setup>
import { computed } from "vue";
import { useTheme } from "vuetify";

defineProps({
  label: {
    required: true,
    type: String,
  },
});

const theme = useTheme();

const customChipStyles = computed(() => ({
  borderColor: theme.global.current.value.dark
    ? "rgb(var(--v-theme-primary))"
    : "rgba(var(--v-theme-primary), 0.25)",
  color: "rgb(var(--v-theme-primary))",
}));
</script>

<template>
  <span class="custom-chip" :style="customChipStyles">
    {{ label }}
  </span>
</template>

<style lang="scss" scoped>
.custom-chip {
  border-radius: 4px;
  border-width: 1px;
  border-style: solid;
  flex-shrink: 0;
  font-size: 1.1rem;
  line-height: 1;
  padding: 0.1rem 0.4rem;
  white-space: nowrap;
}
</style>
