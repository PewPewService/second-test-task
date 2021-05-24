import Vuex from 'vuex';
import Vue from 'vue';
import Search from './modules/search'

Vue.use(Vuex);

export default new Vuex.Store({
    modules:{
        Search
    }
});