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
        type="text" class="input-field" placeholder="XXXX-XXXX-XXXX-XXXX"
        v-model="numeroTarjeta" @input="formatearTarjeta" maxlength="16" required />

      <label>Fecha de vencimiento:</label>
      <div class="expiry-fields">
        <input type="text" class="input-small" placeholder="MM" v-model="mes" maxlength="2" required />
        <input type="text" class="input-small" placeholder="YY" v-model="anio" maxlength="2" required />
      </div>

      <label>CVC:</label>
      <div class="cvc-container">
        <input type="text" class="input-small" placeholder="XXX" v-model="cvc" maxlength="3" required />
      </div>

      <h5 class="total">Total</h5>
      <p class="price">MXN {{ totalCarrito }}</p>

      <button class="pay-button" @click="validarFormulario">Finalizar pago</button>
      <button class="pay-button" style="margin-top: 10px;" @click="PDF">Imprimir recibo</button> <!-- Opción de imprimir -->
    </div>

    <div class="product-section">
      <h5>Resumen de compra</h5>
      <div v-for="prod in carrito" :key="prod.id" class="product-item">
        <p>{{ prod.juguete.nombre }} (x{{ prod.cantidad }})</p>
        <p class="product-price">${{ prod.juguete.precio * prod.cantidad }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import NavBar from '@/components/NavBar.vue';
import { useRoute } from "vue-router";
import jsPDF from "jspdf";

const route = useRoute();
const router = useRouter();
const usuarioId = ref(localStorage.getItem("usuario_id") || "");
const numeroTarjeta = ref("");
const mes = ref("");
const anio = ref("");
const cvc = ref("");
const carrito = ref<any[]>([]);

// Obtener carrito desde localStorage
const cargarCarrito = () => {
  const carritoGuardado = localStorage.getItem(`carrito_${usuarioId.value}`);
  carrito.value = carritoGuardado ? JSON.parse(carritoGuardado) : [];
  console.log("🛒 Carrito cargado:", carrito.value); // ✅ Verifica en la consola
};

// Computed para calcular el total
const totalCarrito = computed(() => {
  return carrito.value.reduce((total, prod) => total + (prod.juguete.precio * prod.cantidad), 0);
});

// Validar formulario antes de proceder al pago
const validarFormulario = () => {
  if (!numeroTarjeta.value || !mes.value || !anio.value || !cvc.value) {
    alert("Todos los campos son obligatorios.");
    return;
  }
  guardarPedidos(); // Llamamos a la función para guardar en la base de datos
};

// Guardar los productos en la tabla pedidos
const guardarPedidos = async () => {
  if (!usuarioId.value) {
    alert("Debes iniciar sesión para proceder con el pago.");
    router.push({ name: "login" });
    return;
  }

  try {
    for (const prod of carrito.value) {
      await axios.post("http://localhost:7000/api/guardar", {
        usuarioId: usuarioId.value,
        jugueteId: prod.juguete.id,
        cantidad: prod.cantidad,
        total: prod.juguete.precio * prod.cantidad,
      });
    }

    alert("Pago realizado con éxito. Los productos han sido registrados.");
    localStorage.removeItem(`carrito_${usuarioId.value}`); // Limpiar carrito
    router.push({ name: "products" }); // Redirigir a la página principal

  } catch (error) {
    console.error("Error al guardar los pedidos:", error);
    alert("Hubo un problema al procesar el pago.");
  }
};

// Cargar carrito cuando se monta la página
onMounted(() => {
  const carritoQuery = route.query.carrito;
  if (carritoQuery) {
    carrito.value = JSON.parse(carritoQuery as string);
  }
});

const PDF = () => {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");

  const titulo = "Recibo de Compra";
  const width = doc.internal.pageSize.width;

  const stringWidth = doc.getStringUnitWidth(titulo) * doc.internal.getFontSize() / doc.internal.scaleFactor;
  const x = (width - stringWidth) / 2;

  doc.text(titulo, x, 20);

  doc.setLineWidth(0.5);
  doc.line(20, 25, width - 20, 25); 

  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");

  let yPosition = 35;

  doc.text("Resumen de Compra", 20, yPosition);
  yPosition += 10;

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + '...';
    }
    return text;
  };

  carrito.value.forEach((prod) => {
    const productoTexto = `${truncateText(prod.juguete.nombre, 30)} (x${prod.cantidad}) - $${(prod.juguete.precio * prod.cantidad).toFixed(2)}`;
    if (yPosition > 270) { 
      doc.addPage(); 
      yPosition = 10; 
    }
    doc.text(productoTexto, 20, yPosition);
    yPosition += 10;
  });

  doc.setFont("helvetica", "bold");
  if (yPosition > 270) {
    doc.addPage();
    yPosition = 10;
  }
  doc.text(`Total: $${totalCarrito.value.toFixed(2)}`, 20, yPosition);
  yPosition += 10;

  doc.setLineWidth(0.5);
  doc.line(20, yPosition, width - 20, yPosition); 
  yPosition += 10;

  doc.setFont("helvetica", "normal");
  doc.text("¡Gracias por tu compra! Tu pedido ha sido procesado exitosamente.", 20, yPosition);
  yPosition += 20;

  doc.setFont("helvetica", "italic");
  if (yPosition > 270) {
    doc.addPage();
    yPosition = 10;
  }
  
  const firmaTexto = "FunToys";
  const stringWidthFirma = doc.getStringUnitWidth(firmaTexto) * doc.internal.getFontSize() / doc.internal.scaleFactor;
  const xFirma = (width - stringWidthFirma) / 2;
  doc.text(firmaTexto, xFirma, yPosition);

  doc.save("recibo.pdf");
};
</script>
  
  <style scoped>
 .payment-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  padding: 20px;
  border: 2px solid #f0e68c;
  border-radius: 15px;
  max-width: 800px;
  background-color: #f8f9fa;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  margin: auto;
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

.total {
  font-weight: bold;
}

.price {
  font-size: 1.2em;
}

.product-item {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ccc;
  padding: 5px 0;
}

.product-price {
  font-weight: bold;
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