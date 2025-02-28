<template>
  <NavBar />
    <div v-if="producto" class="producto-container">
      <div class="producto-imagen">
        <img :src="producto.imagen" :alt="producto.nombre"/>
      </div>

      <div class="producto-info">
        <h2>{{ producto.nombre }}</h2>
      <p>{{ producto.descripcion }}</p>
      <p class="precio">Precio: ${{ producto.precio }}</p>

      <!-- Contador de cantidad -->
      <div class="contador">
        <button @click="disminuirCantidad" :disabled="cantidad <= 1">-</button>
        <span>{{ cantidad }}</span>
        <button @click="aumentarCantidad">+</button>
      </div>


      <button>Comprar ahora</button>
      <button>Agregar al carrito</button>
      <button>Agregar a favoritos</button>
      </div>

    </div>
    <div v-else>
      <p>Producto no encontrado.</p>
    </div>
  </template>

  <script setup lang="ts">
  import { ref, onMounted } from "vue";
  import { useRoute } from "vue-router";
  import NavBar from '@/components/NavBar.vue';

  interface Producto {
    id: number;
    nombre: string;
    descripcion: string;
    precio: number;
    imagen: string;
  }

  const producto = ref<Producto | null>(null);
  const route = useRoute();
  const cantidad = ref(1);

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

  // Funciones para modificar la cantidad
const aumentarCantidad = () => {
  cantidad.value++;
};

const disminuirCantidad = () => {
  if (cantidad.value > 1) cantidad.value--;
};

// Función para comprar con la cantidad seleccionada
const comprar = () => {
  alert(`Compraste ${cantidad.value} unidad(es) de ${producto.value?.nombre}`);
};

// Función para agregar al carrito con la cantidad seleccionada
const agregarAlCarrito = () => {
  alert(`Agregado al carrito: ${cantidad.value} unidad(es) de ${producto.value?.nombre}`);
};

  </script>

  <style scoped>

  .producto-container {
    display: flex;
    flex-direction: row; /* Cambiar a fila */
  align-items: center; /* Alinear elementos verticalmente */
  justify-content: space-between;
    margin: 30px;
    background-color: #ffff;
    border-radius: 40px;
  }

  .producto-imagen {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50%;
  }

  .producto-info {
    display: flex;
    flex-direction: column;
    padding: 20px;
    width: 50%;
  }

  .precio {
    font-size: 30px;
    font-weight: bold;
    color: #28a745;
  }
  button{
    width: 60%;
    margin: 10px;
    padding: 10px;
    border-radius: 30px;
    background-color: #fb5355;
    color: white;
    font-size: 20px;
    cursor: pointer;
    border: none;
  }
  button:hover{
    background-color: #ff7b7e;
  }

  .contador {
  display: flex;
  align-items: center;
  margin: 10px 0;
  border-radius: 40px;
  background-color: #1f578e;
  padding: 10px;
  width: 100px;
  border-color: ;
}

.contador button {
  width: 30px;
  height: 30px;
  font-size: 20px;
  border: none;
  border-radius: 50%;
  background-color: #fb5355;
  color: white;
  cursor: pointer;
  margin: 0 10px;
}

.contador span {
  font-size: 20px;
  font-weight: bold;
}


@media (max-width: 768px) {
  .producto-container {
    flex-direction: column;
    align-items: center;
  }
  .producto-imagen, .producto-info {
    width: 100%;
    text-align: center;
  }
  button{
    display: flex;
    align-items: center;
    justify-content: center;

  }
}

  </style>
