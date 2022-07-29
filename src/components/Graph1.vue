<template>
  <div class=" ps-5">
    <h1 class="display-5 pt-4 ps-4">Monthly Graph {{graphIncome}} {{graphExpense}}</h1>
    <BarChart
    :chart-data="data"
    :options="options"
    height="50%"
  />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue"
import { BarChart } from "vue-chart-3"
import { useStore } from 'vuex'
import {
  Chart,
  BarController,
  CategoryScale,
  LinearScale,
  BarElement
} from "chart.js"
const store = useStore();

onMounted(async ()=>{
    await store.dispatch("getGraphInfo")
}) 

Chart.register(BarController, CategoryScale, LinearScale, BarElement)

const data = computed(() => ({
  labels: store.state.graphLabel,
  datasets: [
    {
      label: "Income",
      data: store.state.graphIncome,
      backgroundColor:  "#268bd2"  
    },
    { 
      label: "Expense",
      data: store.state.graphExpense,
      backgroundColor: "#2aa198"
    }
  ]
}))
const options = ref({
  plugins: {
    title: {
      text: "Bar"
    }
  }
})
</script>

<style>

</style>