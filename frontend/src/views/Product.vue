<template>
    <div v-if="producto" class="producto-detalle">
      <img :src="producto.imagen" :alt="producto.nombre" class="producto-imagen" />
      <h2>{{ producto.nombre }}</h2>
      <p>{{ producto.descripcion }}</p>
      <p class="precio">Precio: ${{ producto.precio }}</p>
    </div>
    <div v-else>
      <p>Producto no encontrado.</p>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from "vue";
  import { useRoute } from "vue-router";
  
  interface Producto {
    id: number;
    nombre: string;
    descripcion: string;
    precio: number;
    imagen: string;
  }
  
  const producto = ref<Producto | null>(null);
  const route = useRoute();
  
  onMounted(async () => {
    const productoId = Number(route.params.id);
    try {
      const response = await fetch("http://localhost:7000/api/juguetes");
      if (!response.ok) throw new Error("No se pudo");
      const data: Producto[] = await response.json();
      producto.value = data.find((j) => j.id === productoId) || null;
    } catch (err) {
      console.error(err);
    }
  });
  </script>
  
  <style scoped>
  .producto-detalle {
    text-align: center;
    padding: 20px;
  }
  
  .producto-imagen {
    max-width: 300px;
    border-radius: 10px;
  }
  
  .precio {
    font-size: 20px;
    font-weight: bold;
    color: #28a745;
  }
  </style>
  