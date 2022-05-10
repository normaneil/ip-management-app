<template>
  <div>
    <ul>
      <li v-for="item in players" :key="item.ID" class="mb-5">
        {{ item.Name }}
        <span
          class="
            inline-block
            py-1.5
            px-2.5
            leading-none
            text-center
            whitespace-nowrap
            align-baseline
            bg-blue-600
            text-white
            rounded
            text-xs
          "
        >
          ID: {{ item.ID }}
        </span>
        <Player :item="item" :items="items" />
      </li>
    </ul>
  </div>
</template>
<style >
/**
 * Framework starts from here ...
 * ------------------------------
 */

.tree,
.tree ul {
  margin: 0 0 0 1em; /* indentation */
  padding: 0;
  list-style: none;
  color: #369;
  position: relative;
}

.tree ul {
  margin-left: 0.5em;
  color: #369;
} /* (indentation/2) */

.tree span {
  margin-left: 1.5em;
  font-weight: bold;
}
.tree:before,
.tree ul:before {
  content: "";
  display: block;
  width: 0;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  border-left: 1px solid;
}

.tree li {
  margin: 0;
  padding: 0 1.5em; /* indentation + .5em */
  line-height: 2em; /* default list item's `line-height` */
  /* font-weight: bold; */
  position: relative;
}

.tree li:before {
  content: "";
  display: block;
  width: 10px; /* same with indentation */
  height: 0;
  border-top: 1px solid;
  margin-top: -1px; /* border top width */
  position: absolute;
  top: 1em; /* (line-height/2) */
  left: 0;
}

.tree li:last-child:before {
  background: white; /* same with body background */
  height: auto;
  top: 1em; /* (line-height/2) */
  bottom: 0;
}
</style>
<script>
import _ from "lodash";
import Player from "@/components/players/Player.vue";
export default {
  name: "players",
  props: ["items"],
  components: {
    Player,
  },
  computed: {
    players() {
      return _.sortBy(this.items, (o) => o.Name);
    },
  },
};
</script>
