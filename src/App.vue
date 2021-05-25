<template>
  <div id="app">
    <router-view></router-view>
    <Search />
    <router-view name="search"></router-view>
  </div>
</template>

<script>
import Search from './components/Search'
export default {
  name: 'App',
  components: {
    Search
  }
}
</script>

<style>
@media (min-width:700px) {
  #app{
    width:80%;
    margin-left:10%;
  }
}
@media (max-width:699px) {
  #app{
    width:94%;
    margin-left:3%;
  }
}
body{
  background-color: #f8f9fd;
}
input[type="button" i]{
  cursor: pointer;
  background-color:azure;
  border-radius: 10%;
  border: 1px solid black;
}
</style>
