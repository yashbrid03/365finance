<template>
<div class="px-5 me-5 ms-4 overflow">
    <table class="table ">
        <thead class="sticky-top table-dark">
            <tr >
                <th scope="col">Type</th>
                <th scope="col">Description</th>
                <th scope="col">Price</th>
                <th scope="col">Action</th>
            </tr>
        </thead>
        <tbody >
            <tr  v-for="item in list" :key='item.id' >
                <td class="danger" v-if="item.type == 'Expense'">{{item.type}}</td>
                <td class="danger" v-if="item.type == 'Expense'">{{item.desc}}</td>
                <td class="danger" v-if="item.type == 'Expense'">{{item.price}}</td>
                <td class="success" v-if="item.type == 'Income'">{{item.type}}</td>
                <td class="success" v-if="item.type == 'Income'">{{item.desc}}</td>
                <td class="success" v-if="item.type == 'Income'">{{item.price}}</td>
                <td class="success" v-if="item.type == 'Income'"><button class="btn btn-danger" @click="removeData(item.id)">Delete</button></td>
                <td class="danger" v-if="item.type == 'Expense'"><button class="btn btn-danger" @click="removeData(item.id)">Delete</button></td>
            </tr>
        </tbody>
    </table>
</div>
</template>

<script>
import { useStore } from 'vuex';
import { onMounted } from '@vue/runtime-core';
import { computed } from 'vue';

export default {
    setup(){
        const store = useStore();
        const removeData = async (id) => {
            await store.dispatch("removeDailyDataItem",{id})   
        }
        onMounted(async ()=>{
            await store.dispatch("fetchDailydata")
        })
        return{removeData,
            list:computed(() => store.state.dailyData)
        }
    } 
}
</script>

<style>
.overflow{
    display:block;
    overflow:auto;
    max-height:15rem;
}
.danger{
    background-color :rgba(228, 15, 61, 0.29);
    color:white;
}
.success{
    background-color :rgba(58, 237, 88, 0.312);
    color:white;
}
.table>:not(caption) > * > *  {
    background-color:initial;
}
.table>:not(caption) > * > .success  {
    background-color :rgba(58, 237, 88, 0.312);
}
.table>:not(caption) > * > .danger  {
    background-color :rgba(228, 15, 61, 0.29);
}
thead{
    background-color: rgb(42, 46, 49);
}
</style>