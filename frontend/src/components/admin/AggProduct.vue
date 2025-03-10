<template>
  <!-- Modal para agregar producto -->
  <div v-if="mostrarModal" class="modal-overlay" @click="cerrarModal">
    <div class="modal-content" @click.stop>
      <h3>Agregar Producto</h3>
      <form @submit.prevent="agregarProducto">
        <!-- Formulario de agregar producto -->
        <div>
          <label for="nombre">Nombre:</label>
          <input type="text" v-model="nuevoProducto.nombre" id="nombre" required />
        </div>
        <div>
          <label for="descripcion">Descripción:</label>
          <input type="text" v-model="nuevoProducto.descripcion" id="descripcion" required />
        </div>
        <div>
          <label for="precio">Precio:</label>
          <input type="number" v-model="nuevoProducto.precio" id="precio" required />
        </div>
        <div>
          <label for="stock">Stock:</label>
          <input type="number" v-model="nuevoProducto.stock" id="stock" required />
        </div>
        <div>
          <label for="imagen">Imagen URL (Producto):</label>
          <input type="url" v-model="nuevoProducto.imagen" id="imagen" required />
        </div>
        <div>
          <label for="marcaId">Marca:</label>
          <select v-model="nuevoProducto.marcaId" id="marcaId" required>
            <option v-for="marca in marcas" :key="marca.id" :value="marca.id">
              {{ marca.nombre }}
            </option>
          </select>
        </div>
        <div class="modal-buttons">
          <button type="submit">Agregar Producto</button>
          <button type="button" @click="cerrarModal">Cancelar</button>
        </div>
      </form>

      <!-- Formulario para agregar una nueva marca -->
      <h3>Agregar Marca</h3>
      <form @submit.prevent="agregarMarca">
        <div>
          <label for="marcaNombre">Nombre de la Marca:</label>
          <input type="text" v-model="nuevaMarca.nombre" id="marcaNombre" required />
        </div>
        <div>
          <label for="marcaImagen">Imagen URL (Solo PNG):</label>
          <input type="url" v-model="nuevaMarca.imagen" id="marcaImagen" required />
        </div>
        <div class="modal-buttons">
          <button type="submit">Agregar Marca</button>
          <button type="button" @click="cerrarModal">Cancelar</button>
        </div>
      </form>
    </div>
  </div>

  <!-- Botón para abrir el modal -->
  <button style=" " @click="abrirModal">Agregar producto o marca</button>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

interface Producto {
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  imagen: string;
  marcaId: number;
}

interface Marca {
  id: number;
  nombre: string;
  imagen: string;
}

const mostrarModal = ref(false); // Modal está cerrado por defecto
const setMostrarModal = (valor: boolean) => {
  mostrarModal.value = valor;
};

const marcas = ref<Marca[]>([]);
const nuevoProducto = ref<Producto>({
  nombre: '',
  descripcion: '',
  precio: 0,
  stock: 0,
  imagen: '',
  marcaId: 0
});
const nuevaMarca = ref<{ nombre: string; imagen: string }>({
  nombre: '',
  imagen: ''
});

// Cargar marcas desde el servidor
onMounted(async () => {
  try {
    const response = await fetch("http://localhost:7000/api/marca");
    const data = await response.json();
    marcas.value = data;
  } catch (error) {
    console.error("Error al cargar las marcas:", error);
  }
});

// Función para agregar producto
const agregarProducto = async () => {
  try {
    const response = await fetch("http://localhost:7000/api/juguetes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(nuevoProducto.value)
    });

    if (!response.ok) {
      throw new Error("Error al agregar el producto");
    }

    nuevoProducto.value = {
      nombre: '',
      descripcion: '',
      precio: 0,
      stock: 0,
      imagen: '',
      marcaId: 0
    };

    setMostrarModal(false);
  } catch (error) {
    console.error("Error al crear el producto:", error);
  }
};

// Función para agregar marca
const agregarMarca = async () => {
  try {
    const response = await fetch("http://localhost:7000/api/marca", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        nombre: nuevaMarca.value.nombre,
        imagen: nuevaMarca.value.imagen
      })
    });

    if (!response.ok) {
      throw new Error("Error al agregar la marca");
    }

    // Limpiar campos después de agregar la marca
    nuevaMarca.value = { nombre: '', imagen: '' };

    // Recargar la lista de marcas después de agregar una nueva
    const data = await response.json();
    marcas.value.push(data);
  } catch (error) {
    console.error("Error al crear la marca:", error);
  }
};

// Función para cerrar el modal
const cerrarModal = () => {
  setMostrarModal(false);
};

// Función para abrir el modal
const abrirModal = () => {
  setMostrarModal(true);
};
</script>

<style scoped>
/* Estilos generales */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(92, 77, 5, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: #f7d85d;
  padding: 30px;
  border-radius: 50px;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  text-align: center;
  overflow-y: auto;
}

h2 {
  color: #f6e95e;
  font-size: 24px;
  margin-bottom: 20px;
}

.input-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
}

label {
  font-weight: bold;
  color: #333;
  margin-bottom: 5px;
}

input {
  padding: 10px;
  border: 2px solid #ab8f03;
  border-radius: 8px;
  font-size: 16px;
  outline: none;
  transition: all 0.3s ease-in-out;
}

input:focus {
  border-color: #fdc50e;
  box-shadow: 0 0 5px #d6b006;
}

.modal-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

button {
  padding: 12px 24px;
  border: none;
  background-color: #a79527;
  color: white;
  font-size: 16px;
  cursor: pointer;
  border-radius: 8px;
  transition: all 0.3s ease;
}

button[type="button"] {
  background-color: #6c757d;
}

button[type="button"]:hover {
  background-color: #5a6268;
}

button:hover {
  background-color: #6d7503;
}

button:focus {
  outline: none;
}

button:disabled {
  background-color: #070707;
  cursor: not-allowed;
}

/* Ajustes para pantallas pequeñas */
@media (max-width: 600px) {
  .modal-content {
    padding: 20px;
  }

  button {
    font-size: 14px;
    padding: 8px 16px;
  }
}

/* Fondo oscuro con efecto de desvanecimiento */
.modal-overlay.show {
  display: flex;
  animation: fadeIn 0.3s ease;
}



</style>