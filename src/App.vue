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
    <router-view/>
  </div>
</template>

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
