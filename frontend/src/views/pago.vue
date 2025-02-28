<template>
  
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
        maxlength="19"
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
      <p class="price">MXN</p>
      <button class="pay-button" @click="validarFormulario">Finalizar pago</button>
    </div>

    <div class="product-section">
      <h5>....</h5>
      <p class="product-price">$</p>
    </div>
  </div>

</template>

<script>
export default {
  name: "PaymentView",
  data() {
    return {
      numeroTarjeta: "",
      mes: "",
      anio: "",
      cvc: ""
    };
  },
  methods: {
    formatearTarjeta() {
      this.numeroTarjeta = this.numeroTarjeta.replace(/\D/g, ""); 
      this.numeroTarjeta = this.numeroTarjeta.replace(/(\d{4})/g, "$1-").trim(); 
      this.numeroTarjeta = this.numeroTarjeta.slice(0, 19); 
    },
    validarMes() {
      this.mes = this.mes.replace(/\D/g, ""); 
      if (this.mes.length === 2 && (parseInt(this.mes) < 1 || parseInt(this.mes) > 12)) {
        this.mes = "";
        alert("El mes debe estar entre 01 y 12");
      }
    },
    validarAnio() {
      this.anio = this.anio.replace(/\D/g, "");
      if (this.anio.length > 2) this.anio = this.anio.slice(0, 2);
    },
    validarCVC() {
      this.cvc = this.cvc.replace(/\D/g, ""); 
      if (this.cvc.length > 3) this.cvc = this.cvc.slice(0, 3);
    },
    validarFormulario() {
      if (!this.numeroTarjeta || !this.mes || !this.anio || !this.cvc) {
        this.errorMensaje = "Todos los campos son obligatorios.";
        return;
      }

      this.errorMensaje = ""; 
      
      let numeroWhatsApp = "521234567890"; 

      
      let mensaje = "El pago ha sido procesado correctamente.";

      
      let url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;

     
      window.open(url, "_blank");
  }
}
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
