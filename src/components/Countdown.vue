<script setup lang="ts">
import { ref, computed } from 'vue';

const countdownDate = new Date('2024-06-23');
const currentTime = ref(new Date());

const days = computed(() => {
  const timeDifference = countdownDate - currentTime.value;
  return Math.floor(timeDifference / (1000 * 60 * 60 * 24));
});

const hours = computed(() => {
  const timeDifference = countdownDate - currentTime.value;
  return Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
});

const minutes = computed(() => {
  const timeDifference = countdownDate - currentTime.value;
  return Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
});

const seconds = computed(() => {
  const timeDifference = countdownDate - currentTime.value;
  return Math.floor((timeDifference % (1000 * 60)) / 1000);
});

setInterval(() => {
  currentTime.value = new Date();
}, 1000);
</script>

<template>
  <div class="flex gap-5 justify-center">
    <div>
      <span class="countdown text-4xl">
        <span :style="`--value: ${days}`"></span>
      </span>
      days
    </div>
    <div>
      <span class="countdown text-4xl">
        <span :style="`--value: ${hours}`"></span>
      </span>
      hours
    </div>
    <div>
      <span class="countdown text-4xl">
        <span :style="`--value: ${minutes}`"></span>
      </span>
      min
    </div>
    <div>
      <span class="countdown text-4xl">
        <span :style="`--value: ${seconds}`"></span>
      </span>
      sec
    </div>
  </div>
</template>
