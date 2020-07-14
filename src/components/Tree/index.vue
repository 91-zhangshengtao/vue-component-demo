<template>
  <ul class="tree">
    <li v-for="(item,index) in treedata" :key="index">
      <div class="ui-draggable ui-draggable-handle ui-droppable">
        {{item.text}}
      </div>
      <my-tree v-if="item.children && item.children.length>0" :treedata="item.children"></my-tree>
    </li>
  </ul>
</template>

<script>
export default {
  name: "myTree",
  props:{
    treedata:{
      type: [Array],
      default: () => []
    }
  },
  created(){
    console.log('treedata：', this.treedata)
  }
}
</script>