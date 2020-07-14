<template>
  <div class="about">
    <h1>This is an about page</h1>
    <Tree :treedata="treedata" />
  </div>
</template>


<script>
import Tree from '../components/Tree'
export default {
  name: "About",
  components: {
    Tree,
  },
  data(){
    return {
      treedata:[
        {
          text:1,
          children:[
            {text:12},
            {text:13}
          ]
        },
        {text:3},
        {text:4}
      ]
    }
  },
  created(){
   
  }
}
</script>


