import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Products from '@/views/Products.vue'
import Pago from '@/views/pago.vue'
import Product from '@/views/Product.vue'
import ProductoMarca from '@/views/ProductoMarca.vue'
import Favoritos from '@/views/Favoritos.vue'
import Admin from '@/views/admin/AdminProducts.vue'
import Carrito from '@/views/Carrito.vue'
import AdminProductDetail from '@/views/admin/AdminProductDetail.vue'
import AdminProductsBrans from '@/views/admin/AdminProductsBrans.vue'

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
      name: 'products', component: Products 
    },
    { path: '/pay', 
      name: 'pay', 
      component: Pago 
    },
    { path: '/product/:id', 
      name: 'product', 
      component: Product 
    },
    { path: '/producto-marca/:id', name: 'ProductoMarca', 
      component: ProductoMarca, props: true 
    },
    { path: '/favoritos', 
      name: 'favoritos', 
      component: Favoritos 
    },
    { path: '/admin', 
      name: 'admin', component: Admin
    },
    { path: '/productadmin/:id', 
      name: 'productadmin', 
      component: AdminProductDetail
    },
    { path: '/carrito', 
      name: 'carrito', 
      component: Carrito 
    },
    { path: '/productsbrands/:id', 
      name: 'productsbrands', 
      component: AdminProductsBrans
    }
  ]
});

export default router;
