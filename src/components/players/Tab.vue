<template>
  <div class="flex flex-wrap items-center justify-center pb-5 pt-5">
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
        placeholder="Add players"
        v-model="form.num"
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
        @click="add()"
      >
        {{ btn_txt }}
      </button>
    </div>
    <div class="w-full">
      <ul class="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row">
        <li class="-mb-px mr-2 last:mr-0 flex-auto text-center">
          <a
            class="
              text-xs
              font-bold
              uppercase
              px-5
              py-3
              shadow-lg
              rounded
              block
              leading-normal
            "
            v-on:click="toggleTabs(1)"
            v-bind:class="{
              'text-pink-600 bg-white': openTab !== 1,
              'text-white bg-pink-600': openTab === 1,
            }"
          >
            Players (Flat view)
          </a>
        </li>
        <li class="-mb-px mr-2 last:mr-0 flex-auto text-center">
          <a
            class="
              text-xs
              font-bold
              uppercase
              px-5
              py-3
              shadow-lg
              rounded
              block
              leading-normal
            "
            v-on:click="toggleTabs(2)"
            v-bind:class="{
              'text-pink-600 bg-white': openTab !== 2,
              'text-white bg-pink-600': openTab === 2,
            }"
          >
            Players (Tree view)
          </a>
        </li>
        <li class="-mb-px mr-2 last:mr-0 flex-auto text-center">
          <a
            class="
              text-xs
              font-bold
              uppercase
              px-5
              py-3
              shadow-lg
              rounded
              block
              leading-normal
            "
            v-on:click="toggleTabs(3)"
            v-bind:class="{
              'text-pink-600 bg-white': openTab !== 3,
              'text-white bg-pink-600': openTab === 3,
            }"
          >
            Team
          </a>
        </li>
      </ul>
      <div
        class="
          relative
          flex flex-col
          min-w-0
          break-words
          bg-white
          w-full
          mb-6
          shadow-lg
          rounded
        "
      >
        <div class="px-4 py-5 flex-auto flex-1">
          <div class="tab-content tab-space">
            <div v-bind:class="{ hidden: openTab !== 1, block: openTab === 1 }">
              <TableList v-if="!loading" :items="items"></TableList>
              <div v-if="loading">Loading...</div>
            </div>
            <div v-bind:class="{ hidden: openTab !== 2, block: openTab === 2 }">
              <Players v-if="!loading" :items="items" />
            </div>
            <div v-bind:class="{ hidden: openTab !== 3, block: openTab === 3 }">
              <Team v-if="!loading" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import players from "@/data/players.json";
import api from "@/api";
import TableList from "@/components/players/TableList.vue";
import Players from "@/components/players/Players.vue";
import Team from "@/components/players/Team.vue";

export default {
  name: "pink-tabs",
  components: {
    TableList,
    Players,
    Team,
  },
  data() {
    return {
      openTab: 1,
      items: [],
      loading: true,
      btn_txt: "Add",
      form: {
        num: null,
      },
    };
  },
  mounted() {
    this.getPlayers();
  },
  methods: {
    toggleTabs: function (tabNumber) {
      this.openTab = tabNumber;
    },
    async getPlayers() {
      this.loading = true;
      this.btn_txt = "loading...";
      const result = await api.getPlayers();
      if (result.status == 200) {
        this.items = result.data;
        this.loading = false;
        this.btn_txt = "Add";
      }
    },
    async add() {
      console.log("You clicked search button");

      if (this.form.num) {
        this.loading = true;
        this.btn_txt = "loading...";
        const result = await api.addPlayers(this.form);
        if (result && result.data == "success") {
          this.getPlayers();
        }
      }
    },
  },
};
</script>