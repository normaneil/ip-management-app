<template>
  <div>
    <div>
      <tree-view :tree="players" :expanded="true"></tree-view>
      <!-- <v-treeview open-all :items="players"></v-treeview> -->
    </div>
  </div>
</template>

<script>
import _ from "lodash";

// import Player from "@/components/players/Player.vue";
export default {
  name: "players",
  props: ["items"],

  computed: {
    members() {
      let items = _.sortBy(this.items, (o) => o.Name);

      let data = [];
      for (var i in items) {
        // console.log(items[i].Pid);
        items[
          i
        ].text = `${items[i].Name} ID: ${items[i].ID} PID: ${items[i].Pid}`;
        items[
          i
        ].name = `${items[i].Name} ID: ${items[i].ID} PID: ${items[i].Pid}`;
        data.push(items[i]);
      }
      return data;
    },
    players() {
      return this.list_to_tree(this.members);
    },
  },
  methods: {
    list_to_tree(list) {
      // console.log(list);
      var map = {},
        node,
        roots = [],
        i;

      for (i = 0; i < list.length; i += 1) {
        map[list[i].ID] = i; // initialize the map
        list[i].children = []; // initialize the children
        list[i].nodes = []; // initialize the children
      }

      for (i = 0; i < list.length; i += 1) {
        // console.log(list[i]);
        node = list[i];
        if (node.Pid) {
          // if you have dangling branches check that map[node.parentId] exists
          list[map[node.Pid]].children.push(node);
          list[map[node.Pid]].nodes.push(node);
        } else {
          roots.push(node);
        }
      }
      return roots;
    },
  },
};
</script>
