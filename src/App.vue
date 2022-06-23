<template>
  <div class=" w-screen  bg-dark ">
    <Nav />
    <router-view/>
  </div>
</template>

<script>
import Nav from './components/Nav.vue'
export default {
  name: 'App',
  components:{Nav},
}
</script>

<style>
.bg-dark{
  font-family: 'Poppins', sans-serif;
}
</style>
