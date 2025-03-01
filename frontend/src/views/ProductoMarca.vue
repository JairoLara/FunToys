<template>
    <NavBar />
    <div>
      <img :src="marca.imagen" :alt="marca.nombre" class="logo" />
      <div v-if="productos.length > 0" class="productos-container">
        <div v-for="producto in productos" :key="producto.id">
          <p>{{ producto.nombre }}</p>
          <img :src="producto.imagen" :alt="producto.nombre"/>
        </div>
      </div>
      <p v-else>Cargando productos...</p>
    </div>
    <Footer />
  </template>
  
  <script lang="ts" setup>
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import Footer from '@/components/footer.vue';
  import NavBar from '@/components/NavBar.vue';
  
  // Definir las interfaces para los productos y la marca
  interface Producto {
    id: number;
    nombre: string;
    imagen: string;
  }
  
  interface Marca {
    id: number;
    nombre: string;
    imagen: string;
  }
  
  const route = useRoute();
  const marca = ref<Marca>({ id: 0, nombre: '', imagen: '' });
  const productos = ref<Producto[]>([]);
  
  const fetchProductos = async () => {
    try {
      const response = await fetch(`http://localhost:7000/api/${route.params.id}/juguetes`);
      if (!response.ok) throw new Error('Error al obtener los productos de la marca');
      
      const data = await response.json();
      marca.value = data;
      productos.value = data.productos;
  
    } catch (error) {
      console.error('Error al cargar los productos:', error);
    }
  };
  
  onMounted(fetchProductos);
  </script>
  
  <style scoped>
  .logo {
    width: 10%;
    height: auto;
  }
  </style>
  