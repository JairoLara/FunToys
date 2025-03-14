<template>
    <NavBar />
    <div class="carrito-container">
      <h2>Mi Carrito</h2>
  
      <div v-if="carrito.length > 0" class="productos-carrito">
        <div v-for="prod in carrito" :key="prod.id" class="producto">
          <img :src="prod.juguete.imagen" :alt="prod.juguete.nombre" class="producto-img" />
          <h3>{{ prod.juguete.nombre }}</h3>
          <p>{{ prod.juguete.descripcion }}</p>
          <p class="precio">Precio: ${{ prod.juguete.precio }}</p>
          <button @click="eliminarDelCarrito(prod.juguete.id)">Eliminar del carrito</button>
        </div>
      </div>
  
      <p v-else class="mensaje">No tienes productos en tu carrito.</p>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from "vue";
  import axios from "axios";
  import NavBar from "@/components/NavBar.vue";
  import Swal from "sweetalert2";
  
  const usuario = ref<{ id: number; nombre: string; rol: string; token: string } | null>(null);
  const carrito = ref<any[]>([]);
  
  // Cargar usuario desde localStorage
  const cargarUsuario = () => {
    const usuario_id = localStorage.getItem("usuario_id");
    const usuario_nombre = localStorage.getItem("usuario_nombre");
    const usuario_rol = localStorage.getItem("usuario_rol");
    const token = localStorage.getItem("token") || '';
  
    if (usuario_id && usuario_nombre && usuario_rol) {
      usuario.value = {
        id: Number(usuario_id),
        nombre: usuario_nombre,
        rol: usuario_rol,
        token: token
      };
      console.log("✅ Usuario cargado correctamente:", usuario.value);
    } else {
      usuario.value = null;
      console.warn("⚠️ No se encontró usuario en localStorage.");
    }
  };
  
  // Cargar carrito desde el backend
  const cargarCarrito = async () => {
    if (!usuario.value) {
      console.warn("No se puede cargar el carrito: usuario no definido");
      return;
    }
  
    console.log("Cargando carrito para usuario ID:", usuario.value.id);
  
    try {
      const response = await axios.get(`http://localhost:7000/api/carrito/${usuario.value.id}`);
      console.log("Respuesta del backend:", response.data);
      carrito.value = response.data;
    } catch (error) {
      console.error("Error al cargar el carrito:", error);
      Swal.fire("Error", "Hubo un problema al cargar tu carrito.", "error");
    }
  };
  
  // Eliminar producto del carrito
  const eliminarDelCarrito = async (jugueteId: number) => {
    if (!usuario.value) return;
  
    try {
      await axios.delete("http://localhost:7000/api/carrito", {
        data: { usuarioId: usuario.value.id, jugueteId },
      });
  
      carrito.value = carrito.value.filter((p) => p.juguete.id !== jugueteId);
      console.log("Producto eliminado del carrito, lista actualizada");
      Swal.fire("Eliminado", "El producto ha sido eliminado de tu carrito.", "success");
    } catch (error) {
      console.error("Error al eliminar del carrito:", error);
      Swal.fire("Error", "Hubo un problema al eliminar el producto de tu carrito.", "error");
    }
  };
  
  // Asegurar carga secuencial del usuario antes del carrito
  onMounted(async () => {
    await cargarUsuario();
    if (usuario.value) {
      await cargarCarrito();
    }
  });
  </script>
  
  <style scoped>
  .carrito-container {
    background-color: #FFFFFF;
    padding: 20px;
    text-align: center;
  }
  
  h2 {
    color: rgb(94, 94, 94);
    font-size: 30px;
    padding-bottom: 15px;
  }
  
  .productos-carrito {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: center;
  }
  
  .producto {
    background: #f9f9f9;
    padding: 15px;
    border-radius: 10px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    text-align: center;
    width: 250px;
  }
  
  .producto-img {
    width: 100%;
    height: auto;
    border-radius: 8px;
  }
  
  .precio {
    font-weight: bold;
    color: #ff6600;
  }
  
  button {
    background-color: red;
    color: white;
    padding: 8px 12px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 10px;
  }
  
  button:hover {
    background-color: darkred;
  }
  
  .mensaje {
    font-size: 18px;
    color: gray;
  }
  </style>
  