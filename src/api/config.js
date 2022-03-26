// const axios = require("axios").default;
import { setup } from "axios-cache-adapter";
import VueCookies from "vue-cookies";

const api = setup({
  // `axios` options
  baseURL: process.env.VUE_APP_API_URL,
  // `axios-cache-adapter` options
  cache: {
    maxAge: 3 * 1000
  }
});

//  add token on header if token is exist
api.interceptors.request.use(function(config) {
  const token = VueCookies.get("userToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export { api };
