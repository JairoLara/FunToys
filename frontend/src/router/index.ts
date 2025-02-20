import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Products from '@/views/Products.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login,
    },

    {
      path : '/register',
      name : 'Register',
      component : Register
    },
    {
      path : '/products',
      name : 'products',
      component : Products
    },
  ],
})

export default router
