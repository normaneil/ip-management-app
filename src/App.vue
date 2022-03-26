<template>
  <div id="app">
    <div
      class="text-4xl justify-center flex items-top h-screen"
      v-if="!isLogin"
    >
      <VueformDemo></VueformDemo>
    </div>
    <div v-if="isLogin" class="m-5">
      <Items />
    </div>
  </div>
</template>
<script>
import VueformDemo from "@/components/VueformDemo.vue";
import Items from "@/components/Items.vue";
import VueCookies from "vue-cookies";
export default {
  name: "App",
  components: {
    VueformDemo,
    Items,
  },
  data() {
    return {
      isLogin: false,
    };
  },
  mounted() {
    this.isLogin = VueCookies.get("userToken") ? true : false;
  },
};
</script>
