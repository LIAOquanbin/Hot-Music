import Vue from 'vue'
import Vuex, { Store } from 'vuex'
import mutations from './mutation'

Vue.use(Vuex)
const store=new Store({
    state:{
       newID:null,
       newShow:null,
       songIds:null,
       index:null,
       collectList:[],
       songIndex:null
    },
    mutations
})
export default store