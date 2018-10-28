import Vue from 'vue'
import Router from 'vue-router'
import Room from './views/Room.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/rooms/:id',
      name: 'room',
      component: Room
    }
  ]
})
