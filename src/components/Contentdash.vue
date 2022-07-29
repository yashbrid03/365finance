<template>
    <div class="col-9 h-100">
        <div class="container-fluid h-100">
            <div class="row h-50">
                <div class="col-7 "><Graph1 /></div>
                <div class="col-sm "><info/></div>
            </div>  
            <div>
                <Formdash/>
                <dashData/>
            </div> 
        </div>
    </div>    
</template>

<script setup>
import Graph1 from './Graph1.vue'
import info from './info.vue'
import Formdash from './Formdash.vue'
import dashData from './dashData.vue'

</script>

<style>
.h-45{
    height: 45%;
}
.h-55{
    height: 55%;
}

</style>