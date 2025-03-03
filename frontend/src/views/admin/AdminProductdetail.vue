<template>
  <AdminNav />
  <div v-if="producto" class="producto-container">
    <a class="link" href="/admin"><strong>Volver</strong></a>
    <div class="producto-imagen">
      <img :src="producto.imagen" :alt="producto.nombre" />
    </div>

    <div class="producto-info">
      <h2>{{ producto.nombre }}</h2>
      <p>{{ producto.descripcion }}</p>
      <p class="precio">Precio: ${{ producto.precio }}</p>
      <p>Stock: {{ producto.stock }}</p>

      <button @click="editarProducto">Editar producto</button>
      <button @click="eliminarProducto">Eliminar producto</button>
    </div>
  </div>

  <div v-else>
    <p>Producto no encontrado.</p>
  </div>

  <div v-if="mostrarModal" class="modal">
    <div class="modal-contenido">
      <h3>Editar Producto</h3>
      <input v-model="productoEditado.nombre" placeholder="Nombre" />
      <input v-model="productoEditado.descripcion" placeholder="Descripción" />
      <input v-model="productoEditado.precio" type="number" placeholder="Precio" />
      <input v-model="productoEditado.stock" type="number" placeholder="Stock" />
      <input v-model="productoEditado.imagen" placeholder="URL de la imagen" />
      <button @click="guardarEdicion">Guardar Cambios</button>
      <button @click="cerrarModal">Cancelar</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import AdminNav from "@/components/admin/AdminNav.vue";

interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  imagen: string;
  stock: number;
}

const producto = ref<Producto | null>(null);
const route = useRoute();
const router = useRouter();
const mostrarModal = ref(false);
const productoEditado = ref<Producto | null>(null);

onMounted(async () => {
  const productoId = Number(route.params.id);
  try {
    const response = await fetch(`http://localhost:7000/api/juguetes`);
    if (!response.ok) throw new Error("No se pudo cargar el producto");
    const data: Producto[] = await response.json();
    producto.value = data.find((j) => j.id === productoId) || null;
  } catch (err) {
    console.error(err);
  }
});

// Función para mostrar modal de edición
const editarProducto = () => {
  if (producto.value) {
    productoEditado.value = { ...producto.value };
    mostrarModal.value = true;
  }
};

// Guardar cambios del producto editado
const guardarEdicion = async () => {
  if (!productoEditado.value) return;

  try {
    const response = await fetch(`http://localhost:7000/api/juguetes/${productoEditado.value.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(productoEditado.value),
    });

    if (!response.ok) throw new Error("Error al actualizar el producto");

    producto.value = { ...productoEditado.value };
    mostrarModal.value = false;
  } catch (err) {
    console.error(err);
  }
};

// Cerrar modal
const cerrarModal = () => {
  mostrarModal.value = false;
};

// Eliminar producto
const eliminarProducto = async () => {
  if (!producto.value) return;

  if (!confirm("¿Estás seguro de que deseas eliminar este producto?")) return;

  try {
    const response = await fetch(`http://localhost:7000/api/juguetes/${producto.value.id}`, {
      method: "DELETE",
    });

    if (!response.ok) throw new Error("Error al eliminar el producto");

    alert("Producto eliminado correctamente");
    router.push("/admin"); // Redirigir a la lista de productos
  } catch (err) {
    console.error(err);
  }
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

/* Modal */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-contenido {
  background: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
}

.modal-contenido input {
  display: block;
  width: 100%;
  margin-bottom: 10px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
</style>
