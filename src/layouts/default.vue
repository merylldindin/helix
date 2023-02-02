<template>
  <div class="default-layout">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.default-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
