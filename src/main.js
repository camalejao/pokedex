import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App';
import routes from './routes';
import 'bootstrap/dist/css/bootstrap.min.css';

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        } else if (to.hash) {
            return {
                el: to.hash,
                behavior: 'smooth',
            }
        } else {
            return { top: 0 };
        }
    }
});
const app = createApp(App);
app.config.globalProperties.$pokedexCache = new Map();
app.use(router);
app.mount('#app');
