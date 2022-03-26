<template>
  <div id="app">
    <div class="justify-center flex items-top h-screen" v-if="!isLogin">
      <Login v-if="!isSignUp" @signup="showSignup"></Login>
      <Signup v-if="isSignUp" @signin="showSignin"></Signup>
    </div>
    <div v-if="isLogin" class="m-5">
      <Home />
    </div>
  </div>
</template>
<script>
import Login from "@/components/Login.vue";
import Signup from "@/components/Signup.vue";
import Home from "@/components/Home.vue";
export default {
  name: "App",
  components: {
    Login,
    Signup,
    Home,
  },
  data() {
    return {
      isLogin: false,
      isSignUp: false,
    };
  },
  mounted() {
    let token = window.localStorage.getItem("userToken");
    // console.log("token", token);
    this.isLogin = token ? true : false;
  },
  methods: {
    showSignup() {
      this.isSignUp = true;
    },
    showSignin() {
      this.isSignUp = false;
    },
  },
};
</script>
