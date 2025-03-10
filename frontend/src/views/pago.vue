<template>
  <NavBar />
  <div class="payment-container">
    <div class="payment-section">
      <h5>Medios de pago:</h5>
      <div class="payment-logos">
        <img src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png" alt="Visa" />
        <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png" alt="MasterCard" />
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRooqX_tEjlq63fL2GQIpdJ50tuKZ7qT-qJ8A&s" alt="Mercado Pago" />
      </div>

      <label>Número de tarjeta:</label>
      <input 
        type="text" 
        class="input-field" 
        placeholder="XXXX-XXXX-XXXX-XXXX" 
        v-model="numeroTarjeta"
        @input="formatearTarjeta"
        maxlength="16"
        required 
      />

      <label>Fecha de vencimiento:</label>
      <div class="expiry-fields">
        <input 
          type="text" 
          class="input-small" 
          placeholder="MM" 
          v-model="mes"
          maxlength="2"
          @input="validarMes"
          required 
        />
        <input 
          type="text" 
          class="input-small" 
          placeholder="YY" 
          v-model="anio"
          maxlength="2"
          @input="validarAnio"
          required 
        />
      </div>

      <label>CVC:</label>
      <div class="cvc-container">
        <input 
          type="text" 
          class="input-small" 
          placeholder="XXX" 
          v-model="cvc"
          maxlength="3"
          @input="validarCVC"
          required 
        />
      </div>

      <h5 class="total">Total</h5>
      <p class="price">MXN {{ total }}</p>
      <button class="pay-button" @click="validarFormulario">Finalizar pago</button>
    </div>

    <div class="product-section">
      <h5>{{ productoNombre }}</h5>
      <p class="product-price">${{ total }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import NavBar from '@/components/NavBar.vue';

const route = useRoute();
const router = useRouter();

// Obtenemos el usuario desde localStorage
const usuarioId = ref(localStorage.getItem("usuario_id") || "");
const numeroTarjeta = ref("");
const mes = ref("");
const anio = ref("");
const cvc = ref("");
const jugueteId = ref(route.query.id ? Number(route.query.id) : null);
const productoNombre = ref(route.query.nombre || "Producto desconocido");
const cantidad = ref(route.query.cantidad ? Number(route.query.cantidad) : 1);
const precio = ref(route.query.precio ? Number(route.query.precio) : 0);

const total = computed(() => cantidad.value * precio.value);

// Verificar si el usuario está autenticado
const verificarUsuario = () => {
  if (!usuarioId.value) {
    alert("Debes iniciar sesión para proceder con el pago.");
    router.push({ name: "login" }); // Redirige al login si no hay usuario autenticado
    return false;
  }
  return true;
};

// Función para guardar el pedido
const guardarPedido = async () => {
  if (!verificarUsuario()) return; // Solo continuar si el usuario está autenticado

  console.log("Enviando datos a la API:", {
    usuarioId: usuarioId.value,
    jugueteId: jugueteId.value,
    cantidad: cantidad.value,
    total: total.value
  });

  try {
    const response = await axios.post("http://localhost:7000/api/guardar", {
      usuarioId: usuarioId.value,
      jugueteId: jugueteId.value,
      cantidad: cantidad.value,
      total: total.value
    });

    alert(response.data.mensaje);
    router.push({ name: "products" });
  } catch (error) {
    console.error("Error en la petición:", error.response ? error.response.data : error);
    alert("No se pudo completar el pago. Revisa la consola.");
  }
};

// Validar formulario antes de proceder al pago
const validarFormulario = () => {
  if (!numeroTarjeta.value || !mes.value || !anio.value || !cvc.value) {
    alert("Todos los campos son obligatorios.");
    return;
  }

  guardarPedido(); // Llamamos a la función para guardar en la base de datos
};
</script>




<style scoped>
.payment-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border: 2px solid #f0e68c;
  border-radius: 15px;
  max-width: 600px;
  background-color: #f8f9fa;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  box-sizing: border-box;
}
.payment-section, .product-section {
  width: 50%;
  padding: 10px;
}
.payment-logos img {
  width: 40px;
  margin-right: 10px;
}
.input-field {
  width: 100%;
  padding: 8px;
  margin: 5px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
}
.expiry-fields {
  display: flex;
  gap: 10px;
}
.input-small {
  width: 50px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
.cvc-container {
  margin-top: 10px;
}
.total {
  font-weight: bold;
}
.price {
  font-size: 1.2em;
}
.product-price {
  font-size: 1.5em;
}
.pay-button {
  width: 100%;
  padding: 10px;
  background-color: red;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.pay-button:hover {
  background-color: darkred;
}
</style>