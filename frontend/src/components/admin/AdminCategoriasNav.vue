<template>
  <nav class="nav-container">
    <!-- Sección de marcas destacadas -->
    <div class="marcas-container">
      <div v-if="marcasprin.length > 0" class="marcas-grid">
        <div v-for="marca in marcasprin" :key="marca.id" @click="irAProductoMarca(marca.id)">
          <img :src="marca.imagen" :alt="marca.nombre">
        </div>
      </div>
      <p v-else>Cargando imágenes...</p>

      <!-- Texto "Todas las marcas" -->
      <span class="toggle-brands" @click="mostrarMarcas = !mostrarMarcas">
        Todas las marcas ▼
      </span>

      <!-- Menú desplegable -->
      <div v-if="mostrarMarcas" class="dropdown">
        <ul>
          <li v-for="marca in otrasMarcas" :key="marca.id" @click="irAProductoMarca(marca.id)">
            {{ marca.nombre }}
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const marcas = ref([]);
    const marcasprin = ref([]);
    const otrasMarcas = ref([]);
    const mostrarMarcas = ref(false);
    const router = useRouter();

    const fetchMarcas = async () => {
      try {
        const response = await fetch('http://localhost:7000/api/marca');
        if (!response.ok) throw new Error('Error al obtener las marcas');

        const data = await response.json();
        marcas.value = data;

        marcasprin.value = data.filter(marca => [2, 4, 7].includes(marca.id));
        otrasMarcas.value = data.filter(marca => ![].includes(marca.id));

      } catch (error) {
        console.error('Error al cargar las imágenes de las marcas:', error);
      }
    };

    const irAProductoMarca = (id) => {
      router.push(`/productsbrands/${id}`);
    };

    onMounted(fetchMarcas);

    return { marcasprin, otrasMarcas, mostrarMarcas, irAProductoMarca };
  }
};
</script>

<style scoped>
.nav-container {
  display: flex;
  align-items: center;
  background-color: #FFEDA1;
  padding: 10px 20px;
}

.marcas-container {
  display: flex;
  align-items: center;
  gap: 15px;
  cursor: pointer;
}

.marcas-grid {
  display: flex;
  gap: 15px;
}

.marcas-grid img {
  width: 80px;
  height: auto;
}

.toggle-brands {
  cursor: pointer;
  font-weight: bold;
}

.dropdown {
  position: absolute;
  background: white;
  border: 1px solid #ccc;
  padding: 10px;
  top: 18%;
  left: 18%;
  border-radius: 5px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 2000;
}

.dropdown ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.dropdown li {
  padding: 5px;
  cursor: pointer;
}

.dropdown li:hover {
  background: #f0f0f0;
}
</style>
