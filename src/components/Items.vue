<template>
  <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <div v-if="!isModalVisible">
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

      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead
          class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
        >
          <tr>
            <th scope="col" class="px-6 py-3">
              IP
            </th>
            <th scope="col" class="px-6 py-3">
              Label
            </th>
            <th scope="col" class="px-6 py-3">
              <span class="sr-only">Edit</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="task in items"
            :key="task.id"
            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
          >
            <th
              scope="row"
              class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
            >
              {{ task.ip_add }}
            </th>
            <td class="px-6 py-4">
              {{ task.label }}
            </td>

            <td class="px-6 py-4 text-right">
              <a
                href="#"
                class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                @click.prevent="viewIpAddress(task)"
                >View</a
              >
            </td>
          </tr>
        </tbody>
      </table>

      <div
        id="toast-success"
        class="flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800 absolute top-5 right-5"
        role="alert"
        v-if="ifAdded"
      >
        <div
          class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200"
        >
          <svg
            class="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </div>
        <div class="ml-3 text-sm font-normal">Item added successfully.</div>
        <button
          type="button"
          class="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
          data-dismiss-target="#toast-success"
          aria-label="Close"
        >
          <span class="sr-only">Close</span>
          <svg
            class="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </button>
      </div>
    </div>
    <div v-if="isModalVisible">
      <form class="bg-white px-8 pt-6 pb-8 mb-4">
        <div class="mb-4">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            for="username"
          >
            IP <ADDress></ADDress>
          </label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            v-model="updateForm.ip_add"
            disabled
            type="text"
          />
        </div>
        <div class="mb-6">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            for="password"
          >
            LABEL
          </label>
          <input
            class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            v-model="updateForm.label"
            type="text"
          />
        </div>
        <div class="flex items-center justify-between">
          <button
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            @click="updateIpAddress()"
          >
            Update
          </button>
          <button
            class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            @click="isOpen = false"
          >
            Close
          </button>
        </div>
        <div class="mb-6 mt-6">
          <ol class="relative border-l border-gray-200 dark:border-gray-700">
            <li
              class="mb-10 ml-4"
              v-for="item in item.histories"
              :key="item.id"
            >
              <div
                class="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"
              ></div>
              <time
                class="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500"
                >{{ item.created_at }}</time
              >
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                {{ item.user }}
              </h3>
              <p
                class="mb-4 text-base font-normal text-gray-500 dark:text-gray-400"
              >
                {{ item.history }}
              </p>
            </li>
          </ol>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import api from "@/api";
export default {
  data() {
    return {
      items: [],
      form: {
        ip_add: "",
        label: "",
      },
      updateForm: {
        id: null,
        ip_add: "",
        label: "",
      },
      ifAdded: false,
      isOpen: false,
      item: null,
    };
  },
  computed: {
    isModalVisible() {
      return this.isOpen;
    },
  },
  mounted() {
    this.getIpAddresses();
  },
  methods: {
    async getIpAddresses() {
      const result = await api.getIpAddresses();
      //   console.log(result.data.data);
      this.items = result.data.data.length > 0 ? result.data.data : [];
    },
    async addIpAddress() {
      const result = await api.addIpAddress(this.form);
      //   console.log(result.data);
      if (result.data.success) {
        this.ifAdded = true;
        this.form.ip_add = "";
        this.form.label = "";
        this.getIpAddresses();

        setTimeout(() => {
          this.ifAdded = false;
        }, 2000);
      } else {
        alert(JSON.stringify(result.data.message));
      }
    },
    viewIpAddress(item) {
      this.item = item;
      this.updateForm.id = item.id;
      this.updateForm.ip_add = item.ip_add;
      this.updateForm.label = item.label;
      this.isOpen = true;
    },
    updateIpAddress() {
      console.log(this.updateForm);
    },
  },
};
</script>

<style>
.fade-enter {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 500ms ease-out;
}

.fade-leave-to {
  opacity: 0;
}
</style>
