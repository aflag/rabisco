import Vue from 'vue';
import App from './App.vue';
import router from './router';
import underscore from 'vue-underscore';
import Notifications from 'vue-notification';

Vue.config.productionTip = false;

Vue.use(underscore);
Vue.use(Notifications);

new Vue({
    router,
    render: h => h(App)
}).$mount('#app');
