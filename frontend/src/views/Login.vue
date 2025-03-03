<template>
  <img src="/src/images/logo_completo_png-removebg-preview.png" alt="Logo">
  <div class="login-container">
    <h1>Iniciar Sesión</h1>
    <hr>
    <form @submit.prevent="handleLogin">
      <div class="form-group">
        <label for="email">Correo Electrónico:</label>
        <input
          placeholder="Introducir correo electrónico"
          type="email"
          v-model="email"
          id="email"
          required
        />
        <p v-if="email && !email.includes('@')" class="error-text">Falta el símbolo '@' en el correo.</p>
      </div>

      <div class="form-group">
        <label for="password">Contraseña:</label>
        <input
          placeholder="Introducir contraseña"
          type="password"
          v-model="contraseña"
          id="password"
          required
        />
      </div>

      <button type="submit" :disabled="!email || !contraseña || !email.includes('@')">Iniciar Sesión</button>
    </form>

    <p><a href="/register">¿No tienes cuenta? Regístrate</a></p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';

const email = ref('');
const contraseña = ref('');
const router = useRouter();

const handleLogin = async () => {
  if (!email.value.includes('@')) {
    Swal.fire('Error', 'Por favor, introduce un correo válido.', 'error');
    return;
  }

  try {
    const response = await axios.post('http://localhost:7000/api/login', {
      email: email.value,
      contraseña: contraseña.value
    });

    const data = response.data;
    console.log('Inicio de sesión exitoso:', data);

    if (data.id) {
      localStorage.setItem('usuario_id', String(data.id));
      localStorage.setItem('usuario_nombre', data.nombre);
      localStorage.setItem('usuario_rol', data.rol);

      if (data.token) {
        localStorage.setItem('token', data.token);
      }

      Swal.fire('Bienvenido', `Hola, ${data.nombre}`, 'success');

      // Redirigir según el rol
      if (data.rol === 'admin') {
        router.push('/admin');
      } else {
        router.push('/products');
      }
    } else {
      throw new Error("No se recibió el ID del usuario en la respuesta.");
    }
  } catch (error) {
    console.error('Error al iniciar sesión:', error.response?.data || error);
    Swal.fire('Error', 'Correo o contraseña incorrectos. Inténtalo de nuevo.', 'error');
  }
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
  margin-top: 5px;
}
</style>

