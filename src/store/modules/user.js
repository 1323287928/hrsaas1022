import { getToken,setToken,removeToken } from "@/utils/auth"
import { login,getUserInfo,getUserDetailById} from "@/api/user"
const state={
token:getToken(),
userInfo:{}
}
const mutations={
  setToken(state,token){
    state.token=token
    setToken(token)
  },
  removeToken(state){
    state.token=null
    removeToken()
  },
  setUserInfo(state,result){
    state.userInfo=result
  },
  removeUserInfo(state){
    state.userInfo={}
  }
}
const actions={
  async login(context,data){
    const result=await login(data)
    context.commit("setToken",result)
  },
  async getUserInfo(context){
   const result=await getUserInfo()
   const  baseInfo= await getUserDetailById(result.userId)
   const obj={...result,...baseInfo}
   context.commit('setUserInfo',obj)
   return result
  },
  logout(context){
    context.commit("removeToken")
    context.commit("removeUserInfo")
  }
}
export default {
  namespaced:true,
  state,
  mutations,
  actions
}