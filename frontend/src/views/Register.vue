<template>

  <img src="/src/images/logo_completo_png-removebg-preview.png" alt="">
  <div class="login-container">
    <h1>Registrate</h1>
    <hr>
    <form @submit.prevent="handleLogin">

      <div class="form-group">
        <label for="name">Nombre:</label>
        <input placeholder="Introducir nombre" type="text" v-model="name" id="name" required />
      </div>

      <div class="form-group">
        <label for="email">Correo Electronico:</label>
        <input placeholder="Introducir correo electronico" type="email" v-model="email" id="email" required />
      </div>

      <div class="form-group">
        <label for="tel">Numero de telefono:</label>
        <input type="tel" v-model="telefono" placeholder="Ej: 8712619305" @input="validarTelefono" required>
      </div>

      <div class="form-group">
        <label for="password">Contrasena:</label>
        <input placeholder="Introducir contraseña" type="password" v-model="password" id="password" required />
      </div>

      <button type="submit">Registrarse</button>
    </form>
    <p><a href="/">¿Ya tienes cuenta?</a></p>

  </div>

</template>

<script setup>
import { ref } from 'vue';

const telefono = ref('');
const error = ref(false);

const validarTelefono = () => {
  telefono.value = telefono.value.replace(/\D/g, ""); // Solo números
  error.value = /\D/.test(telefono.value); // Verifica si hay letras
};
</script>

<style scoped>
a {
  color: #007bff;
  text-decoration: none;
  font-weight: bold;
  text-align: center;
  display: flex;
  margin: 0 auto;
  width: 50%;

}

a:hover {
  text-decoration: underline;
}

h1{
  text-align: center;
}

hr{
  margin-top: 0px;
  margin-bottom: 35px;
}

img {
  width: 200px;
  margin: 0 auto;
  display: block;
}

.login-container {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ffffff;
  border-radius: 10%;
  background-color: #ffffff;
  font-size: 18px;
  height: 100%;
}

.form-group {
  margin-bottom: 55px;
}

label {
  display: block;
  margin-bottom: 5px;
  text-align: left;
}

input {
  width: 100%;
  padding: 12px;
  box-sizing: border-box;
  border-radius: 100px;
  background-color: #bbd3f0;
  border: none;
  color: #8A8A8A;
  font-size: 18px;
  margin-bottom: -10px;
}

input:focus {
  outline: none;
}

button {
  display: flex;
  justify-content: center;
  margin: 0 auto;
  width: 50%;
  padding: 10px;
  background-color: #FB5355;
  color: white;
  border: none;
  border-radius: 100px;
  cursor: pointer;
  font-size: 18px;
}

button:hover {
  background-color: #b86768;

}
</style>
