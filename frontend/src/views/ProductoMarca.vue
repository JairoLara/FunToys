<template>
  <NavBar />
  <div>
    <div class="marca-container">
      <img :src="marca.imagen" :alt="marca.nombre" class="logo" />
    </div>

    <!-- Contenedor de Productos -->
    <div v-if="productos.length > 0" class="productos-container">
      <div class="productos-wrapper">
        <div
          v-for="producto in productos"
          :key="producto.id"
          class="producto-item"
          @click="iradetalle(producto.id)"
        >
          <img :src="producto.imagen" :alt="producto.nombre" class="imagen" />
          <h3>{{ producto.nombre }}</h3>
          <p class="precio">Precio: ${{ producto.precio }}</p>
        </div>
      </div>
    </div>
    <p v-else>Cargando productos...</p>
  </div>
  <Footer />
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import Footer from '@/components/footer.vue'
import NavBar from '@/components/NavBar.vue'

interface Producto {
  id: number
  nombre: string
  precio: number
  imagen: string
}

interface Marca {
  id: number
  nombre: string
  imagen: string
}

const route = useRoute()
const router = useRouter()
const marca = ref<Marca>({ id: 0, nombre: '', imagen: '' })
const productos = ref<Producto[]>([])

const fetchProductos = async () => {
  try {
    const response = await fetch(`http://localhost:7000/api/${route.params.id}/juguetes`)
    if (!response.ok) throw new Error('Error al obtener los productos de la marca')
    const data = await response.json()
    marca.value = data
    productos.value = data.productos
  } catch (error) {
    console.error('Error al cargar los productos:', error)
  }
}

onMounted(fetchProductos)

const iradetalle = (id: number) => {
  router.push(`/product/${id}`)
}
</script>

<style scoped>
.marca-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2rem 0;
  background-color: white;
}

.logo {
  width: 10%;
  height: auto;
}

.productos-wrapper {
  display: flex;
  justify-content: center;
  gap: 30px;
}

.producto-item {
  width: 200px;
  background: #fff;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  text-align: center;
  cursor: pointer;
  transition: transform 0.3s ease;

}

.producto-item:hover {
  transform: translateY(-5px);
}


.imagen {
  width: 100%;
height: 220px;
border-radius: 5px;
cursor: pointer;
}

h3 {
  font-size: 18px;
  margin: 10px 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: clip;
  max-width: 180px;
}

.precio {
  font-weight: bold;
  color: #28a745;
}
</style>
