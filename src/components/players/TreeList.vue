<template>
  <ul class="tree-menu" :style="indent">
    <li class="label-wrapper" v-for="item in items" :key="item.id">
      {{ item.name }} {{ item.level }}

      <div v-if="item.nodes.length > 0">
        <tree-list :items="item.nodes" :depth="depth + 1"></tree-list>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  name: "tree-list",
  props: ["items", "depth"],

  computed: {
    indent() {
      return { transform: `translate(${this.depth * 50}px)` };
    },
  },
};
</script>

<style lang="scss">
.tree-menu {
  .label-wrapper {
    padding-bottom: 10px;
    margin-bottom: 10px;
    border-bottom: 1px solid #ccc;
    .has-children {
      cursor: pointer;
    }
  }
}
</style>
