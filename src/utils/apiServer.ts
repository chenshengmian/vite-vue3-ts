import axios from 'axios'
import configs from './config'

//创建axios实例
const server  = axios.create({
    baseURL: configs.url,
    timeout: configs.timeout,
    headers:{
        "Content-Type":"application/json;charset=utf-8"
    }
})

//请求拦截
server.interceptors.request.use((config)=>{
    config.headers = config.headers || {}
    if(uni.getStorageSync('token')){
        config.headers.token = uni.getStorageSync('token') || ''
    }
    return config
})

//相应拦截
server.interceptors.response.use((res)=>{
    const code:number = res.status
    if(code == 1){
        return Promise.reject(res)
    }
    return res
},(err)=>{
    console.log(err)
})

export default server