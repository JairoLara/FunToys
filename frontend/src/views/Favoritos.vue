<template>
  <NavBar />
  <div class="favoritos-container">
    <h2>Mis Favoritos</h2>

    <div v-if="favoritos.length > 0" class="productos-favoritos">
      <div v-for="prod in favoritos" :key="prod.id" class="producto">
        <img :src="prod.imagen" :alt="prod.nombre" class="producto-img"/>
        <h3>{{ prod.nombre }}</h3>
        <p>{{ prod.descripcion }}</p>
        <p class="precio">Precio: ${{ prod.precio }}</p>
        <button @click="eliminarFavorito(prod.id)">Eliminar de favoritos</button>
      </div>
    </div>

    <p v-else class="mensaje">No tienes productos en favoritos.</p>
  </div>
</template>
  
<script setup lang="ts">
import { ref, onMounted } from "vue";
import NavBar from "@/components/NavBar.vue";

// Simulación de usuario logueado (debería obtenerse desde el sistema de autenticación)
const usuario = ref({ id: "3", nombre: "Juan Pérez" });  
const favoritos = ref<any[]>([]);

// Cargar favoritos desde localStorage para este usuario
const cargarFavoritos = () => {
  const data = localStorage.getItem(`favoritos_${usuario.value.id}`);
  favoritos.value = data ? JSON.parse(data) : [];
};

// Eliminar producto de favoritos
const eliminarFavorito = (id: number) => {
  favoritos.value = favoritos.value.filter((p) => p.id !== id);
  localStorage.setItem(`favoritos_${usuario.value.id}`, JSON.stringify(favoritos.value));
};

onMounted(cargarFavoritos);
</script>

<style scoped>
.favoritos-container {
  background-color: #FFFFFF;
  padding: 20px;
  text-align: center;
}

h2 {
  color: rgb(94, 94, 94);
  font-size: 30px;
  padding-bottom: 15px;
}

.productos-favoritos {
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
