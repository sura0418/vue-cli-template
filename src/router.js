import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from './views/Home.vue';
import Cookies from 'js-cookie';

Vue.use(VueRouter);

const routes = [{
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ './views/About.vue')
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