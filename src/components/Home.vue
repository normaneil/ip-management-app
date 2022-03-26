<template>
  <div class=" overflow-x-auto shadow-md sm:rounded-lg">
    <div class="text-right mb-2">
      <a
        href="#"
        class="text-xs text-blue-600 dark:text-blue-500 hover:underline"
        @click.prevent="logout()"
        >LOGOUT</a
      >
    </div>
    <div v-if="!isModalVisible">
      <AddForm @input="addIpAddress"></AddForm>
      <TableList @view="viewIpAddress" :items="items"></TableList>
      <ToastSuccess v-if="ifAdded" :toast_text="toast_text"></ToastSuccess>
    </div>
    <div v-if="isModalVisible">
      <UpdateForm
        @update="updateIpAddress"
        :item="item"
        @close="close"
      ></UpdateForm>
    </div>
  </div>
</template>
<script>
import api from "@/api";
import AddForm from "@/components/AddForm.vue";
import ToastSuccess from "@/components/ToastSuccess.vue";
import TableList from "@/components/TableList.vue";
import UpdateForm from "@/components/UpdateForm.vue";
export default {
  name: "home",
  components: {
    AddForm,
    ToastSuccess,
    TableList,
    UpdateForm,
  },
  data() {
    return {
      items: [],
      ifAdded: false,
      isOpen: false,
      item: null,
      toast_text: "Item added successfully",
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
      this.items = result.data.data.length > 0 ? result.data.data : [];
    },
    async addIpAddress(form) {
      const result = await api.addIpAddress(form);
      //   console.log(result.data);
      if (result.data.success) {
        this.toast_text = "Item added successfully";
        this.ifAdded = true;
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
      this.isOpen = true;
    },
    async updateIpAddress(updateForm) {
      const result = await api.updateIpAddress(updateForm);
      //   console.log(result);
      if (result.data.success) {
        this.toast_text = "Item updated successfully";
        this.ifAdded = true;
        this.isOpen = false;
        this.getIpAddresses();
        setTimeout(() => {
          this.ifAdded = false;
        }, 2000);
      } else {
        alert(JSON.stringify(result.data.message));
      }
    },
    logout() {
      window.localStorage.removeItem("userToken");
      window.location.href = "/";
    },
    close() {
      this.isOpen = false;
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
