import { createRouter, createWebHashHistory } from 'vue-router';
import home from '../views/home.vue';
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: home,
    },
    {
      path: '/about',
      name: 'about',
    },
  ],
});

export default router;
