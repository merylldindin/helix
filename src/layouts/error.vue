<template>
  <div class="error-layout">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.error-layout {
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  position: fixed;
  width: 100%;
}
</style>
