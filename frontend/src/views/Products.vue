<template>
  <!-- Carrusel Ofertas -->
  <div class="carousel-container">
    <h2 style="text-align: start;">Ofertas</h2>
    <button class="arrow left" @click="scrollLeft('ofertaCarousel')">❮</button>
    <div class="carousel-wrapper">
      <div class="carousel" ref="ofertaCarousel" @scroll="updateScroll('ofertaCarousel')">
        <div v-for="juguete in juguetesEnOferta" :key="juguete.id" class="carousel-item">
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
        <div v-for="juguete in juguetes" :key="juguete.id" class="carousel-item">
          <img :src="juguete.imagen" :alt="juguete.nombre" class="imagen" />
          <h3>{{ juguete.nombre }}</h3>
          <span class="precio">Precio: ${{ juguete.precio }}</span>
        </div>
      </div>
      <div class="scroll-bar" ref="productosScrollBar" @mousedown="startDrag('productosCarousel', $event)"></div>
    </div>
    <button class="arrow right" @click="scrollRight('productosCarousel')">❯</button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

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
  juguetesEnOferta.value = seleccionarAleatorios(data, 5);
} catch (err) {
  console.error(err);
}
});

const seleccionarAleatorios = (lista: Juguete[], cantidad: number) => {
return lista.sort(() => 0.5 - Math.random()).slice(0, cantidad);
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
  white-space: nowrap; /* Evita que el texto se desborde en varias líneas */
  overflow: hidden; /* Oculta el texto que sobrepasa el contenedor */
  text-overflow:clip; /* Agrega los tres puntos (...) al final */
  max-width: 180px; /* Ajusta el ancho máximo según tu diseño */
}

h2 {
font-size: 20px;
margin-bottom: 10px;
}

/* Contenedor del carrusel */
.carousel-container {
position: relative;
margin: 20px 0;
overflow: hidden;
padding: 10px;
}

.carousel-wrapper {
position: relative;
padding-bottom: 20px; /* Espacio para la barra */
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

/* Botones de navegación */
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

/* Barra de desplazamiento personalizada */
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
