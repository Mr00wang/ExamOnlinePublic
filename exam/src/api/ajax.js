/*
能发送异步ajax请求的函数模块
封装axios库
函数返回值是promise对象
1.优化：统一处理异常
    在外层包一个自己创建的promise对象
    在请求出错时，不reject（error）， 而是显示错误提示
2.优化2： 异步得到不是response，而是response.data
            在请求成功resolve时：resolve(response.data)
 */

import axios from 'axios'
import {message} from "antd";
import memoryUtils from "../utils/memoryUtils";

export default function
    ajax(url, data={}, type='GET') {
    return new Promise((resolve, reject) => {
        let promise;
        if(type === 'GET') {
            promise = axios.get(url, {
                params: data,
            })
        } else { // POST请求
            promise = axios.post(url, data, {
                headers: {'authentication' : memoryUtils.user.token}
            });
        }
        promise.then(response => {
            resolve(response.data)
        }).catch(error => {
            message.error('请求出错了: ' + error.message)
        })
    });
}






