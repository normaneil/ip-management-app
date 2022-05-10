<template>
  <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
    <tbody>
      <tr
        v-for="item in items"
        :key="item.ID"
        class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
      >
        <th
          scope="row"
          class="
            px-6
            py-4
            font-medium
            text-gray-900
            dark:text-white
            whitespace-nowrap
          "
        >
          {{ item.Name }}
        </th>
        <td class="px-6 py-4">
          {{ item.Sales }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "table-list",
  props: ["items"],
};
</script>
