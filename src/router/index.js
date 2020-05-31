import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store'
import Login from "../views/Login";
import Register from "../views/Register";
import MyProfile from "../views/MyProfile";
import MyQuestionnaire from "../views/MyQuestionnaire";
import Events from "../views/Events";
import Event from "../views/Event";
import CreateEvent from "../views/CreateEvent";

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
        path: '/profile',
        name: 'Мой профиль',
        component: MyProfile
    },
    {
        path: '/questionnaire',
        name: 'Моя анкета',
        component: MyQuestionnaire
    },
    {
        path: '/events',
        name: 'События',
        component: Events
    },
    {
        path: '/events/create',
        name: 'Создание события',
        component: CreateEvent
    },
    {
        path: '/events/:id',
        props: true,
        name: 'Событие',
        component: Event
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