<script>
import api from "@/api";
import _ from "lodash";
import TreeMenu from "@/components/players/TreeMenu.vue";

export default {
  name: "team",
  components: {
    TreeMenu,
  },
  data() {
    return {
      form: {
        id: 1,
      },
      item: null,
      head: {
        Name: "",
        ID: null,
      },
      team_sales: 0,
      members: [],
      tree: [],
    };
  },
  methods: {
    async search() {
      const result = await api.getTeam(this.form);
      // console.log(result);
      if (result.status == 200) {
        // console.log(result.data);
        this.item = result.data;
        this.head = result.data.Head;
        this.team_sales = result.data.TeamSales
          ? result.data.TeamSales.toLocaleString()
          : 0;
        // this.members = result.data.Memeber;
        let arr = result.data.Memeber;
        // let members = [];
        let data = [];
        // members.push({ Level: 0, Player: this.head });
        data.push({
          id: this.head.ID,
          Name: this.head.Name,
          parent_id: this.head.Pid,
          Sales: this.head.Sales,
          name: this.head.Name,
          text: this.head.Name,
          level: 0,
        });
        arr.forEach((item) => {
          // console.log(item);
          data.push({
            id: item.Player.ID,
            Name: item.Player.Name,
            parent_id: item.Player.Pid,
            Sales: item.Player.Sales,
            name: item.Player.Name,
            text: item.Player.Name,
            level: item.Level,
          });
          // members.push({ Level: item.Level });
        });
        // console.log(arr);
        // console.log(members);
        // console.log("data", data);

        // ID: 939
        // Name: "Aaliyah Hartmann"
        // Pid: 9
        // Sales: 79427
        // children: []
        // name: "Aaliyah Hartmann ID: 939 PID: 9"
        // nodes: []
        // text: "Aaliyah Hartmann ID: 939 PID: 9"
        // let tree = this.unflatten(data, data[1]);
        this.tree = this.nest(data, data[0].id);
        // console.log("Tree", tree);
      }
    },
    unflatten(array, parent, tree) {
      // console.log("Array", array);
      tree = typeof tree !== "undefined" ? tree : [];
      parent = typeof parent !== "undefined" ? parent : { ID: 0 };
      console.log("parent", parent);
      var children = _.filter(array, function (child) {
        return child.Pid == parent.ID;
      });
      console.log("children", children);

      if (!_.isEmpty(children)) {
        if (parent.ID == 0) {
          tree = children;
        } else {
          parent["nodes"] = children;
        }
        _.each(children, function (child) {
          this.unflatten(array, child);
          // console.log("child", child);
        });
      }

      return tree;
    },

    nest(items, id = null, link = "parent_id") {
      let result = items
        .filter((item) => item[link] === id)
        .map((item) => ({ ...item, nodes: this.nest(items, item.id) }));
      // console.log(result);
      return result;
    },
  },
};
</script>

<template>
  <div>
    <div class="flex flex-wrap text-center items-center justify-center">
      <div>
        <input
          class="
            appearance-none
            block
            w-full
            bg-gray-200
            text-gray-700
            border border-blue-500
            py-3
            px-4
            leading-tight
            focus:outline-none focus:bg-white
            rounded
          "
          type="number"
          min="1"
          v-model="form.id"
          placeholder="Team ID "
        />
      </div>
      <div class="ml-2">
        <button
          class="
            bg-blue-500
            hover:bg-blue-700
            text-white text-sm
            font-bold
            py-3
            px-4
            rounded
            focus:outline-none focus:shadow-outline
            w-full
          "
          type="button"
          @click="search()"
        >
          Search
        </button>
      </div>
    </div>

    <div>
      <!-- <tree-view :tree="tree" :expanded="true"></tree-view> -->
      <!-- <ul>
        <li>Head: {{ head.Name }}</li>
        <li v-for="item in tree" :key="item.id">
          {{ item.name }} {{ item.level }}*

          <div v-if="item.nodes.length > 0">
            <tree-list :items="item.nodes" :depth="0"></tree-list>
          </div>
        </li>
      </ul> -->

      <tree-menu
        :nodes="tree"
        :depth="0"
        :label="head.Name"
        :level="null"
      ></tree-menu>
    </div>
  </div>
</template>
