<template>
  <div class="search">
      <input type="text" id="text" placeholder="Введите имя репозитория, например: owner/repositoryName" ref="text" v-on:keyup.enter="search">
      <input type="button" id="search"  @click="search()">
  </div>
</template>

<script>
import {mapActions} from "vuex";
export default {
    methods:{
        ...mapActions(['Search']),
        search(){
            this.$router.push({ name: 'Search', query: { repository: this.$refs.text.value, page: 0 }});
            this.Search(this.$route.query.repository);
        }
    }
}
</script>

<style>
@media (min-width:700px) {
    #text{
        width:60%;
    }
}
@media (max-width:699px) {
    #text{
        width: 80%;
    }
}
.search{
    text-align: center;
    margin-top:5%;
    width: -webkit-fill-available;
}
#text{
    height: 25px;
    vertical-align:middle;
    padding: 0px;
}
#search{
    width: 29px;
    height: 29px;
    background-image: url("../assets/search.png");
    vertical-align:middle;
    background-repeat: round;
    margin-left: 1px;
}
</style>