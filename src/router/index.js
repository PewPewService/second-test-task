import Vue from 'vue'
import Router from 'vue-router'
import Welcome from '../views/Welcome'
import SearchResult from '../views/SearchResult'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Welcome',
      components:{
          default: Welcome
      }
    },
    {
        path: '/search',
        name: 'Search',
        components: {
            search: SearchResult
        }
    }
  ]
})