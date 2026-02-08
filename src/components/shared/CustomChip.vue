<script lang="ts" setup>
defineProps({
  label: {
    required: true,
    type: String,
  },
});
</script>

<template>
  <span class="custom-chip text-2">
    {{ label }}
  </span>
</template>

<style lang="scss" scoped>
.custom-chip {
  border: 1px solid rgb(0 0 0 / 25%);
  border-radius: 4px;
  flex-shrink: 0;
  line-height: 1;
  padding: 0.2rem 0.6rem;
  white-space: nowrap;
}
</style>
