<template>
    <div class="productos-container">
      <!-- Sección de Ofertas -->
      <h1 class="titulo">Ofertas</h1>
      <div class="productos-wrapper">
        <button @click="scrollLeft('descuento')" class="scroll-btn left"><</button>
  
        <div ref="productosConDescuentoContainer" class="productos-grid">
          <div v-for="producto in productosConDescuento" :key="producto.id" class="producto-card">
            <div class="imagen-container">
              <img :src="producto.imagen" :alt="producto.nombre" />
            </div>
            <h3 class="nombre">{{ producto.nombre }}</h3>
            <p class="precio">
              Precio: <span class="precio-normal">${{ producto.precio }}</span>
              <span class="precio-descuento">${{ producto.precio - (producto.precio * producto.descuento) / 100 }}</span>
            </p>
            <p class="descuento">Descuento: {{ producto.descuento }}%</p>
          </div>
        </div>
  
        <button @click="scrollRight('descuento')" class="scroll-btn right">></button>
      </div>
  
      <!-- Sección de Productos Sin Descuento -->
      <h1 class="titulo">Destacados</h1>
      <div class="productos-wrapper">
        <button @click="scrollLeft('sinDescuento')" class="scroll-btn left"><</button>
  
        <div ref="productosSinDescuentoContainer" class="productos-grid">
          <div v-for="producto in productosSinDescuento" :key="producto.id" class="producto-card">
            <div class="imagen-container">
              <img :src="producto.imagen" :alt="producto.nombre" />
            </div>
            <h3 class="nombre">{{ producto.nombre }}</h3>
            <p class="precio">Precio: ${{ producto.precio }}</p>
          </div>
        </div>
  
        <button @click="scrollRight('sinDescuento')" class="scroll-btn right">></button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  // Productos con descuento
  const productosConDescuento = ref([
    { id: 1, nombre: 'Producto 1', precio: 100, descuento: 10, imagen: 'https://via.placeholder.com/150' },
    { id: 2, nombre: 'Producto 2', precio: 200, descuento: 15, imagen: 'https://via.placeholder.com/150' },
    { id: 3, nombre: 'Producto 3', precio: 300, descuento: 20, imagen: 'https://via.placeholder.com/150' },
    { id: 4, nombre: 'Producto 4', precio: 400, descuento: 25, imagen: 'https://via.placeholder.com/150' },
    { id: 5, nombre: 'Producto 5', precio: 500, descuento: 25, imagen: 'https://via.placeholder.com/150' },
    { id: 6, nombre: 'Producto 6', precio: 600, descuento: 25, imagen: 'https://via.placeholder.com/150' },
    { id: 7, nombre: 'Producto 7', precio: 700, descuento: 25, imagen: 'https://via.placeholder.com/150' },
    { id: 8, nombre: 'Producto 8', precio: 800, descuento: 25, imagen: 'https://via.placeholder.com/150' },
  ])
  
  // Productos sin descuento
  const productosSinDescuento = ref([
    { id: 9, nombre: 'Producto 1', precio: 100, imagen: 'https://via.placeholder.com/150' },
    { id: 10, nombre: 'Producto 2', precio: 200, imagen: 'https://via.placeholder.com/150' },
    { id: 11, nombre: 'Producto 3', precio: 300, imagen: 'https://via.placeholder.com/150' },
    { id: 12, nombre: 'Producto 4', precio: 400, imagen: 'https://via.placeholder.com/150' },
    { id: 13, nombre: 'Producto 5', precio: 500, imagen: 'https://via.placeholder.com/150' },
    { id: 14, nombre: 'Producto 6', precio: 600, imagen: 'https://via.placeholder.com/150' },
    { id: 15, nombre: 'Producto 7', precio: 700, imagen: 'https://via.placeholder.com/150' },
    { id: 16, nombre: 'Producto 8', precio: 800, imagen: 'https://via.placeholder.com/150' },
  ])
  
  // Refs para manejar el scroll de cada carrusel
  const productosConDescuentoContainer = ref(null)
  const productosSinDescuentoContainer = ref(null)
  
  // Función para desplazar el carrusel a la izquierda
  const scrollLeft = (tipo) => {
    if (tipo === 'descuento' && productosConDescuentoContainer.value) {
      productosConDescuentoContainer.value.scrollLeft -= 220
    } else if (tipo === 'sinDescuento' && productosSinDescuentoContainer.value) {
      productosSinDescuentoContainer.value.scrollLeft -= 220
    }
  }
  
  // Función para desplazar el carrusel a la derecha
  const scrollRight = (tipo) => {
    if (tipo === 'descuento' && productosConDescuentoContainer.value) {
      productosConDescuentoContainer.value.scrollLeft += 220
    } else if (tipo === 'sinDescuento' && productosSinDescuentoContainer.value) {
      productosSinDescuentoContainer.value.scrollLeft += 220
    }
  }
  </script>

<style scoped>
.titulo {
  color: #ce3d3d;
  text-align: start;
}

.productos-container {
  text-align: center;
  padding: 20px;
  background-color: #ffeda1;
}

.productos-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  max-width: 1420px;
  margin: auto;
}

.productos-grid {
  display: flex;
  gap: 20px;
  overflow-x: auto;
  scroll-behavior: smooth;
  width: 1400px;
  white-space: nowrap;
  padding: 10px;
}

.productos-grid::-webkit-scrollbar {
  display: none;
}

.producto-card {
  flex: 0 0 auto;
  width: 200px;
  padding: 15px;
  border: 2px solid #ddd;
  border-radius: 10px;
  text-align: center;
  background-color: #fff;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
}

.imagen-container {
  width: 100%;
  height: 150px;
  background-color: #f8f8f8;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  margin-bottom: 10px;
}

.imagen-container img {
  max-width: 100%;
  max-height: 100%;
}

.nombre {
  font-size: 16px;
  font-weight: bold;
  margin: 5px 0;
}

.precio {
  font-size: 14px;
  color: #333;
}

.precio-normal {
  text-decoration: line-through;
  color: #888;
  margin-right: 5px;
}

.precio-descuento {
  color: #ce3d3d;
  font-weight: bold;
}

.descuento {
  font-size: 14px;
  color: green;
}

.scroll-btn {
  color: black;
  background-color: #ffeda1;
  border: none;
  padding: 10px 15px;
  font-size: 20px;
  cursor: pointer;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  border-radius: 50%;
  z-index: 10;
}

.left {
  left: -40px;
}

.right {
  right: -40px;
}
</style>
  