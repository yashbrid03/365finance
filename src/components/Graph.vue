<template>
  <div class=" ps-5">
    <h1 class="display-5 pt-4 ps-4">Monthly Graph {{graphIncome}} {{graphExpense}}</h1>
    <canvas id="myChart" width="90%" class="pt-3"></canvas>
  </div>
</template>

<script >
import Chart from 'chart.js/auto';
import { useStore } from 'vuex'
import { onMounted, onBeforeMount } from '@vue/runtime-core';
import { computed } from 'vue'
export default {
    

    setup(){
        const store = useStore();
        onBeforeMount(async ()=>{
            await store.dispatch("getGraphInfo")
        });
        onMounted(async ()=>{    
        var c = document.getElementById("myChart");
        c.height = 235;
        const ctx = document.getElementById('myChart').getContext("2d");
        const myChart = new Chart(ctx, {
            type: 'bar',
            data:{
                labels: store.state.graphLabel,
                datasets: [
                    {
                        label: 'Income',
                        data: store.state.graphIncome,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                        ],
                        borderWidth: 1
                    },
                    {
                        label: 'Expense',
                        data: store.state.graphExpense,
                        backgroundColor: [
                            'rgba(54, 162, 235, 0.2)',
                        ],
                        borderColor: [
                            'rgba(54, 162, 235, 1)',
                        ],
                        borderWidth: 1
                    }, 
                ]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                },
                responsive: true,
            }
        });
        myChart
        }); 
        return{graphIncome : computed(() => store.state.graphIncome),
         graphExpense : computed(() => store.state.graphExpense)

        }
        
    
    }
    // mounted(){
    //     var c = document.getElementById("myChart");
    //     c.height = 235;
    //     const ctx = document.getElementById('myChart').getContext("2d");
    //     const myChart = new Chart(ctx, {
    //         type: 'bar',
    //         data: {
    //             labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple'],
    //             datasets: [{
    //                 label: 'Income',
    //                 data: [12, 19, 3, 5, 2],
    //                 backgroundColor: [
    //                     'rgba(255, 99, 132, 0.2)',
    //                 ],
    //                 borderColor: [
    //                     'rgba(255, 99, 132, 1)',
    //                 ],
    //                 borderWidth: 1
    //             },
    //             {
    //                 label: 'Expense',
    //                 data: [12, 19, 3, 5, 2],
    //                 backgroundColor: [
    //                     'rgba(54, 162, 235, 0.2)',
    //                 ],
    //                 borderColor: [
    //                     'rgba(54, 162, 235, 1)',
    //                 ],
    //                 borderWidth: 1
    //             },
    //             {
    //                 label: 'Investment',
    //                 data: [12, 19, 3, 5, 2],
    //                 backgroundColor: [
    //                     'rgba(255, 206, 86, 0.2)',
    //                 ],
    //                 borderColor: [
    //                     'rgba(255, 206, 86, 1)',
    //                 ],
    //                 borderWidth: 1
    //             }]
    //         },
    //         options: {
    //             scales: {
    //                 y: {
    //                     beginAtZero: true
    //                 }
    //             },
    //             responsive: true,
    //         }
    //     });
    //     myChart
    // }
}

</script>

<style>

</style>