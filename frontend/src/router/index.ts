import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Products from '@/views/Products.vue'
import Pago from '@/views/pago.vue'
import Product from '@/views/Product.vue'
import ProductoMarca from '@/views/ProductoMarca.vue'
import Favoritos from '@/views/Favoritos.vue'
import Admin from '@/views/admin/AdminProducts.vue'
import AdminProductDetail from '@/views/admin/AdminProductDetail.vue'
import AdminProductsBrans from '@/views/admin/AdminProductsBrans.vue'
import AdminEstadisticas from '@/views/admin/AdminEstadisticas.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/login',
      name: 'login',
      component: Login
    },
    { path: '/register',
       name: 'register',
       component: Register
    },
    { path: '/',
      name: 'products',
      component: Products
    },
    { path: '/pay',
      name: 'pay',
      component: Pago
    },
    { path: '/product/:id',
      name: 'product',
      component: Product
    },
    { path: '/producto-marca/:id',
      name: 'ProductoMarca',
      component: ProductoMarca,
      props: true
    },
    { path: '/favoritos',
      name: 'favoritos',
      component: Favoritos
    },


    { path: '/admin', name: 'admin', component: Admin, meta: { requiresAdmin: true } },
    { path: '/productadmin/:id', name: 'productadmin', component: AdminProductDetail, meta: { requiresAdmin: true } },
    { path: '/productsbrands/:id', name: 'productsbrands', component: AdminProductsBrans, meta: { requiresAdmin: true } },
    { path: '/adminest', name: 'adminest', component: AdminEstadisticas, meta: { requiresAdmin: true } }
  ]
});

router.beforeEach((to, from, next) => {
  const usuarioRol = localStorage.getItem('usuario_rol');

  if (to.meta.requiresAdmin && usuarioRol !== 'admin') {
    return next('/');
  }
  next();
});




export default router;
