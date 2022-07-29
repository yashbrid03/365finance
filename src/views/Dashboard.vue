<template>
  <div class="row g-0 w-screen vh-100">
    <Vnavbar />
    <Contentdash />
    <Vrightnav />
  </div>
</template>

<script>
import Vnavbar from '../components/Vnavbar.vue'
import Contentdash from '../components/Contentdash.vue'
import Vrightnav from '../components/Vrightnav.vue'

export default {
    components:{Vnavbar, Contentdash, Vrightnav}
}
</script>

<style>

</style>