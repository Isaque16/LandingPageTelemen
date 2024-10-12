<template>
  <div :class="`flex flex-col justify-center ${toggleDiv1Class}`">
    <div
      :class="`bg-white p-6 rounded-b-none rounded-lg md:rounded-b-lg shadow-md w-full md:w-1/2 flex flex-col items-center justify-center ${toggleDiv2Class}`"
    >
      <h3 class="text-4xl text-center mb-4 font-bold text-purple-800">
        {{ modelo }}
      </h3>
      <ul class="space-y-2 text-black text-2xl">
        <li v-for="(it, index) in items" :key="index" class="flex items-center">
          <span class="text-2xl" name="modelItems">{{ it }}</span>
        </li>
      </ul>
      <div
        name="greenbtn"
        class="bg-green-400 text-center p-2 mt-6 rounded-xl w-40 cursor-pointer mx-auto"
      >
        <nuxt-link
          :to="{ path: '/agendamento', query: { modelo: props.modelo } }"
          ><span class="text-white text-xl"
            >💸 Valor: R${{ preco }},00</span
          ></nuxt-link
        >
      </div>
    </div>
    <nuxt-img
      :src="`./images/${toggleImage}.jpg`"
      class="bg-center bg-cover w-full md:w-1/3 h-full"
    ></nuxt-img>
  </div>
</template>

<script setup lang="ts">
import anime from "animejs";

const props = defineProps<{
  div1Class: string;
  div2Class: string;
  divImage: string;
  modelo: string;
  items: string[];
  preco: number;
}>();

const toggleDiv1Class = computed<string>(() =>
  props.div1Class === "aovivo" ? "md:flex-row md:w-full" : "md:flex-row-reverse"
);
const toggleDiv2Class = computed<string>(() =>
  props.div2Class === "aovivo" ? "md:rounded-r-none" : "md:rounded-l-none"
);
const toggleImage = computed<string>(() =>
  props.divImage === "aovivo" ? "fotocarro1" : "fotocarro2"
);

onMounted(() => {
  const handleIntersection = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        document.getElementsByName("greenbtn").forEach((btn) => {
          anime({
            targets: btn,
            boxShadow: [
              "0 0 5px rgba(0, 255, 0, 0.5)",
              "0 0 20px rgba(0, 255, 0, 1)",
            ],
            direction: "alternate",
            duration: 1000,
            easing: "easeInOutQuad",
          });
        });
      }
    });
  };
  const observer = new IntersectionObserver(handleIntersection, {
    threshold: 0.3,
  });
  document
    .getElementsByName("greenbtn")
    .forEach((btn) => observer.observe(btn));
});
</script>
