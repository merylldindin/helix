<template>
  <div class="default-layout">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.default-layout {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
