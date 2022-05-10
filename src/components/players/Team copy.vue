<script>
import api from "@/api";
export default {
  name: "team",
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
    };
  },
  methods: {
    async search() {
      const result = await api.getTeam(this.form);
      // console.log(result);
      if (result.status == 200) {
        console.log(result.data);
        this.item = result.data;
        this.head = result.data.Head;
        this.team_sales = result.data.TeamSales
          ? result.data.TeamSales.toLocaleString()
          : 0;
        this.members = result.data.Memeber;
      }
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
      <ul>
        <li>
          {{ head.Name }}
          <span
            v-if="head.ID"
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
            Team Sales: {{ team_sales }}
          </span>
        </li>
        <ul class="tree">
          <li v-for="item in members" :key="item.ID">
            <div>{{ item.Player.Name }}</div>
            <div>Level: {{ item.Level }}</div>
          </li>
        </ul>
      </ul>
    </div>
  </div>
</template>
<style scoped>
/**
 * Framework starts from here ...
 * ------------------------------
 */

.tree,
.tree ul {
  margin: 0 0 0 1em; /* indentation */
  padding: 0;
  list-style: none;
  /* color: #369; */
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
