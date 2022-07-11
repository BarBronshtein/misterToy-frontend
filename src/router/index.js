import { createRouter, createWebHashHistory } from 'vue-router';
import home from '../views/home.vue';
import toyApp from '../views/toy-app.vue';
import toyEdit from '../views/toy-details.vue';
import toyDetails from '../views/toy-edit.vue';

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
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
    },
  ],
});

export default router;
