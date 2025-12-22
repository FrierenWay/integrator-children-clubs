import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/circle/:id',
    name: 'CircleDetail',
    component: () => import('../views/CircleDetailView.vue')
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../views/ProfileView.vue')
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;