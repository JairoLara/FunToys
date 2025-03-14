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
            <p class="cantidad">Cantidad: {{ prod.cantidad }}</p>
            <p class="subtotal">Subtotal: ${{ prod.juguete.precio * prod.cantidad }}</p> 
            <button @click="eliminarDelCarrito(prod.juguete.id)" class="boton-eliminar" ><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg></button>
          </div>
        </div>
      </div>

      <p class="total">Total a pagar: ${{ totalCarrito }}</p>

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
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";

const usuario = ref<{ id: number; nombre: string; rol: string; token: string } | null>(null);
const carrito = ref<any[]>([]);
const productosContainer = ref<HTMLElement | null>(null);
const router = useRouter();
const route = useRoute();

// Función para recortar texto
const truncarTexto = (texto: string, limite: number) => {
  return texto.length > limite ? texto.substring(0, limite) + "..." : texto;
};

// Cargar usuario desde localStorage
const cargarUsuario = () => {
  const usuario_id = localStorage.getItem("usuario_id");
  const usuario_nombre = localStorage.getItem("usuario_nombre");
  const usuario_rol = localStorage.getItem("usuario_rol");
  const token = localStorage.getItem("token") || '';

  

const route = useRoute();
console.log("🔍 Parámetros de la URL:", route.query);


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

    // ✅ Obtener la cantidad de la URL con `route.query.cantidad`
    const queryCantidad = Number(route.query.cantidad) || 1;

    // ✅ Agregar la cantidad temporalmente sin guardarla en la base de datos
    carrito.value = response.data.map((item: any) => ({
      ...item,
      cantidad: queryCantidad, // Usa la cantidad pasada por `router.query`
    }));

  } catch (error) {
    console.error("Error al cargar el carrito:", error);
    Swal.fire("Error", "Hubo un problema al cargar tu carrito.", "error");
  }
};

// **✅ Computed para calcular el total a pagar**
const totalCarrito = computed(() => {
  return carrito.value.reduce((total, prod) => total + (prod.juguete.precio * prod.cantidad), 0);
});

// Comprar productos
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
  background-color: #fff;
  padding: 20px;
  text-align: left;
  border-radius: 15px;
  border: 2px solid #f0e68c; /* Color amarillo suave */
  margin: auto;
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
  align-items: center;
  background: #fff;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ddd;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  width: 100%;
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
  color: #333;
}

.boton-eliminar {
  background: #ff5c5c;
  border: none;
  padding: 8px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 16px;
  color: white;
}

.boton-eliminar:hover {
  background: #e04040;
}

.total {
  font-size: 18px;
  font-weight: bold;
  margin-top: 20px;
  color: #333;
  padding: 10px 0;
  border-top: 1px solid #ddd;
}

.boton-comprar {
  background: #ff5c5c;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  font-size: 16px;
  width: 100%;
  margin-top: 10px;
}

.boton-comprar:hover {
  background: #e04040;
}
</style>