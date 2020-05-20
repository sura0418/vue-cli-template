import axios from 'axios';
import router from '../router';
import store from '@/store';

// axios 配置`
axios.defaults.timeout = 20000;
// 后台接口公共前缀
axios.defaults.baseURL = '/';

axios.defaults.withCredentials = true;

// POST传参序列化
axios.interceptors.request.use(config => {
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

export default function fetch(url, params) {
    return axios.get(url, { params: params }).then(res => res.data).catch((error) => {});
}