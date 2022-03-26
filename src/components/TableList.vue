<template>
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
</template>

<script>
export default {
  name: "table-list",
  props: ["items"],
  methods: {
    viewIpAddress(item) {
      this.$emit("view", item);
    }
  }
};
</script>
