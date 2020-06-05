import axios from 'axios';
import router from '../router';
import store from '@/store';
import QS from 'qs';

// axios 配置`
axios.defaults.timeout = 20000;
// 后台接口公共前缀
axios.defaults.baseURL = '/';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.withCredentials = true;

// POST传参序列化
axios.interceptors.request.use(config => {
    const token = store.state.token;
    token && (config.headers.Authorization = token);
    return config;
}, (error) => {
    return Promise.reject(error);
});

// 返回状态判断
axios.interceptors.response.use(res => {
    const data = res.data;
    if (data.code !== 200) {
        if (data.code === 402) {
            console.log(data);
        }
        if (data.code === 401) {
            store.dispatch('removeCookie');
            router.push({
                name: 'home',
            });
        }
        // 此处用于来兼容阿里 
        if (data && !data.code) {
            return res;
        }
        return Promise.reject(data.msg);
    }
    return res;
}, (error) => {
    return Promise.reject(error);
});

export function getFetch(url, params) {
    return axios.get(url, { params }).then(res => res.data).catch((error) => { error });
}

export function postFetch(url, params, headers) {
    return new Promise((resolve, reject) => {
        axios.post(url, QS(params), headers).then(response => {
            resolve(response.data);
        }, err => {
            reject(err);
        }).catch((error) => {
            reject(error);
        });
    });
}