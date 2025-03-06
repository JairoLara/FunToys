<template>
  <AdminNavBar />
  <div>
    <div class="marca-container">
      <button @click="mostrarFormulario = !mostrarFormulario" class="editar-btn">
        {{ mostrarFormulario ? 'Cancelar' : 'Editar marca' }}
      </button>
      <img :src="marca.imagen" :alt="marca.nombre" class="logo" />
      <button @click="eliminarMarca" class="eliminar-btn">Eliminar marca</button>
    </div>

    <div v-if="mostrarFormulario" class="formulario-editar">
      <h2>Editar Marca</h2>
      <form @submit.prevent="guardarCambios">
        <label>Nombre</label>
        <input type="text" v-model="marcaEditada.nombre" required />

        <label>Imagen (URL)</label>
        <input type="text" v-model="marcaEditada.imagen" required />

        <button type="submit">Guardar cambios</button>
      </form>
    </div>

    <div v-if="productos.length > 0" class="productos-container">
      <div class="productos-wrapper">
        <div
          v-for="producto in productos"
          :key="producto.id"
          class="producto-item"
          @click="iradetalle(producto.id)"
        >
          <img :src="producto.imagen" :alt="producto.nombre" class="imagen" />
          <h3>{{ producto.nombre }}</h3>
          <p class="precio">Precio: ${{ producto.precio }}</p>
        </div>
      </div>
    </div>
    <p v-else>Cargando productos...</p>
  </div>
  <Footer />
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import Footer from '@/components/footer.vue'
import AdminNavBar from '@/components/admin/AdminNav.vue'
import axios from 'axios'
import Swal from 'sweetalert2'

interface Producto {
  id: number
  nombre: string
  precio: number
  imagen: string
}

interface Marca {
  id: number
  nombre: string
  imagen: string
}

const route = useRoute()
const router = useRouter()
const marca = ref<Marca>({ id: 0, nombre: '', imagen: '' })
const marcaEditada = ref<Marca>({ id: 0, nombre: '', imagen: '' })
const productos = ref<Producto[]>([])
const mostrarFormulario = ref(false)

const fetchProductos = async () => {
  try {
    const response = await axios.get(`http://localhost:7000/api/${route.params.id}/juguetes`)
    marca.value = response.data
    marcaEditada.value = { ...response.data } // Copia los datos actuales
    productos.value = response.data.productos
  } catch (error) {
    console.error('Error al cargar los productos:', error)
  }
}

onMounted(fetchProductos)

const iradetalle = (id: number) => {
  router.push(`/productadmin/${id}`)
}

//editar las marcas
const guardarCambios = async () => {
  try {
    await axios.put(`http://localhost:7000/api/marca/${marca.value.id}`, marcaEditada.value)
    marca.value = { ...marcaEditada.value } // Actualiza en tiempo real
    mostrarFormulario.value = false
    Swal.fire('¡Actualizado!', 'La marca fue editada correctamente.', 'success')
  } catch (error) {
    console.error('Error al editar la marca:', error)
    Swal.fire('Error', 'No se pudo actualizar la marca.', 'error')
  }
}


//eliminar las marcas
const eliminarMarca = async () => {
  const resultado = await Swal.fire({
    title: '¿Estás seguro?',
    text: `Se eliminará la marca "${marca.value.nombre}" y todos sus productos. Esta acción no se puede deshacer.`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar'
  })

  if (resultado.isConfirmed) {
    try {
      await axios.delete(`http://localhost:7000/api/marca/${marca.value.id}`)
      await Swal.fire('¡Eliminado!', 'La marca y sus productos fueron eliminados.', 'success')
      router.push('/admin')
    } catch (error) {
      console.error('Error al eliminar la marca:', error)
      Swal.fire('Error', 'Hubo un problema al eliminar la marca.', 'error')
    }
  }
}
</script>

<style scoped>
.marca-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2rem 0;
  background-color: white;
}

.logo {
  width: 10%;
  height: auto;
}

.productos-wrapper {
  display: flex;
  justify-content: center;
  gap: 30px;
}

.producto-item {
  width: 200px;
  background: #fff;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  text-align: center;
  cursor: pointer;
  transition: transform 0.3s ease;

}

.producto-item:hover {
  transform: translateY(-5px);
}


.imagen {
  width: 100%;
height: 220px;
border-radius: 5px;
cursor: pointer;
}

h3 {
  font-size: 18px;
  margin: 10px 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: clip;
  max-width: 180px;
}

.precio {
  font-weight: bold;
  color: #28a745;
}
button {
  width: 30%;
  margin: 10px;
  padding: 10px;
  border-radius: 10px;
  background-color: #fb5355;
  color: white;
  font-size: 20px;
  cursor: pointer;
  border: none;
}

button:hover {
  background-color: #ff7b7e;
}


.formulario-editar {
  width: 50%;
  margin: auto;
  padding: 20px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.formulario-editar h2 {
  text-align: center;
  margin-bottom: 20px;
}

.formulario-editar input {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
}
</style>
