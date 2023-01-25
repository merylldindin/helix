<template>
  <div class="default-layout">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.default-layout {
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  position: fixed;
  width: 100%;
}
</style>
