<template>
  <ul>
    <li v-for="item in items" :key="item.ID">
      <Player :items="item" />
    </li>
  </ul>
</template>

<script>
import Player from "@/components/players/Player.vue";
export default {
  name: "tree",
  props: ["items"],
  components: {
    Player,
  },
};
</script>
