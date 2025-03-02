<template>
  <img src="/src/images/logo_completo_png-removebg-preview.png" alt="Logo">
  <div class="login-container">
    <h1>Regístrate</h1>
    <hr>
    <form @submit.prevent="handleRegister">

      <div class="form-group">
        <label for="nombre">Nombre:</label>
        <input placeholder="Introducir nombre" type="text" v-model="nombre" id="nombre" required />
      </div>

      <div class="form-group">
        <label for="email">Correo Electrónico:</label>
        <input placeholder="Introducir correo electrónico" type="email" v-model="email" id="email" required />
      </div>

      <div class="form-group">
        <label for="password">Contraseña:</label>
        <input placeholder="Introducir contraseña" type="password" v-model="contraseña" id="password" required />
        <p v-if="errorContraseña" class="error-text">La contraseña debe tener al menos 6 caracteres.</p>
      </div>

      <button type="submit" :disabled="deshabilitarBoton">Registrarse</button>
    </form>
    <p><a href="/">¿Ya tienes cuenta?</a></p>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';

const nombre = ref('');
const email = ref('');
const contraseña = ref('');
const router = useRouter();

const handleRegister = async () => {
  if (!nombre.value || !email.value.includes('@') || errorContraseña.value) {
    Swal.fire({
      icon: 'warning',
      title: 'Oops...',
      text: 'Por favor, verifica los datos ingresados.',
    });
    return;
  }

  try {
    const response = await axios.post('http://localhost:7000/api/register', {
      nombre: nombre.value,
      email: email.value,
      contraseña: contraseña.value,
      rol: 'comprador'
    });

    console.log('Registro exitoso', response.data);

    Swal.fire({
      icon: 'success',
      title: '¡Registro Exitoso!',
      text: `Bienvenido, ${nombre.value}. Tu cuenta ha sido creada con éxito.`,
      confirmButtonColor: '#FB5355',
    }).then(() => {
      nombre.value = '';
      email.value = '';
      contraseña.value = '';
      router.push('/');
    });

  } catch (error) {
    console.error('Error en el registro', error.response?.data || error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: error.response?.data?.message || 'Hubo un problema al registrarse. Inténtalo de nuevo.',
    });
  }
};

const deshabilitarBoton = computed(() => {
  return !nombre.value || !email.value.includes('@') || errorContraseña.value;
});

const errorContraseña = computed(() => contraseña.value.length > 0 && contraseña.value.length < 6);
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

h1 {
  text-align: center;
}

hr {
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
  margin-bottom: 25px;
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

button:disabled {
  background-color: gray;
  cursor: not-allowed;
}

button:hover:not(:disabled) {
  background-color: #b86768;
}

.error-text {
  color: red;
  font-size: 14px;
  margin-top: 5px;
}
</style>
