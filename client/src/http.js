import axios from 'axios'
import {Loading,Message} from 'element-ui'
import router from './router'
let loading

function  startLoading() {
    loading = Loading.service({
        lock:true,
        text:"玩命加载中...",
        background:'rgba:(0,0,0,0.7)'
    })
}
function  endLoading() {
    loading.close()
}

axios.interceptors.request.use(
    config=>{
    //加载动画
    startLoading()
    if (localStorage.webpackTOKEN)
        config.headers.Authorization = localStorage.webpackTOKEN
    return config
    },
    err=>{
        return Promise.reject(err)
    }
)
axios.interceptors.response.use(
    res=>{
        endLoading()
        //更新token
        const token = res.headers.token
        localStorage.setItem('webpackTOKEN',token)
        return Promise.resolve(res)
    },
    err=>{
        endLoading()
        console.log('err',err.response)
        let errmsg = err.response.data.msg || '出错了'
        Message.error(errmsg)
        if (status == 401) {
            // 清除token
            localStorage.removeItem('webpackTOKEN')
    
            // 页面跳转
            router.push('/login')
        }
        return Promise.reject(errmsg)
    }
)
export default axios