<template>
  <div class="news">
    <div class="new1">
      <div v-if="marcasprin.length > 0" class="marcas-grid">
        <div v-for="marca in marcasprin" :key="marca.id" @click="irAProductoMarca(marca.id)">
          <img :src="marca.imagen" :alt="marca.nombre" />
        </div>
      </div>
      <div class="images">
        <img src="../images/dracu.png" alt="" />
      </div>
      <div class="button" v-if="productoprin.length > 0">
        <button v-for="juguete in productoprin" :key="juguete.id" @click="irAProducto(juguete.id)">
          Ver producto
        </button>
      </div>
    </div>

    <div class="new2">
      <div v-if="marcasprin1.length > 0" class="marcas-grid">
        <div v-for="marca in marcasprin1" :key="marca.id" @click="irAProductoMarca(marca.id)">
          <img :src="marca.imagen" :alt="marca.nombre" />
        </div>
      </div>
      <div class="images">
        <img src="../images/negra.png" alt="" />
      </div>
      <div class="button" v-if="productoprin1.length > 0">
        <button v-for="juguete in productoprin1" :key="juguete.id" @click="irAProducto(juguete.id)">
          Ver producto
        </button>
      </div>
    </div>

    <div class="new3">
      <div v-if="marcasprin2.length > 0" class="marcas-grid">
        <div v-for="marca in marcasprin2" :key="marca.id" @click="irAProductoMarca(marca.id)">
          <img :src="marca.imagen" :alt="marca.nombre" />
        </div>
      </div>
      <div class="images">
        <img src="../images/pirana.png" alt="" />
      </div>
      <div class="button" v-if="productoprin2.length > 0">
        <button v-for="juguete in productoprin2" :key="juguete.id" @click="irAProducto(juguete.id)">
          Ver producto
        </button>
      </div>
    </div>

    <div class="new4">
      <div v-if="marcasprin3.length > 0" class="marcas-grid">
        <div v-for="marca in marcasprin3" :key="marca.id" @click="irAProductoMarca(marca.id)">
          <img :src="marca.imagen" :alt="marca.nombre" />
        </div>
      </div>
      <div class="images">
        <img src="../images/prime.png" alt="" />
      </div>
      <div class="button" v-if="productoprin3.length > 0">
        <button v-for="juguete in productoprin3" :key="juguete.id" @click="irAProducto(juguete.id)">
          Ver producto
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

export default {
  setup() {
    const marcas = ref([])
    const juguetes = ref([])
    const marcasprin = ref([])
    const marcasprin1 = ref([])
    const marcasprin2 = ref([])
    const marcasprin3 = ref([])
    const productoprin = ref([])
    const productoprin1 = ref([])
    const productoprin2 = ref([])
    const productoprin3 = ref([])

    const router = useRouter()

    const fetchProductos = async () => {
      try {
        const response = await fetch('http://localhost:7000/api/juguetes')

        if (!response.ok) throw new Error('Error al obtener los productos')

        const data = await response.json()
        juguetes.value = data

        productoprin.value = data.filter((juguete) => [25].includes(juguete.id))
        productoprin1.value = data.filter((juguete) => [14].includes(juguete.id))
        productoprin2.value = data.filter((juguete) => [1].includes(juguete.id))
        productoprin3.value = data.filter((juguete) => [21].includes(juguete.id))
      } catch (error) {
        console.error('Error al cargar las imágenes de los productos:', error)
      }
    }
    const irAProducto = (id) => {
      router.push(`/product/${id}`)
    }

    onMounted(fetchProductos)

    const fetchMarcas = async () => {
      try {
        const response = await fetch('http://localhost:7000/api/marca')

        if (!response.ok) throw new Error('Error al obtener las marcas')

        const data = await response.json()
        marcas.value = data

        marcasprin.value = data.filter((marca) => [7].includes(marca.id))
        marcasprin1.value = data.filter((marca) => [4].includes(marca.id))
        marcasprin2.value = data.filter((marca) => [1].includes(marca.id))
        marcasprin3.value = data.filter((marca) => [6].includes(marca.id))
      } catch (error) {
        console.error('Error al cargar las imágenes de las marcas:', error)
      }
    }

    const irAProductoMarca = (id) => {
      router.push(`/producto-marca/${id}`)
    }

    onMounted(fetchMarcas)

    return {
      marcasprin,
      marcasprin1,
      marcasprin2,
      marcasprin3,
      irAProductoMarca,
      irAProducto,
      productoprin,
      productoprin1,
      productoprin2,
      productoprin3,
    }
  },
}
</script>

<style scoped>
.news {
  display: grid;
  align-items: center;
  grid-template-columns: repeat(4, 1fr);
  background-color: rgb(255, 255, 255);
  columns: 4;
  column-gap: 2px;
  position: relative;
}

.new1 {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #87ffb1;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.new2 {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f893ff;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.new3 {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #87bdff;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.new4 {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #ff8385;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.marcas-grid img {
  width: auto;
  height: 200px;
  cursor: pointer;
}

.images {
  display: flex;
  justify-content: center;
  align-items: center;
}
.images img {
  width: auto;
  height: 500px;
}

button {
  position: absolute; /* Posiciona el botón sobre la imagen */
  bottom: 5%; /* Ajusta la posición verticalmente */
  font-size: 20px;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  border: 5px solid white;
  border-radius: 30px;
  padding: 10px 20px;
  cursor: pointer;
  box-shadow: rgba(0, 0, 0, 0.4) 0px 10px 10px;
  transform: translateX(-50%); /* Centra el botón horizontalmente */
}
</style>
