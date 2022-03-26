<template>
  <div class="w-full w-m-ws">
    <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h4 class="text-center text-lg font-bold">LOG IN</h4>
      <div class="mb-4">
        <label class="block text-gray text-lg font-bold mb-2" for="email">
          Email
        </label>
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray text-lg leading-tight focus:outline-none focus:shadow-outline"
          v-model="form.email"
          type="email"
          placeholder="Email"
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
          :disabled="isDisabled"
          @click="handleSubmit()"
        >
          Sign In
        </button>
        <a
          class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
          href="#"
          @click.prevent="signup()"
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
  emits: ["signup"],
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
      isDisabled: false,
    };
  },

  methods: {
    async handleSubmit() {
      this.isDisabled = true;
      const result = await api.login(this.form);
      if (result) {
        if (result.data.success) {
          // console.log(result.data.data);
          this.isDisabled = false;
          window.localStorage.setItem("userToken", result.data.data.token);
          window.location.href = "/";
        } else {
          this.isDisabled = false;
          window.localStorage.removeItem("userToken");
          alert(JSON.stringify(result.data.message));
        }
      }
    },
    signup() {
      this.$emit("signup");
    },
  },
};
</script>
