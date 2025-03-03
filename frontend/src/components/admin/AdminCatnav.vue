<template>
    <div style="background-color: white;padding-bottom: 1px;"><h2 style="font-size: 40px;" >Marcas</h2></div>
    <div class="carrusel-container">
        <div class="carrusel" ref="carruselRef" @mouseenter="pausarCarrusel" @mouseleave="reanudarCarrusel">
            <div v-for="marca in marcasinf" :key="marca.id" class="marca" @click="irAProductoMarca(marca.id)">
                <img :src="marca.imagen" class="marca-imagen" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";

const marcas = ref<any[]>([]);
const router = useRouter();
const carruselRef = ref<HTMLElement | null>(null);
let intervalo: number | null = null;
let direccion: "derecha" | "izquierda" = "derecha";

const fetchMarcas = async () => {
    try {
        const response = await fetch("http://localhost:7000/api/marca");
        if (!response.ok) throw new Error("Error al obtener las marcas");

        marcas.value = await response.json();
    } catch (error) {
        console.error("Error al cargar las imágenes de las marcas:", error);
    }
};

const marcasinf = computed(() => [
    ...marcas.value,
    ...marcas.value,
    ...marcas.value,
    ...marcas.value,
    ...marcas.value,
]);

const irAProductoMarca = (id: number) => {
    router.push(`/producto-marca/${id}`);
};

const iniciarCarrusel = () => {
    if (carruselRef.value) {
        intervalo = setInterval(() => {
            if (direccion === "derecha") {
                carruselRef.value!.scrollLeft += 1;
                if (carruselRef.value!.scrollLeft >= carruselRef.value!.scrollWidth / 20) {
                    direccion = "izquierda";
                }
            } else {
                carruselRef.value!.scrollLeft -= 1;
                if (carruselRef.value!.scrollLeft <= 0) {
                    direccion = "derecha";
                }
            }
        }, 20);
    }
};

const pausarCarrusel = () => {
    if (intervalo) clearInterval(intervalo);
};

const reanudarCarrusel = () => {
    iniciarCarrusel();
};

onMounted(() => {
    fetchMarcas();
    setTimeout(iniciarCarrusel, 1000);
});
</script>

<style scoped>
.carrusel-container {
    display: flex;
    justify-content: center;
    overflow: hidden;
    width: 100%;
    background-color: white;
}

.carrusel {
    display: flex;
    gap: 15px;
    overflow-x: scroll;
    white-space: nowrap;
    padding: 10px;
    scrollbar-width: none;
    -ms-overflow-style: none;
    scroll-behavior: smooth;
}

.carrusel::-webkit-scrollbar {
    display: none;
}

.marca {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background: linear-gradient(45deg, #ff6b6b, #6b6bff);
    box-shadow: rgba(0, 0, 0, 0.4) 0px 5px 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    flex-shrink: 0;
    transition: transform 0.3s ease-in-out;
}

.marca:hover {
    transform: scale(1.1);
}

.marca-imagen {
    width: 90%;
    height: auto;
    object-fit: contain;
}
</style>