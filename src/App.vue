<template>
  <div id="app">
      <router-view />    
  </div>
</template>
<style scoped>
  @import url('~@/style/index.css');
  body{
  margin:0;
  padding:0;
}
</style>
<style lang="less">
@import '~@/style/common.css';
body{
  background-color: #F9F9F9;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
