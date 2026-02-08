<script lang="ts" setup>
defineProps({
  label: {
    required: true,
    type: String,
  },
});
</script>

<template>
  <span class="custom-chip">
    {{ label }}
  </span>
</template>

<style lang="scss" scoped>
.custom-chip {
  border: 1px solid rgb(0 0 0 / 25%);
  border-radius: 4px;
  flex-shrink: 0;
  font-size: 1.1rem;
  line-height: 1;
  padding: 0.1rem 0.4rem;
  white-space: nowrap;
}
</style>
