import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App';
import routes from './routes';
import 'bootstrap/dist/css/bootstrap.min.css';

const router = createRouter({
    history: createWebHistory(),
    routes
});
const app = createApp(App);
app.config.globalProperties.$pokedexCache = new Map();
app.use(router);
app.mount('#app');
