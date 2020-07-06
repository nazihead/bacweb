import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const mutationType = {
    CHANGE_LOGIN_STATE:"CHANGE_LOGIN_STATE",
    SET_USERINFO:"SET_USERINFO"
}

const state={
    isLogin:false,
    userInfo:{}
}
const getters={
    isLogin:state=>state.isLogin,
    userInfo:state=>state.userInfo
}
const mutations={
    [mutationType.CHANGE_LOGIN_STATE](state,islogin){
        state.isLogin=islogin
    },
    [mutationType.SET_USERINFO](state,userInfo){
        state.userInfo=userInfo
    },
}
const actions = {
    changeLoginState:({commit},isLogin)=>{
        commit(mutationType.CHANGE_LOGIN_STATE,isLogin)
    },
    setUserInfo:({commit},userInfo)=>{
        commit(mutationType.SET_USERINFO,userInfo)
    },
    clearCurrentState:({commit},userInfo)=>{
        commit(mutationType.SET_USERINFO,{})
        commit(mutationType.CHANGE_LOGIN_STATE,false)
    },
}
const showLogs = store => {
    store.subscribe((mutation, state) => {
      console.log('mutation', mutation, 'state', state)
    })
  }
  
  
export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions,
    plugins:[showLogs]
})