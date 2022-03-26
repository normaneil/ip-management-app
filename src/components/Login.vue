<template>
  <div class="w-full w-m-ws">
    <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div class="mb-4">
        <label class="block text-gray text-lg font-bold mb-2" for="email">
          Email
        </label>
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray text-lg leading-tight focus:outline-none focus:shadow-outline"
          v-model="form.email"
          type="text"
          placeholder="Username"
        />
      </div>
      <div class="mb-6">
        <label
          class="block text-gray-700 text-lg font-bold mb-2"
          for="password"
        >
          Password
        </label>
        <input
          class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 text-lg mb-3 leading-tight focus:outline-none focus:shadow-outline"
          v-model="form.password"
          type="password"
          placeholder="******************"
        />
      </div>
      <div class="flex items-center justify-between">
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
          @click="handleSubmit()"
        >
          Sign In
        </button>
        <a
          class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
          href="#"
        >
          Sign Up
        </a>
      </div>
    </form>
  </div>
</template>

<script>
import api from "@/api";
export default {
  name: "VueformDemo",
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
    };
  },

  methods: {
    async handleSubmit() {
      const result = await api.login(this.form);
      if (result) {
        if (result.data.success) {
          // console.log(result.data.data);
          window.localStorage.setItem("userToken", result.data.data.token);
          window.location.href = "/";
        } else {
          window.localStorage.removeItem("userToken");
          alert(JSON.stringify(result.data.message));
        }
      }
    },
  },
};
</script>
