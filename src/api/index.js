/* eslint-disable */
import { api } from "@/api/config";
import VueCookies from "vue-cookies";
import _ from "lodash";

export default {
  async login(data) {
    // console.log("data", data);
    return await api.post(`/login/`, data).catch(function(error) {
      return error.response;
    });
  },
  async getIpAddresses() {
    return api.get(`/ip-address`).catch(function(error) {
      return error.response;
    });
  },
  async addIpAddress(data) {
    // console.log("data", data);
    return await api.post(`/ip-address/`, data).catch(function(error) {
      return error.response;
    });
  },
};
