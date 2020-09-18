<template>
  <div class="home">
    <div>首页</div> 
    <span ref="msg">{{msg}}</span>
    <span>{{name}}</span>
    <el-button type="primary" @click="change">change</el-button>

  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  components: {
  },
  data(){
    return {
      msg:'init',
      name:'zhangsan'
    }
  },
  mounted() {
   
  },
  updated(){
    console.log('home-updated')
  },
  methods:{
    change(){
      // vue异步执行DOM更新
      this.msg = 'changemsg'
      this.name = 'lisi'
      setTimeout(() => {
        console.log('this.$refs.msg.innerHTML:',this.$refs.msg.innerHTML)
      }, 300);
      
      
    }
  }
}
</script>
