<template>
  <div class="col-2 bg-secondary h-100 px-2 pt-5 text-center">
    <img src="../assets/user.png" width="100" class=" img-fluid mt-5" alt="user_img">
    <h2 class="display-6 pt-3 text-center">{{user.displayName}}</h2>
    <h2 class="display-5 pt-3 text-center">{{user.email}}</h2>
    <div class="mt-3">
        <button @click="handleClick" class="btn btn-danger">Signout</button>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

export default{
  setup() {
    const error = ref(null)
    const store = useStore()
    const router = useRouter()
    const handleClick = async () => {
      try{
        await store.dispatch('logout')
        router.push('/login')
      }
      catch (err) {
        error.value = err.message
      }
    }
    return { handleClick, user: computed(() => store.state.user), }
  }
}
</script>

<style>
.display-6{
    font-size: 2rem;
}
@media screen and (max-width: 500px){
    .display-6{
        font-size: 1rem;
        text-align:justify ;
    }
}
</style>