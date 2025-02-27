<template>
    <footer class="footer">
      <div class="footer-content">
        <div class="contact-info">
          <h3>Contáctanos</h3>
          <p>
            <font-awesome-icon icon="facebook" />
            @FunToys_Torreon
          </p>
          <p>
            <font-awesome-icon icon="instagram" />
            @FunToys_Torreon
          </p>
          <p>
            <font-awesome-icon icon="whatsapp" />
            +52 871 505 1905
          </p>
          <h3>Quiénes somos?</h3>
          <p>
            Somos una empresa de juguetería. <br />
            <router-link to="/about" class="about-link">Más información</router-link>
          </p>
        </div>
        <div class="logo-container">
          <img src="../images/logo_completo_png-removebg-preview.png" alt="FunToys Logo" class="logo" />
        </div>
      </div>
    </footer>
  </template>

<style scoped>
.footer {
    background: #fff;
    padding: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
.footer-content {
    display: flex;
    justify-content: space-between;
    width: 80%;
    max-width: 1200px;
  }
.contact-info, .about-info {
    flex: 1;
    padding: 10px;
  }
.logo-container {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
  }
.logo {
    max-width: 50%;
    height: auto;
  }
.icon {
    width: 20px;
    margin-right: 10px;
  }
.about-link {
    color: #007bff;
    text-decoration: none;
  }
.about-link:hover {
    text-decoration: underline;
}
</style>