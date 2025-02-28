<template>
  <nav class="navbar">
    <div class="navbar-content">
      <img
        src="../images/logo_completo_png-removebg-preview.png"
        alt="FunToys Logo"
        class="logo"
      />

      <div class="search-icons-container">
        <div class="search-container">
          <input
            type="text"
            placeholder="Buscar productos..."
            v-model="searchQuery"
            @input="fetchJuguetes"
          />
          <button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="34px"
              viewBox="0 -960 960 960"
              width="34px"
              fill="#666666"
            >
              <path
                d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"
              />
            </svg>
          </button>
          <ul v-if="juguetes.length > 0" class="search-results" ref="searchResults">
            <li v-for="juguete in juguetes" :key="juguete.id">
              <img :src="juguete.imagen" :alt="juguete.nombre" class="juguete-imagen" />
              {{ juguete.nombre }}
            </li>
          </ul>
        </div>
        <div class="icons">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="34px"
            viewBox="0 -960 960 960"
            width="34px"
            fill="#5985E1"
          >
            <path
              d="M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm246-164q-59 0-99.5-40.5T340-580q0-59 40.5-99.5T480-720q59 0 99.5 40.5T620-580q0 59-40.5 99.5T480-440Zm0 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q53 0 100-15.5t86-44.5q-39-29-86-44.5T480-280q-53 0-100 15.5T294-220q39 29 86 44.5T480-160Zm0-360q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm0-60Zm0 360Z"
            />
          </svg>
          <img
            src="../images/favourite-icon 2.png"
            alt="favorite icon"
            class="user-icon"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="34px"
            viewBox="0 -960 960 960"
            width="34px"
            fill="#EA3323"
          >
            <path
              d="M280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM246-720l96 200h280l110-200H246Zm-38-80h590q23 0 35 20.5t1 41.5L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68-39.5t-2-78.5l54-98-144-304H40v-80h130l38 80Zm134 280h280-280Z"
            />
          </svg>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";

interface Juguete {
  id: number;
  nombre: string;
  imagen: string;
}

const searchQuery = ref("");
const juguetes = ref<Juguete[]>([]);

const fetchJuguetes = async () => {
  if (searchQuery.value.length > 2) {
    try {
      const response = await fetch("http://localhost:7000/api/juguetes");
      const data: Juguete[] = await response.json();
      juguetes.value = data.filter((juguete) =>
        juguete.nombre.toLowerCase().includes(searchQuery.value.toLowerCase())
      );
      console.log("Juguetes encontrados:", juguetes.value);
    } catch (error) {
      console.error("Error al obtener juguetes:", error);
    }
  }
};

const closeResults = (event: MouseEvent) => {
  const searchResults = document.querySelector(".search-results");
  if (searchResults && !searchResults.contains(event.target as Node)) {
    juguetes.value = [];
  }
};

onMounted(() => {
  document.addEventListener("click", closeResults);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", closeResults);
});
</script>

<style scoped>
.navbar-content {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 90px;
  background-color: #fff;
  align-items: center;
  padding: 10px;
}

.logo {
  max-width: 150px;
  height: auto;
  cursor: pointer;
}

.search-icons-container {
  display: flex;
  align-items: center;
}

.search-container {
  position: relative;
  display: flex;
  align-items: center;
  border: 3px solid #ccc;
  border-radius: 40px;
  margin-right: 10px;
  width: 600px;
  height: 40px;
  background-color: white;
}

input {
  width: 100%;
  border: none;
  padding: 10px;
  border-radius: 40px;
  outline: none;
}

button {
  background-color: transparent;
  border: none;
  padding: 10px;
  border-radius: 50%;
  cursor: pointer;
}

.search-results {
  position: absolute;
  top: 45px;
  left: 0;
  width: 100%;
  background: white;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  list-style: none;
  padding: 5px;
  margin: 0;
  z-index: 10;
}

.juguete-imagen {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 5px;
  margin-right: 10px;
}

.search-results li {
  padding: 8px;
  cursor: pointer;
  transition: background 0.3s;
}

.search-results li:hover {
  background: #f0f0f0;
}

.icons {
  display: flex;
  align-items: center;
  padding: 15px;
  gap: 15px;
}

.user-icon {
  width: 34px;
  height: 34px;
}
</style>
