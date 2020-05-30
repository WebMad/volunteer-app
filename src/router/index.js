import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store'
import Login from "../views/Login";
import Register from "../views/Register";

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'Главная',
        component: Home
    },
    {
        path: '/login',
        name: 'Авторизация',
        component: Login
    },
    {
        path: '/register',
        name: 'Регистрация',
        component: Register
    },
    {
        path: '/logout',
        name: 'Выход',
        beforeEnter: (to, from, next) => {
            Vue.prototype.$http.post('auth/logout');
            store.commit('auth/logout');
            next('/login')
        }
    },
    {
        path: '*',
        redirect: "/"
    }
];

const router = new VueRouter({
    base: process.env.BASE_URL,
    routes
});

router.beforeEach((to, from, next) => {
    if (!store.getters['auth/isAuth'] && (to.path !== '/login' && to.path !== '/register')) {
        next('/login');
    }
    next()
});

export default router