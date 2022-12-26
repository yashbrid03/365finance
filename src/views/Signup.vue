<template>
<Nav />
<div class="container-sm px-5  py-5">
  <h3 class="display-6">Sign up</h3>
  <form class="row g-3 pt-4 h5" @submit.prevent="handleSubmit">
    <div class="col-md-6">
      <div class="  row mb-3">
        <label for="Name" class="col-sm-3 col-form-label">Name :</label>
        <div class="col-sm-8">
          <input type="text" class="form-control" name="Name" v-model="name" required>
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <div class="row mb-3">
        <label for="email" class="col-sm-3 col-form-label">Email :</label>
        <div class="col-sm-8">
          <input type="email" class="form-control" name="email" v-model="email"  required>
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <div class="  row mb-3">
        <label for="password" class="col-sm-3 col-form-label"  >Password :</label>
        <div class="col-sm-8">
          <input type="password" class="form-control" name="password" v-model="password" required>
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <div class="  row mb-3">
        <label for="confirmpassword" class="col-sm-3 col-form-label"  >Confirm Password :</label>
        <div class="col-sm-8">
          <input type="password" class="form-control" name="confirmpassword" v-model="confirmpassword" required>
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <div class="  row mb-3">
        <button  type="submit" class="btn btn-primary col-sm-4">Sign up</button>
      </div>
    </div>
  </form>
  <div v-if="error">{{ error }}</div>
</div>
</template>

<script>

import Nav from '../components/Nav.vue'
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
  components: {Nav},
  setup() {
    const name = ref('')
    const email = ref('')
    const password = ref('')
    const error = ref(null)
    const confirmpassword = ref('')
    const store = useStore()
    const router = useRouter()

    const handleSubmit = async () => {
      try {
        if(password.value === confirmpassword.value){
          await store.dispatch('signup', {
            email: email.value,
            password: password.value
          })
          await store.dispatch('update',{
            name: name.value,
          })
          router.push('/dashboard')
        }
        else{
          error.value = "Passwords are not matching"
        } 
      }
      catch (err) {
        error.value = err.message
      }
    }
    return { handleSubmit, email, password, confirmpassword, error, name }
  }, 
}
</script>

<style>

</style>
