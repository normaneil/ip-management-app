<template>
  <div id="app">
    <div class="overflow-x-auto sm:rounded-lg">
      <Tab />
    </div>
  </div>
</template>
<script>
import Tab from "@/components/players/Tab.vue";
export default {
  name: "App",
  components: {
    Tab,
  },
};
</script>
