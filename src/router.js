import Vue from 'vue';
import Router from 'vue-router';
import Lobby from './views/Home.vue';
import Room from './views/Room.vue';

Vue.use(Router);

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            component: Lobby
        },
        {
            path: '/rooms/:id',
            name: 'rooms',
            component: Room
        }
    ]
});
