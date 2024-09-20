<template>
  <li
    name="fadeBox"
    class="flex flex-col items-center bg-red-600 p-5 rounded-2xl"
  >
    <img :src="imageUrl" :alt="alt" name="svg" class="w-20" />
    <h3 class="text-2xl font-bold">{{ title }}</h3>
    <p>{{ text }}</p>
  </li>
</template>

<script lang="ts" setup>
import anime from "animejs";
import { onMounted } from "vue";

defineProps<{
  imageUrl: string;
  alt: string;
  title: string;
  text: string;
}>();

onMounted(() => {
  const handleIntersection = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        let fadeBoxes = anime.timeline({
          easing: "easeInOutExpo",
          duration: 750,
        });

        document.getElementsByName("fadeBox").forEach((box) => {
          fadeBoxes.add({
            targets: box,
            translateY: [100, 0],
            opacity: [0, 1],
            delay: anime.stagger(100, { start: 0 }),
          });
          observer.unobserve(box);
        });
      }
    });
  };
  const observer = new IntersectionObserver(handleIntersection, {
    threshold: 0.3,
  });
  document.getElementsByName("fadeBox").forEach((box) => observer.observe(box));
});
</script>
