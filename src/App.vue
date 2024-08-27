<script setup>
import Header from './views/Header.vue'
import Footer from './views/Footer.vue'
</script>

<template>
  <div>
    <Header></Header>
    <router-view></router-view>
    <Footer></Footer>
  </div>
</template>

<style>
/* Optional: Add global styles here if needed */
</style>
