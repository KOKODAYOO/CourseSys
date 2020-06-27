import Vue from 'vue'
import Vuex from 'vuex'

//挂载Vuex
Vue.use(Vuex)

//创建VueX对象
const store = new Vuex.Store({
    state:{
        name:"User",
        level:0,
    },
    mutations:{
        setname(state,name){
            state.name = name;
        },
        setlevel(state,level){
            state.level = level;
        }
    }
})

export default store