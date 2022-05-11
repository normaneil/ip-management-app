<template>
  <div class="tree-menu">
    <div class="label-wrapper">
      <div :style="indent" :class="labelClasses">
        <i v-if="nodes" class="fa" :class="iconClasses"></i>
        {{ label }} {{ level_display }}
      </div>
    </div>
    <tree-menu
      v-for="item in nodes"
      :key="item.id"
      :nodes="item.nodes"
      :label="item.name"
      :level="item.level"
      :depth="depth + 1"
    >
    </tree-menu>
  </div>
</template>

<script>
export default {
  name: "tree-menu",
  props: ["nodes", "label", "depth", "level"],
  computed: {
    iconClasses() {
      return {
        "fa-plus-square-o": !this.showChildren,
        "fa-minus-square-o": this.showChildren,
      };
    },
    labelClasses() {
      return { "has-children": this.nodes };
    },
    indent() {
      return { transform: `translate(${this.depth * 50}px)` };
    },
    level_display() {
      return this.level ? `level: ${this.level}` : "";
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
