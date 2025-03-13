<template>
    <AdminNav />
    <div class="favoritos-container">
      <h2></h2>
  
    </div>
  </template>
  
  <script setup lang="ts">
import AdminNav from '@/components/admin/AdminNav.vue';
  
 
  </script>
  
  <style scoped>
  .favoritos-container {
    background-color: #FFFFFF;
    padding: 20px;
    text-align: center;
  }
  
  h2 {
    color: rgb(94, 94, 94);
    font-size: 30px;
    padding-bottom: 15px;
  }
  
  .productos-favoritos {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: center;
  }
  
  .producto {
    background: #f9f9f9;
    padding: 15px;
    border-radius: 10px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    text-align: center;
    width: 250px;
  }
  
  .producto-img {
    width: 100%;
    height: auto;
    border-radius: 8px;
  }
  
  .precio {
    font-weight: bold;
    color: #ff6600;
  }
  
  button {
    background-color: red;
    color: white;
    padding: 8px 12px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 10px;
  }
  
  button:hover {
    background-color: darkred;
  }
  
  .mensaje {
    font-size: 18px;
    color: gray;
  }
  </style>