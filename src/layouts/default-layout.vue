<template>
  <div class="default-layout">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.default-layout {
  width: 100%;
  height: 100%;
  position: fixed;
  display: flex;
  flex-direction: column;
  overflow-y: hidden;

  @include xs-only {
    max-height: calc(100vh - $browser-navbar-offset);
  }
}
</style>
