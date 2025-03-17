<template>
  <NavBar />
  <div class="carrito-container">
    <h2>Mi Carrito</h2>

    <div v-if="carrito.length > 0" class="productos-carrito">
      <div class="productos-wrapper">
        <div ref="productosContainer" class="productos-scroll">
          <div v-for="prod in carrito" :key="prod.id" class="producto">
            <img :src="prod.juguete.imagen" :alt="prod.juguete.nombre" class="producto-img" />
            <h3 class="producto-nombre">{{ truncarTexto(prod.juguete.nombre, 20) }}</h3>
            <p class="producto-descripcion">{{ truncarTexto(prod.juguete.descripcion, 50) }}</p>
            <p class="precio">Precio: ${{ prod.juguete.precio }}</p>

            <!-- Botones de incremento y decremento -->
            <div class="cantidad-precio">
              <button @click="decrementarCantidad(prod)" class="boton-cantidad">-</button>
              <p class="cantidad">Cantidad: {{ prod.cantidad }}</p>
              <button @click="incrementarCantidad(prod)" class="boton-cantidad">+</button>
            </div>

            <p class="subtotal">Subtotal: ${{ prod.juguete.precio * prod.cantidad }}</p>
            <button @click="eliminarDelCarrito(prod.juguete.id)" class="boton-eliminar">
              <svg xmlns="http://www.w3.org/2000/svg" height="34px" viewBox="0 -960 960 960" width="34px" fill="#black">
                <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <p class="total">Total a pagar:</p>
      <p class="totalp">${{ totalCarrito.toFixed(2) }}</p>


      <button class="boton-comprar" @click="comprar">Comprar</button>
    </div>

    <p v-else class="mensaje">No tienes productos en tu carrito.</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import axios from "axios";
import NavBar from "@/components/NavBar.vue";
import Swal from "sweetalert2";
import { useRouter, useRoute } from "vue-router";

const usuario = ref<{ id: number; nombre: string; rol: string; token: string } | null>(null);
const carrito = ref<any[]>([]);
const productosContainer = ref<HTMLElement | null>(null);
const router = useRouter();
const route = useRoute();

const truncarTexto = (texto: string, limite: number) => {
  return texto.length > limite ? texto.substring(0, limite) + "..." : texto;
};

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
  } else {
    usuario.value = null;
  }
};

const cargarCarrito = async () => {
  if (!usuario.value) return;

  try {
    const response = await axios.get(`http://localhost:7000/api/carrito/${usuario.value.id}`);
    carrito.value = response.data;
  } catch (error) {
    console.error("Error al cargar el carrito:", error);
    Swal.fire("Error", "Hubo un problema al cargar tu carrito.", "error");
  }
};

const totalCarrito = computed(() => {
  return carrito.value.reduce((total, prod) => total + (prod.juguete.precio * prod.cantidad), 0);
});

const comprar = () => {
  if (carrito.value.length === 0) {
    Swal.fire("Error", "Tu carrito está vacío.", "warning");
    return;
  }
  router.push({ 
    name: "pcarrito",
    query: { carrito: JSON.stringify(carrito.value) } 
  });
};

const eliminarDelCarrito = async (jugueteId: number) => {
  if (!usuario.value) return;

  try {
    await axios.delete("http://localhost:7000/api/carrito", {
      data: { usuarioId: usuario.value.id, jugueteId },
    });

    carrito.value = carrito.value.filter((p) => p.juguete.id !== jugueteId);
    Swal.fire("Eliminado", "El producto ha sido eliminado de tu carrito.", "success");
  } catch (error) {
    console.error("Error al eliminar del carrito:", error);
    Swal.fire("Error", "Hubo un problema al eliminar el producto de tu carrito.", "error");
  }
};

// Funciones para aumentar y disminuir la cantidad de productos
const incrementarCantidad = async (prod: any) => {
  if (!usuario.value) return;

  // Incrementar la cantidad localmente
  prod.cantidad++;

  try {
    // Actualizar la cantidad en la base de datos
    await axios.put("http://localhost:7000/api/carrito", {
      usuarioId: usuario.value.id,
      jugueteId: prod.juguete.id,
      cantidad: prod.cantidad,
    });

  } catch (error) {
    console.error("Error al incrementar cantidad:", error);
    Swal.fire("Error", "Hubo un problema al actualizar la cantidad del producto.", "error");
  }
};

const decrementarCantidad = async (prod: any) => {
  if (!usuario.value || prod.cantidad <= 1) return;

  // Decrementar la cantidad localmente
  prod.cantidad--;

  try {
    // Actualizar la cantidad en la base de datos
    await axios.put("http://localhost:7000/api/carrito", {
      usuarioId: usuario.value.id,
      jugueteId: prod.juguete.id,
      cantidad: prod.cantidad,
    });

  } catch (error) {
    console.error("Error al decrementar cantidad:", error);
    Swal.fire("Error", "Hubo un problema al actualizar la cantidad del producto.", "error");
  }
};

onMounted(async () => {
  await cargarUsuario();
  if (usuario.value) {
    await cargarCarrito();
  }
});
</script>

<style scoped>
.carrito-container {
  background-color: #fff;
  padding: 20px;
  text-align: left;
  border-radius: 15px;
  border: 2px solid #f0e68c;
}

h2 {
  color: #5e5e5e;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
}

.productos-carrito {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.producto {
  display: flex;
  gap: 13px;
  align-items: center;
  background: #fff;
  margin-top: 10px;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ddd;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  width: 100%;
  box-sizing: border-box;
}

.producto img {
  width: 60px;
  height: auto;
  border-radius: 5px;
  margin-right: 10px;
}

.producto-info {
  flex-grow: 1;
  font-size: 14px;
}

.producto-nombre {
  font-weight: bold;
  color: #333;
  margin-bottom: 5px;
}

.producto-descripcion {
  font-size: 12px;
  color: #777;
}

.cantidad-precio {
  display: flex;
  align-items: center;
  gap: 10px;
}

.cantidad-precio select {
  padding: 4px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

.precio {
  font-weight: bold;
  color: darkgreen;
}

.boton-cantidad {
  background-color: #f1f1f1;
  border: 1px solid #ddd;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
}

.boton-cantidad:hover {
  background-color: #ddd;
}

.boton-eliminar {
  background: transparent;
  border: none;
  position: absolute;
  right: 5%;
  border-radius: 50%;
  cursor: pointer;
  font-size: 16px;
  color: white;
}

.boton-eliminar:hover {
  fill: #e04040;
  transition-duration: 0.5s;
}

.total {
  font-size: 18px;
  font-weight: bold;
  color: #333;
  padding: 10px 0;
}

.totalp {
  font-size: 24px;
  font-weight: bold;
  color: #e04040;
  padding-bottom: 10px;
}

.boton-comprar {
  padding: 10px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 10px;
}

.boton-comprar:hover {
  background-color: #45a049;
}

.mensaje {
  color: #777;
  font-size: 16px;
  margin-top: 20px;
}

.productos-wrapper {
  display: flex;
  gap: 10px;
  flex-direction: column;
  align-items: start;
}

.productos-carrito {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.producto {
  display: flex;
  gap: 13px;
  align-items: center;
  background: #fff;
  margin-top: 10px;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ddd;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
}



.productos-scroll {
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: hidden;
  width: 100%; 
}
</style>
