/* eslint-disable */
import { api } from "@/api/config";
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
  async updateIpAddress(data) {
    // console.log("data", data);
    return await api
      .put(`/ip-address/${data.id}?label=${data.label}`)
      .catch(function(error) {
        return error.response;
      });
  },
};
