import Vue from 'vue';
import VueRouter from 'vue-router';
import Cookies from 'js-cookie';

Vue.use(VueRouter);

const routes = [{
        path: '/',
        name: 'index',
        component: () =>
            import ('./views/index.vue')
    },
    {
        path: '/login',
        name: 'login',
        component: () =>
            import ('./views/sign/login')
    },
    {
        path: '/home',
        name: 'home',
        component: () =>
            import ('./views/home'),
        children: [{
            path: 'person',
            name: 'person',
            component: () =>
                import ('./views/person/index')
        }]
    }

];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
    if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
    return originalPush.call(this, location).catch(err => err)
}
const user = Cookies.get('user');
router.beforeEach((to, from, next) => {

    if (to.matched.some(r => r.meta.requireAuth)) {
        if (user) {
            next();
        } else {
            //防止无限循环
            if (to.name === 'login') {
                next({
                    path: '/login',
                    query: { redirect: to.fullPath }
                });
                return
            }
            next({
                path: '/login',
                query: { redirect: to.fullPath }
            });
        }
    } else {
        next();
    }
});

export default router