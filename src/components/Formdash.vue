<template>
<div class="pe-5 ps-4 pt-3">
<form class="row g-3 pt-4 ps-5 pe-5 h5" @submit.prevent="pushData">
    <div class="col-sm-2">
        <div class="  row mb-3">            
            <div class="">
                <select id="inputType" class="form-control " v-model="type">
                    <option selected>Income</option>
                    <option>Expense</option>
                </select>
            </div>
        </div>
    </div>
    <div class="col-md-7">
        <div class="row mb-3">
            <div class="">
                <input type="text" class="form-control" id="Desc" v-model="desc" placeholder="Description." required>
            </div>
        </div>
    </div>
    <div class="col-md-2">
        <div class="  row mb-3">    
            <div class="">
                <input type="number" class="form-control" id="price" v-model="price" placeholder="Price" required>
            </div>
        </div>
    </div>
    <div class="col-md-1">
        <div class="  row mb-2">                    
            <div class="">
                <button type="submit" class="form-control btn btn-primary">ADD</button>
            </div>
        </div>
    </div>
</form>
</div>
</template>

<script >
import { ref } from 'vue'
import { useStore } from 'vuex'

export default{
    setup(){
        const type = ref('Income');
        const desc = ref('');
        const price = ref('');
        const store = useStore();
        const pushData = async () => {
            try{
                let tstamp = new Date().getTime();
                await store.dispatch("addData",{
                    type: type.value,
                    desc: desc.value,
                    price: price.value,
                    tstamp : tstamp,
                })
            }
            catch(err) {
                console.log(err)
            } 
        }
        return{pushData,type,desc,price}
    }
}

</script>

<style>

</style>