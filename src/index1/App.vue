<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">首页</router-link> |
      <router-link to="/remtest">remDemo</router-link>
      <router-link to="/scrolltest"> scrollDemo</router-link>
      <router-link to="/echarttest"> EchartDemo</router-link>
      <router-link to="/tree">Tree组件</router-link>
      <router-link to="/rsaTest">rsaTest组件</router-link>
      <router-link to="/observe">响应式</router-link>
    </div>
    <router-view />
  </div>
</template>
<script>
import Scrollview from '@components/Scrollview/index-not-body.vue'
import { px2rem } from '@styles/rem_function.js'
export default {
  name: 'Scrolltestest',
  components: {
      Scrollview: Scrollview
  },
  data() {
    return {
        listData:[1,2,3,4,5,6,7,8,9,10],
        remHeight: px2rem(300)
    }
  },
  mounted(){
    //  console.log('scrollTop：',document.documentElement.scrollTop , document.body.scrollTop)
    // //   document.documentElement.scrollTop = 0
    // if(document.documentElement.scrollTop){
    //     document.documentElement.scrollTop = 0
    // }else{
    //     document.body.scrollTop = 0
    // }
  }
}  
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  /* padding: 30px; */
  padding-top: 64px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
  margin:5px 10px;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
