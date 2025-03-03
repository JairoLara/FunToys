<template>
  <AdminNavBar />
  <CategoriasNav />
  <AdminCatnav />
  <!-- Carrusel Ofertas -->
  <div class="carousel-container">
    <h2 style="text-align: start;">Ofertas</h2>
    <button class="arrow left" @click="scrollLeft('ofertaCarousel')">❮</button>
    <div class="carousel-wrapper">
      <div class="carousel" ref="ofertaCarousel" @scroll="updateScroll('ofertaCarousel')">
        <div v-for="juguete in juguetesEnOferta" :key="juguete.id" class="carousel-item" @click="iradetalle(juguete.id)">
          <img :src="juguete.imagen" :alt="juguete.nombre" class="imagen" />
          <h3>{{ juguete.nombre }}</h3>
          <p class="precio oferta">Oferta: ${{ juguete.precio }}</p>
        </div>
      </div>
      <div class="scroll-bar" ref="ofertaScrollBar" @mousedown="startDrag('ofertaCarousel', $event)"></div>
    </div>
    <button class="arrow right" @click="scrollRight('ofertaCarousel')">❯</button>
  </div>

  <!-- Carrusel Productos -->
  <div class="carousel-container">
    <h2>Productos</h2>
    <button class="arrow left" @click="scrollLeft('productosCarousel')">❮</button>
    <div class="carousel-wrapper">
      <div class="carousel" ref="productosCarousel" @scroll="updateScroll('productosCarousel')">
        <div v-for="juguete in juguetes" :key="juguete.id" class="carousel-item" @click="iradetalle(juguete.id)">
          <img :src="juguete.imagen" :alt="juguete.nombre" class="imagen" />
          <h3>{{ juguete.nombre }}</h3>
          <span class="precio">Precio: ${{ juguete.precio }}</span>
        </div>
      </div>
      <div class="scroll-bar" ref="productosScrollBar" @mousedown="startDrag('productosCarousel', $event)"></div>
    </div>
    <button class="arrow right" @click="scrollRight('productosCarousel')">❯</button>
  </div>

  <AggProduct
      :mostrarModal="mostrarModal"
      :setMostrarModal="setMostrarModal"
    />

  <Footer />
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
const router = useRouter();
import { ref, onMounted } from "vue";
import Footer from "@/components/footer.vue";
import AdminNavBar from '@/components/admin/AdminNav.vue';
import AdminCatnav from '@/components/admin/AdminCatnav.vue';
import CategoriasNav from '@/components/CategoriasNav.vue';
import AggProduct from "@/components/admin/AggProduct.vue";


const mostrarModal = ref(false);

// Cambiar el valor de mostrarModal para mostrar u ocultar el modal
const setMostrarModal = (valor: boolean) => {
  mostrarModal.value = valor;
};


interface Juguete {
  id: number;
  nombre: string;
  precio: number;
  imagen: string;
}

const juguetes = ref<Juguete[]>([]);
const juguetesEnOferta = ref<Juguete[]>([]);
const ofertaCarousel = ref<HTMLElement | null>(null);
const productosCarousel = ref<HTMLElement | null>(null);
const ofertaScrollBar = ref<HTMLElement | null>(null);
const productosScrollBar = ref<HTMLElement | null>(null);
let isDragging = false;
let startX = 0;
let scrollLeftStart = 0;

onMounted(async () => {
  try {
    const response = await fetch("http://localhost:7000/api/juguetes");
    if (!response.ok) throw new Error("No se pudo obtener la lista de juguetes");
    const data = await response.json();
    juguetes.value = data;

    const ofertasGuardadas = localStorage.getItem("juguetesEnOferta");
    if (ofertasGuardadas) {
      juguetesEnOferta.value = JSON.parse(ofertasGuardadas);
    } else {
      const seleccionados = seleccionarDeterminados(data, 5);
      juguetesEnOferta.value = seleccionados;
      localStorage.setItem("juguetesEnOferta", JSON.stringify(seleccionados));
    }
  } catch (err) {
    console.error(err);
  }
});

const seleccionarDeterminados = (lista: Juguete[], cantidad: number) => {
  return lista.slice().sort((a, b) => a.id - b.id).slice(0, cantidad);
};

const iradetalle = (id: number) => {
  router.push(`/productadmin/${id}`);
};

const scrollLeft = (carouselRef: string) => {
  const carousel = carouselRef === "ofertaCarousel" ? ofertaCarousel.value : productosCarousel.value;
  if (carousel) {
    carousel.scrollBy({ left: -250, behavior: "smooth" });
  }
};

const scrollRight = (carouselRef: string) => {
  const carousel = carouselRef === "ofertaCarousel" ? ofertaCarousel.value : productosCarousel.value;
  if (carousel) {
    carousel.scrollBy({ left: 250, behavior: "smooth" });
  }
};

const updateScroll = (carouselRef: string) => {
  const carousel = carouselRef === "ofertaCarousel" ? ofertaCarousel.value : productosCarousel.value;
  const scrollBar = carouselRef === "ofertaCarousel" ? ofertaScrollBar.value : productosScrollBar.value;

  if (carousel && scrollBar) {
    const scrollPercentage = carousel.scrollLeft / (carousel.scrollWidth - carousel.clientWidth);
    scrollBar.style.left = `${scrollPercentage * 100}%`;
  }
};

const startDrag = (carouselRef: string, event: MouseEvent) => {
  isDragging = true;
  startX = event.clientX;
  const carousel = carouselRef === "ofertaCarousel" ? ofertaCarousel.value : productosCarousel.value;
  if (carousel) {
    scrollLeftStart = carousel.scrollLeft;
    document.addEventListener("mousemove", (e) => onDrag(e, carousel));
    document.addEventListener("mouseup", stopDrag);
  }
};

const onDrag = (event: MouseEvent, carousel: HTMLElement) => {
  if (!isDragging) return;
  const moveX = event.clientX - startX;
  carousel.scrollLeft = scrollLeftStart - moveX;
};

const stopDrag = () => {
  isDragging = false;
  document.removeEventListener("mousemove", onDrag as any);
  document.removeEventListener("mouseup", stopDrag);
};
</script>

<style scoped>
h3 {
  font-size: 18px;
  margin: 10px 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow:clip;
  max-width: 180px;
}

h2 {
  font-size: 20px;
  margin-bottom: 10px;
}

.carousel-container {
  position: relative;
  margin: 20px 0;
  overflow: hidden;
  padding: 10px;
}

.carousel-wrapper {
  position: relative;
  padding-bottom: 20px;
}

/* Carrusel */
.carousel {
  display: flex;
  overflow-x: auto;
  scroll-behavior: smooth;
  gap: 15px;
  padding: 10px;
}

.carousel::-webkit-scrollbar {
  display: none;
}

/* Elementos */
.carousel-item {
  min-width: 200px;
  background: #fff;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  text-align: center;
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
}

.precio {
  font-weight: bold;
  color: #28a745;
}

.oferta {
  color: red;
  text-decoration: line-through;
}

/* Botones de carr */
.arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  font-size: 20px;
  padding: 10px 15px;
  cursor: pointer;
  border-radius: 50%;
  z-index: 10;
}

.arrow.left {
  left: 5px;
}

.arrow.right {
  right: 5px;
}

.arrow:hover {
  background: rgba(0, 0, 0, 0.8);
}

/* Barra de aabajo */
.scroll-bar {
  position: absolute;
  bottom: 5px;
  left: 0;
  width: 30px;
  height: 8px;
  background: #888;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s;
}

.scroll-bar:hover {
  background: #555;
}
</style>
