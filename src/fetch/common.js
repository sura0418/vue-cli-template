import fetch from './apiInject';

export default {
    register(param) {
        return fetch('member_register', param);
    },
}