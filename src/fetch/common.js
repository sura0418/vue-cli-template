import { getFetch } from './apiInject';

export default {
    register(param) {
        return getFetch('member_register', param);
    },
}