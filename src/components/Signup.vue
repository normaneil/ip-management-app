<template>
  <div class="w-full max-w-lg">
    <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h4 class="text-center text-lg font-bold">SIGN UP</h4>
      <div class="mb-4">
        <label class="block text-gray text-lg font-bold mb-2" for="name">
          Name
        </label>
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray text-lg leading-tight focus:outline-none focus:shadow-outline"
          v-model="form.name"
          type="text"
          placeholder="Name"
        />
      </div>
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
        />
      </div>
      <div class="mb-6">
        <label
          class="block text-gray-700 text-lg font-bold mb-2"
          for="c_password"
        >
          Confirm Password
        </label>
        <input
          class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 text-lg mb-3 leading-tight focus:outline-none focus:shadow-outline"
          v-model="form.c_password"
          type="password"
        />
      </div>
      <div class="flex items-center justify-between">
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
          :disabled="isDisabled"
          @click="handleSubmit()"
        >
          Sign Up
        </button>
        <a
          class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
          href="#"
          @click.prevent="signin"
        >
          Sign In
        </a>
      </div>
    </form>
    <ToastSuccess v-if="ifAdded" :toast_text="toast_text"></ToastSuccess>
  </div>
</template>

<script>
import api from "@/api";
import ToastSuccess from "@/components/ToastSuccess.vue";
export default {
  name: "VueformDemo",
  emits: ["signin"],
  components: {
    ToastSuccess
  },
  data() {
    return {
      form: {
        name: "",
        email: "",
        password: "",
        c_password: ""
      },
      ifAdded: false,
      toast_text: "Registered successfully",
      isDisabled: false
    };
  },

  methods: {
    async handleSubmit() {
      this.isDisabled = true;
      const result = await api.register(this.form);
      console.log(result.data.data);
      if (result) {
        if (result.data.success) {
          // console.log(result.data.data);

          this.ifAdded = true;
          setTimeout(() => {
            // window.location.href = "/";
            this.$emit("signin");
          }, 2000);
        } else {
          this.isDisabled = false;
          alert(JSON.stringify(result.data.message));
        }
      }
    },
    signin() {
      this.$emit("signin");
    }
  }
};
</script>
