<template>
  <!-- Modal para agregar administrador -->
  <div v-if="mostrarModal" class="modal-overlay" @click="cerrarModal">
    <div class="modal-content" @click.stop>
      <h3>Registrar Administrador</h3>
      <form @submit.prevent="registrarAdmin">
        <div>
          <label for="nombre">Nombre:</label>
          <input type="text" v-model="nuevoAdmin.nombre" id="nombre" required />
        </div>
        <div>
          <label for="email">Correo Electrónico:</label>
          <input type="email" v-model="nuevoAdmin.email" id="email" required />
        </div>
        <div>
          <label for="contraseña">Contraseña:</label>
          <input type="contraseña" v-model="nuevoAdmin.contraseña" id="contraseña" required />
        </div>
        <div>
          <label>Rol:</label>
          <input type="text" value="admin" disabled />
        </div>
        <div class="modal-buttons">
          <button type="submit">Registrar</button>
          <button type="button" @click="cerrarModal">Cancelar</button>
        </div>
      </form>
    </div>
  </div>

  <!-- Botón para abrir el modal -->
  <button  @click="abrirModal">Registrar Administrador</button>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import Swal from "sweetalert2";

const mostrarModal = ref(false);
const nuevoAdmin = ref({ nombre: "", email: "", contraseña: "" });

const registrarAdmin = async () => {
  try {
    await axios.post("http://localhost:7000/api/register", {
      nombre: nuevoAdmin.value.nombre,
      email: nuevoAdmin.value.email,
      contraseña: nuevoAdmin.value.contraseña,
      rol: "admin",
    });

    Swal.fire("Éxito", "Administrador registrado correctamente", "success");
    nuevoAdmin.value = { nombre: "", email: "", contraseña: ""  };
    cerrarModal();
  } catch (error) {
    Swal.fire("Error", "No se pudo registrar el administrador", "error");
  }
};

const cerrarModal = () => (mostrarModal.value = false);
const abrirModal = () => (mostrarModal.value = true);
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}
.modal-content {
  background-color: white;
  padding: 30px;
  border-radius: 8px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}
.modal-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
}
button {
  padding: 10px 20px;
  border: none;
  background-color: #007bff;
  color: white;
  font-size: 16px;
  margin: 10px;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}
button:hover {
  background-color: #0056b3;
}
button:focus {
  outline: none;
}
button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
