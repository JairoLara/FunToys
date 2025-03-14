<template>
  <!-- Modal para agregar administrador -->
  <div v-if="mostrarModal" class="modal-overlay" @click="cerrarModal">
    <div class="modal-content" @click.stop>

      <form @submit.prevent="registrarAdmin">
        <h3>Registrar Administrador</h3>
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
          <input type="password" v-model="nuevoAdmin.contraseña" id="contraseña" required />
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
  background-color: rgba(92, 77, 5, 0.5);
  display: flex;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: #edf6f6;
  padding: 10px;
  border-radius: 10px;
  width: 100%;
  max-width: 500px;
  margin: 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  overflow-y: auto;
}

h3 {
  display: flex;
  justify-content: center;
  font-size: 30px;
  margin-bottom: 50px;
}

.input-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
}

label {
  display: flex;
  font-weight: bold;
  color: #333;
  margin-top: 25px;
  font-size: 18px;
}

input {
  width: 100%;
  padding: 10px;
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
  padding: 10px 20px;
  border: none;
  background-color: cornflowerblue;
  color: white;
  font-size: 16px;
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.3s ease;
  margin: 6px;
}

button[type="button"] {
  background-color: #6c757d;
}

button[type="button"]:hover {
  background-color: #5a6268;
}

button:hover {
  background-color: rgb(41, 78, 147);
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
