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
        //commit('searchData',response.data);
        commit({
            type: "searchData",
            data: response.data,
            exists: true
        });
        //commit('existing', true);
        } catch (err){
            //commit('searchData','');
            commit({
                type: "searchData",
                data: "",
                exists: false
            })
            //commit('existing', false);
        }
    }
}

const mutations = {
    //searchData: (state, forks) => (state.forks=forks),
    searchData (state, forks){
        state.forks = forks.data;
        state.exists = forks.exists;
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}