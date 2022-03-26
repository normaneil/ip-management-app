<template>
  <div id="app">
    <div
      class="text-4xl justify-center flex items-top h-screen"
      v-if="!isLogin"
    >
      <Login></Login>
    </div>
    <div v-if="isLogin" class="m-5">
      <Home />
    </div>
  </div>
</template>
<script>
import Login from "@/components/Login.vue";
import Home from "@/components/Home.vue";
export default {
  name: "App",
  components: {
    Login,
    Home,
  },
  data() {
    return {
      isLogin: false,
    };
  },
  mounted() {
    let token = window.localStorage.getItem("userToken");
    // console.log("token", token);
    this.isLogin = token ? true : false;
  },
};
</script>
