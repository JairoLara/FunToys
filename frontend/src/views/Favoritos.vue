<template>
  <NavBar />
  <div class="favoritos-container">
    <div class="titulo">
      <h2>Mis Favoritos</h2>
    </div>


    <div v-if="favoritos.length > 0" class="productos-favoritos">
      <div v-for="prod in favoritos" :key="prod.id" class="producto">
       <div>
        <img :src="prod.juguete.imagen" :alt="prod.juguete.nombre" class="producto-img" />
       </div>
        <div class="detail">
          <h3>{{ prod.juguete.nombre }}</h3>
        <p class="precio">Precio: ${{ prod.juguete.precio }}</p>
        </div>
        <div class="delete">
          <span style="cursor: pointer;" @click="eliminarFavorito(prod.juguete.id)" class="material-symbols-outlined">
          <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#000000"><path d="M261-120q-24.75 0-42.37-17.63Q201-155.25 201-180v-570h-41v-60h188v-30h264v30h188v60h-41v570q0 24-18 42t-42 18H261Zm438-630H261v570h438v-570ZM367-266h60v-399h-60v399Zm166 0h60v-399h-60v399ZM261-750v570-570Z"/></svg>
        </span>
        </div>

      </div>
    </div>

    <p v-else class="mensaje">No tienes productos en favoritos.</p>
  </div>
  <Footer />
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import axios from "axios";
import NavBar from "@/components/NavBar.vue";
import Swal from "sweetalert2";
import Footer from "@/components/footer.vue";

const usuario = ref<{ id: number; nombre: string; rol: string; token: string } | null>(null);
const favoritos = ref<any[]>([]);

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

// Cargar favoritos desde el backend solo si hay usuario
const cargarFavoritos = async () => {
  if (!usuario.value) {
    console.warn("No se puede cargar favoritos: usuario no definido");
    return;
  }

  console.log("Cargando favoritos para usuario ID:", usuario.value.id); // 🔍 Verificar en consola

  try {
    // Aquí estamos pasando el usuario ID cargado para obtener sus favoritos
    const response = await axios.get(`http://localhost:7000/api/favoritos/${usuario.value.id}`);
    console.log("Respuesta del backend:", response.data); // 🔍 Verificar respuesta
    favoritos.value = response.data;
  } catch (error) {
    console.error("Error al cargar favoritos:", error);

  }
};

// Eliminar favorito desde el backend
const eliminarFavorito = async (jugueteId: number) => {
  if (!usuario.value) return;

  try {
    await axios.delete("http://localhost:7000/api/favorito", {
      data: { usuarioId: usuario.value.id, jugueteId },
    });

    // Actualizar la lista local de favoritos
    favoritos.value = favoritos.value.filter((p) => p.juguete.id !== jugueteId);
    console.log("Favorito eliminado, lista actualizada");
    Swal.fire("Eliminado", "El producto ha sido eliminado de tus favoritos.", "success");
  } catch (error) {
    console.error("Error al eliminar favorito:", error);
    Swal.fire("Error", "Hubo un problema al eliminar el producto de tus favoritos.", "error");
  }
};

// Asegurar carga secuencial del usuario antes de los favoritos
onMounted(async () => {
  await cargarUsuario();
  if (usuario.value) {
    await cargarFavoritos();
  }
});
</script>

<style scoped>
.favoritos-container {
  display: flex;
  flex-direction: column;
  text-align: center;
}

h2 {
  color: rgb(94, 94, 94);
  font-size: 30px;
}

.titulo {
  display: flex;
  align-items: center;
  width: 100%;
  height: 50px;
  background-color: #f9f9f9;
  margin-top: 12px;
}

.productos-favoritos {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
  margin: 10px;
}

.producto {
  display: flex;
  position: relative; /* Para que los elementos hijos con posición absoluta se ajusten a este contenedor */
  padding: 12px;
  border-radius: 2px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  background-color: #f9f9f9;
  height: 130px;
  width: 90%;
}

.delete {
  position: absolute; /* Lo posiciona con respecto al .producto */
  bottom: 10px; /* Lo pega a la parte inferior */
  right: 10px; /* Lo alinea a la derecha */
}

.producto-img {
  height: 100%;
  width: 100px;

}

.detail {
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: left;
  margin-left: 10px;

}

.precio {
  align-self: flex-start;
  font-weight: bold;
  color: #ff6600;
}


.mensaje {
  font-size: 18px;
  color: gray;
}




</style>
