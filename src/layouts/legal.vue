<template>
  <div class="legal-layout">
    <v-main>
      <v-container>
        <v-row>
          <v-col cols="12">
            <slot />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </div>
</template>

<style lang="scss" scoped>
.legal-layout {
  width: 100%;
  height: 100%;
}
</style>
