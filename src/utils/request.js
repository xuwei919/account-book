import axios from "axios";
import { Message } from 'element-ui';

const service = axios.create({
    baseURL: '/',
    timeout: 5000
})

service.interceptors.request.use(

    config => {
        console.log(config)
        return config
    },
    error => {
        //请求异常
        Message({
            type: 'error',
            message: '系统异常，请及时联系管理员'

        })
        return Promise.reject(error)
    }

)

service.interceptors.response.use(
    response => {
        const res = response.data
        console.log(res)
        if (res.code === 1) {
            return res
        } else {
            //非200表示，接口异常
            Message({
                type: 'error',
                message: res.message
            })
            return Promise.reject(res.message)
        }
    },
    error => {
        //http请求报错
        // console.log('reason:' + error)
        Message({
            type: 'error',
            message: error
        })
        return Promise.reject(error)
    }
)

export default service



