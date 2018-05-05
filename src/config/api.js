import vue from 'vue'
import axios from 'axios'
import qs from 'qs'
import {Message} from 'element-ui';

axios.defaults.timeout = 5000;                        //响应时间
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'; 		// 请求头

export const baseUrlApi = 'http://jztule.com/api/public/index.php/'
axios.defaults.baseURL = baseUrlApi + 'admin/'			// 公共接口

// 请求拦截器
axios.interceptors.request.use((config) => {
        return config
    }, (error) => {
        return Promise.reject(error)
    }
)

// 响应拦截器
axios.interceptors.response.use((response) => {
        return response
    }, (error) => {
        return Promise.reject(error)
    }
)

// 封装axios

// get
export function get(url, params = {}) {
    return new Promise((resolve, reject) => {
        axios.get(url, {params: params})
            .then(response => {
                resolve(response.data)
            })
            .catch(error => {
                reject(error)
            })
    })
}

// post
export function post(url, data) {
    return new Promise((resolve, reject) => {
        axios.post(url, qs.stringify(data))
            .then((response) => {
                if (response.data.code == '200') {
                    resolve(response.data)
                } else {
                    Message({
                        message: response.data.message,
                        type: 'error'
                    })
                }
            })
            .catch((error) => {
                reject(error)
            })
    })
}

// 图片上传
export function upload(url, data) {
    return new Promise((resolve, reject) => {
        axios.post(baseUrlApi + url, data)
            .then((response) => {
                if (response.data.code == '200') {
                    resolve(response.data.data)
                } else {
                    Message({
                        message: response.data.message,
                        type: 'error'
                    })
                }
            })
            .catch((error) => {
                reject(error)
            })
    })
}
