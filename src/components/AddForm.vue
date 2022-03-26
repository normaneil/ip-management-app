<template>
  <form class="w-full max-w-lg">
    <div class="flex -mx-3 mb-6 ">
      <div class="w-full px-3 mb-6 md:mb-0">
        <label
          class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          for="grid-first-name"
        >
          IP ADDRESS
        </label>
        <input
          class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
          id="grid-first-name"
          type="text"
          v-model="form.ip_add"
          placeholder="127.0.0.1"
        />
      </div>
      <div class="w-full  px-1">
        <label
          class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          for="grid-last-name"
        >
          LABEL
        </label>
        <input
          class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          id="grid-last-name"
          type="text"
          v-model="form.label"
          placeholder="localhost"
        />
      </div>
      <div class="w-full md:w-1/2 px-4">
        <label
          class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          for="grid-last-name"
        >
          &nbsp;
        </label>
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline w-full"
          type="button"
          @click="addIpAddress()"
        >
          Add
        </button>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  name: "add-form",
  emits: ["input"],
  data() {
    return {
      form: {
        ip_add: "",
        label: "",
      },
    };
  },
  methods: {
    addIpAddress() {
      this.$emit("input", this.form);
      this.form.ip_add = "";
      this.form.label = "";
    },
  },
};
</script>
