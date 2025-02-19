<template>

  <img src="/src/images/logo_completo_png-removebg-preview.png" alt="">
  <div class="login-container">
    <h1>Iniciar sesion</h1>
    <hr>
    <form @submit.prevent="handleLogin">
      <div class="form-group">
        <label for="email">Correo Electronico:</label>
        <input placeholder="Introducir correo electronico" type="email" v-model="email" id="email" required />
      </div>
      <div class="form-group">
        <label for="password">Contrasena :</label>
        <input placeholder="Introducir contraseña" type="password" v-model="password" id="password" required />
      </div>
      <button type="submit">Inciar sesion</button>
    </form>
    <p><a href="/register">¿Aun no tienes cuenta?</a></p>

  </div>

</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    async handleLogin() {
      try {
        const response = await axios.post('/login', {
          email: this.email,
          contraseña: this.password
        });

        console.log('Login exitoso', response.data);
        this.$router.push('/dashboard');
      } catch (error) {
        console.error('Error en el login', error);
        alert('Correo o contraseña incorrectos');
      }
    }
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
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ffffff;
  border-radius: 10%;
  background-color: #ffffff;
  font-size: 18px;
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
