//import axios from 'axios'

import axios from "axios"

const state = {
    forks:[],
    exists: Boolean
}

const getters = {
    allForks: (state) => state.forks,
    existence: (state) => state.exists
}

const actions={
    async Search({ commit }, repository) {
        try{const response = await axios.get("https://api.github.com/repos/"+repository+"/forks");
        commit('searchData',response.data);
        commit('existing', true);
        } catch (err){
            commit('searchData','');
            commit('existing', false);
        }
    }
}

const mutations = {
    searchData: (state, forks) => (state.forks=forks),
    existing: (state, exists) => (state.exists=exists)
}

export default {
    state,
    getters,
    actions,
    mutations
}