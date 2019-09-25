/* eslint-disable no-console */
import *as types from './mutation-types'
export default {
    [types.ADD_ID_ISCHANGE](state,parameter){
        state.newID=parameter.id;
        state.newShow=parameter.isShow;
        state.songIds=parameter.songIds
        state.index=parameter.Index
    },
    [types.ADD_HOST_NAME](state,name){
        state.hostName=name
    },
    [types.ADD_INDEX](state){
        state.index++
    },
    [types.REDUCE_INDEX](state){
        state.index--
    },
    [types.GET_INDEX](state){
        state.index=0
    },
    [types.ADD_SONG](state,list){
        state.collectList.push(list.songList)
        state.songIndex=list.index
        console.log(state.songIndex)
        console.log(state.collectList)
    }
}