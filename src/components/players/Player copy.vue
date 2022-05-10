<template>
  <ul class="tree">
    <span v-if="sales">Total Sales: {{ sales }} </span>
    <li v-for="item in players" :key="item.ID">{{ item }}</li>
  </ul>
</template>

<script>
import _ from "lodash";
export default {
  name: "player",
  props: ["item", "items"],
  computed: {
    players() {
      return this.items.filter((obj) => parseInt(obj.Pid) == this.item.ID);
    },
    sales() {
      let n = _.sumBy(this.players, "Sales");
      // return n.toLocaleString();
      return n;
    },
  },
};
</script>
