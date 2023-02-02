<template>
  <div class="error-layout">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.error-layout {
  position: fixed;
  width: 100%;
  height: calc(100vh - env(safe-area-inset-bottom));
  overflow-y: hidden;
  display: flex;
  flex-direction: column;
}
</style>
