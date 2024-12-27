import { createRouter, createWebHistory } from 'vue-router'
import { PATHS } from './paths'

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('../views/HomeView.vue'),
    },

    {
      path: PATHS.learn,
      component: () => import('../layouts/BaseLayout.vue'),

      children: [
        {
          path: '',
          name: 'learn',
          component: () => import('../views/AboutView.vue'),
        },
        {
          path: PATHS.vocabulary,
          name: 'vocabulary',
          component: () => import('../views/AboutView.vue'),
        },
        {
          path: PATHS.menu,
          name: 'menu',
          component: () => import('../views/AboutView.vue'),
        },
      ],
    },

    {
      path: PATHS.notFound,
      name: 'not-found',
      component: () => import('../views/NotFoundView.vue'),
    },
  ],
})
