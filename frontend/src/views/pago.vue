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
        <input type="text" class="input-field" placeholder="XXXX-XXXX-XXXX-XXXX" />
        <label>Fecha de vencimiento:</label>
        <div class="expiry-fields">
          <input type="text" class="input-small" placeholder="MM" />
          <input type="text" class="input-small" placeholder="YY" />
        </div>
        <label>CVC:</label>
        <div class="cvc-container">
          <input type="text" class="input-small" placeholder="XXX" />
        </div>
        <h5 class="total">Total</h5>
        <p class="price">MXN</p>
      </div>
      
      <div class="product-section">
        <h5>....</h5>
        <p class="product-price">$</p>
        <button class="pay-button">Finalizar pago</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'PaymentView'
  };
  </script>
  
  <style scoped>
  
  .payment-container {
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
  