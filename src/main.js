import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './assets/base.css';
import store from './store';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import VueGoogleMaps from '@fawmi/vue-google-maps';
import { toyService } from './services/toy-services';

const app = createApp(App);
app.use(router);
app.use(store);
app.use(ElementPlus);

toyService.getMapApi().then(key => {
  app.use(VueGoogleMaps, {
    load: {
      key,
    },
  });
  app.mount('#app');
});
