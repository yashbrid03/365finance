<template>
  <div class="text-center">
    <h6 class="display-6 pt-5"><span class="badge bg-secondary w-60">Total Investment : <br>{{totalinvestment}}</span></h6>
    <h6 class="display-6 pt-4"><span class="badge bg-secondary w-60">Total Expenses<br>{{totalexpense}}</span></h6>
    <h6 class="display-6 pt-4"><span class="badge bg-secondary w-60">Total Income<br>{{totalincome}}</span></h6>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { onMounted } from '@vue/runtime-core';
import { computed } from 'vue'

export default{
  name:"info",
  setup(){
    const store = useStore();
    onMounted(async ()=>{
      await store.dispatch("getInfo")
      console.log("hello info:"+store.state.totalInvestment)
    })
    return {totalinvestment: computed(() => store.state.totalInvestment),
    totalincome: computed(()=> store.state.totalIncome),
    totalexpense: computed(()=> store.state.totalExpense)}
  }
}

</script>

<style>
.w-60{
  width:60%;
}
</style>