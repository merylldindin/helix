<script lang="ts" setup>
import { onMounted, ref } from "vue";

const cProps = defineProps({
  delay: {
    default: 0,
    type: Number,
  },
  title: {
    required: true,
    type: String,
  },
});

const SHUFFLING_INTERVAL = 50;
const UNSHUFFLING_INTERVAL = 10;

const CHARACTERS_LIST =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

const shuffleIndex = ref<number>(0);
const shuffleTitle = ref<string>(cProps.title);

onMounted(() => {
  const shuffleAnimation = setInterval(() => {
    for (let index = shuffleIndex.value; index < cProps.title.length; index += 1) {
      shuffleTitle.value =
        shuffleTitle.value.slice(0, Math.max(0, index)) +
        CHARACTERS_LIST[Math.floor(Math.random() * CHARACTERS_LIST.length)] +
        shuffleTitle.value.slice(index + 1);
    }
  }, SHUFFLING_INTERVAL);

  setTimeout(() => {
    const unshuffleAnimation = setInterval(() => {
      if (shuffleIndex.value < cProps.title.length) {
        shuffleTitle.value =
          shuffleTitle.value.slice(0, Math.max(0, shuffleIndex.value)) +
          cProps.title[shuffleIndex.value] +
          shuffleTitle.value.slice(shuffleIndex.value + 1);
        shuffleIndex.value += 1;
      } else {
        clearInterval(shuffleAnimation);
        clearInterval(unshuffleAnimation);
      }
    }, UNSHUFFLING_INTERVAL);
  }, cProps.delay);
});
</script>

<template>
  <p class="text-2 text-ellipsis">
    {{ shuffleTitle }}
  </p>
</template>
