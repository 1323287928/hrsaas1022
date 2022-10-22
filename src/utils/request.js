import axios from "axios";
import store from "@/store";
import { Message } from "element-ui";
const service=axios.create({
baseURL:process.env.VUE_APP_BASE_API,
// baseURL:"http://ihrm-java.itheima.net/",
timeout:5000
})
console.log(process.env.VUE_APP_BASE_API)
service.interceptors.request.use(
config=>{
  if(store.getters.token){
    config.headers['Authorization'] = `Bearer ${store.getters.token}`
  }
  return config
},error=>{
  return new Promise.reject(error)
})
service.interceptors.response.use(response=>{ 
const {success,message,data}=response.data
if(success){
  return data
}else{
  Message.error(message)
  return Promise.reject(new Error(message))
}
},error=>{
  Message.error(error.message)
  return Promise.reject(error)
})
export default service