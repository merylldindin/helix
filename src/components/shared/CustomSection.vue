<template>
  <section class="custom-section">
    <v-container>
      <v-row>
        <v-col cols="12">
          <slot />
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<style lang="scss" scoped>
.custom-section {
  padding: 12rem 0;

  @include sm-down {
    padding: 4rem 0;
  }
}
</style>
