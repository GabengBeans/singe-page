import axios from "axios"
import env from '../config/env';
import interfaceIp from './interfaceIp';


const vm = new Vue({})

const ajaxUrl = env === 'development' ?interfaceIp.devUrl:interfaceIp.proUrl

axios.defaults.baseURL = ajaxUrl; //请求接口地址
axios.defaults.timeout = 10 * 1000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    if (sessionStorage.getItem('token')) {
        config.headers = {
            'token': sessionStorage.getItem('token')
        }
    }
    return config
}, function (error) {
    // 对请求错误做些什么
    vm.$Message.error(error)
    console.log("请求错误:" + error)
    return
});
axios.interceptors.response.use(function (response) {
    if (response.status == 200) {
        return response
    } 
}, function (error) {
    return Promise.reject(error);
});

config.postParams = function (url, params) {
    return new Promise((resolve, reject)=>{
        axios({
            method: "post",
            url: url,
            params: params
        }).then(resp => {
            resolve(resp)
        }).catch(err => {
            console.log(err)
            vm.$Message.error("请求错误")
        })
    })

}

config.postBody = function (url, data, params = {}) {

    return new Promise((resolve, reject) => {
        axios({
            method: "post",
            url: url,
            data: data,
            params: params
        }).then(resp => {
            resolve(resp)
        }).catch(err => {
            console.log(err)
            vm.$Message.error("请求错误")
        })
    })
}

config.get = function (url, params = {}) {
    return new Promise((resolve, reject) => {
        axios({
            method: "get",
            url: url,
            params: params
        }).then(resp => {
            resolve(resp)
        }).catch(err => {
            console.log(err)
            vm.$Message.error("请求错误")
        })
    })
}

export default config