import { createRouter, createWebHashHistory } from 'vue-router';
import home from '../views/home.vue';
import toyApp from '../views/toy-app.vue';
import toyEdit from '../views/toy-edit.vue';
import toyDetails from '../views/toy-details.vue';
import about from '../views/about.vue';
import appLogin from '../views/app-login.vue';
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'appLogin',
      component: appLogin,
    },
    {
      path: '/home',
      name: 'home',
      component: home,
    },
    {
      path: '/toy',
      name: 'toyApp',
      component: toyApp,
    },
    {
      path: '/toy/edit/:toyId?',
      name: 'toyEdit',
      component: toyEdit,
    },
    {
      path: '/toy/details/:toyId',
      name: 'toyDetails',
      component: toyDetails,
    },
    {
      path: '/about',
      name: 'about',
      component: about,
    },
  ],
});

export default router;
