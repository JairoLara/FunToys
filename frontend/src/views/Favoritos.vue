<template>
    <NavBar />
    <div class="favoritos-container">
      <h2>Mis Favoritos</h2>
    </div>
</template>
  
<script setup lang="ts">
  import NavBar from "@/components/NavBar.vue";
</script>

<style scoped>
    .favoritos-container{
        background-color: #FFFFFF;
    }
    h2{
        color: rgb(94, 94, 94);
        font-size: 30px;
        padding: 10px;
    }
</style>