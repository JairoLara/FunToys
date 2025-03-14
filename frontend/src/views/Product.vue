<template>
  <NavBar />
  <div v-if="producto" class="producto-container">
    <div class="producto-imagen">
      <img :src="producto.imagen" :alt="producto.nombre" />
    </div>

    <div class="producto-info">
      <h2>{{ producto.nombre }}</h2>
      <p>{{ producto.descripcion }}</p>
      <p class="precio">Precio: ${{ producto.precio }}</p>

      <!-- Contador de cantidad -->
      <div class="contador">
        <button class="menos" @click="disminuirCantidad" :disabled="cantidad <= 1">-</button>
        <span>{{ cantidad }}</span>
        <button class="mas" @click="aumentarCantidad">+</button>
      </div>

      <button @click="comprar">Comprar ahora</button>
      <button @click="agregarAlCarrito">Agregar al carrito</button>

      <button @click="agregarAFavoritos">Agregar a favoritos</button>
      <!-- Solo agrega, no permite eliminar -->

    </div>
  </div>

  <div v-else>
    <p>Producto no encontrado.</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import Swal from "sweetalert2";
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
const router = useRouter();
const cantidad = ref(1);
const usuarioId = ref(localStorage.getItem("usuario_id") || "");

// Obtener el producto según el ID de la ruta
onMounted(async () => {
  const productoId = Number(route.params.id);
  try {
    const response = await axios.get("http://localhost:7000/api/juguetes");
    producto.value = response.data.find((j: Producto) => j.id === productoId) || null;
  } catch (err) {
    console.error("Error al cargar el producto:", err);
  }
});

// Funciones para modificar la cantidad
const aumentarCantidad = () => cantidad.value++;
const disminuirCantidad = () => { if (cantidad.value > 1) cantidad.value--; };

// Función para agregar al carrito
const agregarAlCarrito = async () => {
  if (!usuarioId.value) {
    Swal.fire("Error", "Debes iniciar sesión para agregar productos al carrito.", "warning");
    return;
  }

  if (!producto.value) return;

  try {
    await axios.post("http://localhost:7000/api/carrito", {
      usuarioId: Number(usuarioId.value),
      jugueteId: producto.value.id,
    });

    Swal.fire("Éxito", "El producto ha sido agregado al carrito.", "success");

    // ✅ Redirigir a la vista del carrito pasando la cantidad seleccionada
    router.push({
      name: "carrito",
      query: { cantidad: cantidad.value.toString() },
    });

  } catch (error) {
    console.error("Error al agregar al carrito:", error);
    Swal.fire("Error", "Hubo un problema al agregar el producto al carrito.", "error");
  }
};


// Función para agregar a favoritos
const agregarAFavoritos = async () => {
  if (!usuarioId.value) {
    Swal.fire("Error", "Debes iniciar sesión para agregar a favoritos.", "warning");
    return;
  }

  if (!producto.value) return;

  try {
    const response = await axios.post("http://localhost:7000/api/favorito", {
      usuarioId: Number(usuarioId.value),
      jugueteId: producto.value.id,
    });

    Swal.fire("Éxito", "El producto ha sido agregado a favoritos.", "success");
  } catch (error) {
    console.error("Error al agregar a favoritos:", error);
    Swal.fire("Ya esta en favoritos.", "", "error");
  }
};

// Función para comprar
const comprar = () => {
  if (!producto.value) {
    Swal.fire("Error", "No se encontró el producto.", "error");
    return;
  }

  router.push({
    name: "pay",
    query: {
      id: producto.value.id.toString(),
      nombre: producto.value.nombre,
      cantidad: cantidad.value.toString(),
      precio: producto.value.precio.toString(),
    }
  });
};
</script>

<style scoped>
.link {
  color: black;
  text-decoration: none;
  position: absolute;
  top: 15%;
  left: 3%;
}

.producto-container {
  display: flex;
  flex-direction: row;
  align-items: center;
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

button {
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

button:hover {
  background-color: #ff7b7e;
}

.contador {
  display: flex;
  align-items: center;
  margin: 10px 0;
  border-radius: 40px;
  background-color: #ffffff;
  padding: 10px;
  width: 100px;
  border: 2px solid black;
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

.menos {
  align-items: center;
  border: 2px solid black;
  background-color: #000000;

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
  button {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
