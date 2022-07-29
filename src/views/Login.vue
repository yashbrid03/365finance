<template>
<Nav/>
  <div class="container-sm px-5  py-5">
    <form class="row g-3 pt-4 h5" @submit.prevent="handleSubmit">
      <div class="col-md-6">
        <div class="  row mb-3">
          <label for="email" class="col-sm-3 col-form-label">Email :</label>
          <div class="col-sm-8">
            <input type="email" class="form-control" id="email" v-model="email" required>
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="row mb-3">
          <label for="password" class="col-sm-4 col-form-label">Password</label>
          <div class="col-sm-8">
            <input type="password" class="form-control" id="password" v-model="password" required>
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="  row mb-3">
          <button  type="submit" class="btn btn-primary col-sm-4">Login</button>
        </div>
      </div>
    </form>
    <div v-if="error">{{ error }}</div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import Nav from '../components/Nav.vue'

export default {
    components:{Nav},
  setup() {
    const email = ref('')
    const password = ref('')
    const error = ref(null)
    const store = useStore()
    const router = useRouter()
    const handleSubmit = async () => {
      try {
        await store.dispatch('login', {
          email: email.value,
          password: password.value
        })
        router.push('/dashboard')
      }
      catch (err) {
        error.value = err.message
      }
    }
    return { handleSubmit, email, password, error }
  }
}
</script>

<style>

</style>