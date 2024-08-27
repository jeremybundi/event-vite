import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './styles/css.css'
import { createPinia } from 'pinia'
import persistedState from 'pinia-plugin-persistedstate';



const pinia = createPinia()

const app = createApp(App);
pinia.use(persistedState);


app.use(router);
app.use(pinia)
app.mount('#app');
