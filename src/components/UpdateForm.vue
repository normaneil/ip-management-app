<template>
  <form class="bg-white px-8 pt-6 pb-8 mb-4">
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
        IP ADDRESS
      </label>
      <input
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        v-model="form.ip_add"
        disabled
        type="text"
      />
    </div>
    <div class="mb-6">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
        LABEL
      </label>
      <input
        class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
        v-model="form.label"
        type="text"
      />
    </div>
    <div class="flex items-center justify-between">
      <button
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="button"
        @click="updateIpAddress()"
      >
        Update
      </button>
      <button
        class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="button"
        @click="close()"
      >
        Close
      </button>
    </div>
    <div class="mb-6 mt-6">
      <ol class="relative border-l border-gray-200 dark:border-gray-700">
        <li class="mb-10 ml-4" v-for="item in item.histories" :key="item.id">
          <div
            class="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"
          ></div>
          <time
            class="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500"
            >{{ item.created_at }}</time
          >
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
            {{ item.user }}
          </h3>
          <p
            class="mb-4 text-base font-normal text-gray-500 dark:text-gray-400"
          >
            {{ item.history }}
          </p>
        </li>
      </ol>
    </div>
  </form>
</template>

<script>
export default {
  name: "update-form",
  props: ["item"],
  emits: ["update", "close"],
  data() {
    return {
      form: {
        id: null,
        ip_add: "",
        label: "",
      },
    };
  },
  mounted() {
    this.form.id = this.item.id;
    this.form.ip_add = this.item.ip_add;
    this.form.label = this.item.label;
  },
  methods: {
    updateIpAddress() {
      this.$emit("update", this.form);
      this.form.id = null;
      this.form.ip_add = "";
      this.form.label = "";
    },
    close() {
      this.$emit("close");
    },
  },
};
</script>
