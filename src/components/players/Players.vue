<template>
  <div>
    <div>
      <tree-view :tree="players" :expanded="true"></tree-view>
      <!-- <v-treeview open-all :items="players"></v-treeview> -->
    </div>
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
    getNestedChildren(arr, parent) {
      console.log(parent);
      console.log(arr);
      var out = [];
      for (var i in arr) {
        // console.log(arr[i].Pid);
        if (arr[i].Pid == parent) {
          var children = this.getNestedChildren(arr, arr[i].id);

          if (children.length) {
            arr[i].children = children;
          }
          out.push(arr[i]);
        }
      }
      return out;
    },
    list_to_tree(list) {
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
