import axios from "axios";
import memoryUtils from "../utils/memoryUtils";
import {message} from "antd";

export default function
    ajax1(url, data={}, type='GET') {
    return new Promise((resolve, reject) => {
        let promise;
        if(type === 'GET') {
            promise = axios.get(url, {
                params: data,
            })
        } else { // POST请求
            promise = axios.post(url, data, {
                headers: {'authentication' : memoryUtils.student.token}
            });
        }
        promise.then(response => {
            resolve(response.data)
        }).catch(error => {
            message.error('请求出错了: ' + error.message)
        })
    });
    }