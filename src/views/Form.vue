<template>
<Nav />
    <div class="container-sm px-5  py-5">
        <h1 class="heading"><b>Basic Details</b> </h1>
        <!-- basic details Form -->
        <form class="row g-3 pt-4 h5">
            <div class="col-md-6">
                <div class="  row mb-3">
                    <label for="Name" class="col-sm-3 col-form-label">Name</label>
                    <div class="col-sm-8">
                        <input type="text" class="form-control" id="Name" required>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="row mb-3">
                    <label for="monthlyExpense" class="col-sm-4 col-form-label">Monthly Expense</label>
                    <div class="col-sm-8">
                        <input type="number" class="form-control" id="monthlyExpense" v-model="monthlyExpense" v-on:change="calcAnnualExpense" required>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="  row mb-3">
                    <label for="DOB" class="col-sm-3 col-form-label"  >D.O.B</label>
                    <div class="col-sm-8">
                        <input type="date" class="form-control" id="DOB" v-model="DOB" required>
                    </div>
                </div>
            </div>
        </form>
        <div class="pt-3">
            <h1 class="display-6">Your annual expense : &#8377; <b class="text-danger">{{annualExpenses.toLocaleString()}}</b></h1>
            <h1 class="display-6 pt-3">Minimum amount to be invested : &#8377; {{annualInvestment.toLocaleString()}}</h1>
            <h6 class="display-5"><b>(According to 4 percent retirement rule)</b></h6>
        </div>

        <!-- Whats your goal -->
        <h1 class="heading pt-5"><b>What’s your Goal ?</b> </h1>

        <form class="row g-3 pt-4 h5">
            <div class="col-md-6">
                <div class="  row mb-3">
                    <label for="retirementAge" class="col-sm-4 col-form-label">Retirement Age :</label>
                    <div class="col-sm-7">
                        <input type="number" class="form-control" id="retirementAge" v-model="retirementAge" v-on:change="getInvestmentPeriod" required>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="row mb-3">
                    <label for="goalAmount" class="col-sm-4 col-form-label">Goal Amount:</label>
                    <div class="col-sm-8">
                        <input type="number" class="form-control" id="goalAmount" v-model="goalAmount"  required>
                    </div>
                </div>
            </div>  
        </form>
        <div class="pt-2">
            <h6 class="display-5"><b>(Goal amount is the amount you wish to have at the age of retirement)</b></h6>
        </div>

        <!-- Know your net worth ! -->
        <h1 class="heading pt-5"><b>Know your net worth !</b> </h1>

        <form class="row g-3 pt-4 h5">
            <div class="col-md-6">
                <div class="  row mb-3">
                    <label for="assets" class="col-sm-3 col-form-label text-success">Assets :</label>
                    <div class="col-sm-8">
                        <input type="number" class="form-control" id="assets" v-model="assets" v-on:change="getNetWorth" required>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="row mb-3">
                    <label for="liabilities" class="col-sm-4 col-form-label text-danger">Liabilities :</label>
                    <div class="col-sm-8">
                        <input type="number" class="form-control" id="liabilities" v-model="liabilities" v-on:change="getNetWorth" required>
                    </div>
                </div>
            </div>
        </form>
        <div class="pt-2">
            <h6 class="display-5 text-justify">
                (Assets means things that you own, like money invested in stocks or houses that you own. Make sure that you calculate the value that you will get for the item when selling it.<br>
                Liabilities means debts, like student loan, credit card debt and anything that you owe)
            </h6>
            <h1 class="display-6 pt-3" >You’r Net Worth : <b class="text-success" v-if="netWorth >= 0" >{{netWorth.toLocaleString()}} &#8377;</b> <b class="text-danger" v-if="netWorth < 0" >{{netWorth.toLocaleString()}} &#8377;</b> </h1>
        </div>
        <div class="pt-2">
            <h6 class="display-5 text-justify"><b>(It is normal to have negative net worth for people starting their journey to finance.
            If positive, subtract it from Goal amount else add it to Goal amount )</b></h6>
        </div>

        <!-- Get Investment Plan -->
        <h1 class="heading pt-5"><b>Get Investment Plan</b> </h1>
        <div class="pt-3">
            <h1 class="display-6">Goal Amount in today's value : &#8377; {{todayValue.toLocaleString()}}</h1>
            
        </div>
        <form class="row g-3 pt-4 h5" @submit.prevent="getPlan">
            <div class="col-md-6">
                <div class="  row mb-3">
                    <label for="inflation" class="col-sm-4 col-form-label">Expected Inflation</label>
                    <div class="col-sm-7">
                        <input type="number" class="form-control" id="inflation" v-model="inflation" required>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="row mb-3">
                    <label for="investmentPeriod" class="col-sm-4 col-form-label" >Investment Period</label>
                    <div class="col-sm-8">
                        <input type="text" class="form-control" id="investmentPeriod" v-model="investmentPeriod"   disabled required>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="  row mb-3">
                    <label for="ROI" class="col-sm-4 col-form-label"  >Expected R.O.I.</label>
                    <div class="col-sm-7">
                        <input type="number" class="form-control" step="0.001" id="ROI" v-model="ROI" required>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="  row mb-3">
                    <button  type="submit" class="btn btn-primary col-sm-4">Submit</button>
                </div>
            </div>
        </form>
        <div class="pt-3">
            <h1 class="display-6">Future Value of your Financial Goal : &#8377; {{FV.toLocaleString()}}</h1>
            <!-- monthlyinvestment -->
            <h1 class="display-6 pt-3">Monthly Investment Amount : &#8377; {{monthlyInvestment.toLocaleString()}}</h1>
            <h6 class=" display-5 text-justify"><b>(Amount must be compunded monthly)</b></h6>
            <!-- investedAmount = monthlyInvestment * investmentPeriod * 12 -->
            <h1 class="display-6 pt-3">Invested Amount : &#8377; {{investedAmount.toLocaleString()}}</h1>
            <!-- wealthGained = FV - investedAmount -->
            <h1 class="display-6 pt-3">Wealth Gained : &#8377;<b class="text-success"> {{wealthGained.toLocaleString()}}</b></h1>
        </div>

        <!-- How to reduce expenses -->
        <h1 class="heading pt-5"><b>How to reduce expenses</b> </h1>
        <div class="pt-3">
            <h1 class="display-6 text-warning">Start Tracking Your Spending Habits </h1>
            <h6 class="pt-2 display-5 text-justify"><b>The old-fashioned way to track is to write down every expense as you make it. That cumbersome exercise stops a lot of expense-cutters in their track. Go through everything you spent money on and determine what you really needed and what were “wants.”</b></h6>
        </div>
        <div class="pt-3">
            <h1 class="display-6 text-warning">Get on a budget</h1>
            <h6 class="pt-2 display-5 text-justify">The three major steps for how to make a budget are:
                <ul>
                    <li> your income.</li>
                    <li>Determine fixed monthly bills – rent, utilities, car payment, insurance, etc.</li>
                    <li>Determine needs — food, gas, medical expenses, etc.</li>
                </ul>
            </h6>
        </div>
        <div class="pt-3">
            <h1 class="display-6 text-warning">Shop with a List </h1>
            <h6 class="pt-2 display-5 text-justify"><b>There are a lot of ways to save money at the grocery store, but it all starts with a shopping list. This simple habit can end up cutting food expenses, help with meal planning and, if you stick to the list, cuts down on impulse buying.</b></h6>
        </div>
        <div class="pt-3">
            <h1 class="display-6 text-warning">Buy the unbranded products in the supermarket </h1>
            <h6 class="pt-2 display-5 text-justify"><b>You may only be saving pennies per item, but there really isn’t much difference in the taste—do not be seduced by pretty branding! The only difference, for example with unbranded tinned tomatoes and branded ones, is the lack of salt and sugar and you can add that yourself. Why pay loads extra for it?</b></h6>
        </div>
        <div class="pt-3">
            <h1 class="display-6 text-warning">Pay for things with cash only </h1>
            <h6 class="pt-2 display-5 text-justify"><b>Allow yourself a certain amount of money each week and spend only that amount. Unless you’re constantly checking your finances, there’s no way you can keep up-to-date with what you’ve really spent if you keep paying for things with your credit or debit cards.</b></h6>
        </div>
    </div>
</template>

<script setup>
import Nav from '../components/Nav.vue'
import {ref} from 'vue'

const DOB = ref('')
const monthlyExpense = ref('')
const annualExpenses = ref('')
const annualInvestment = ref('')
const goalAmount = ref('')
const assets = ref('')
const liabilities = ref('')
const netWorth = ref('')
const todayValue = ref('')
const investmentPeriod = ref('')
const investmentPeriodnum = ref('')
const retirementAge = ref('')
const inflation = ref('')
const ROI = ref('')
const FV = ref('')
const monthlyInvestment = ref('')
const investedAmount = ref('')
const wealthGained = ref('')

function calcAnnualExpense(){
    annualExpenses.value = monthlyExpense.value*12
    annualInvestment.value = annualExpenses.value/0.04
}

function getNetWorth(){
    netWorth.value = assets.value - liabilities.value;
    if(netWorth.value > 0){
        console.log("hello")
        console.log(goalAmount.value - netWorth.value)
        todayValue.value = goalAmount.value - netWorth.value
    }
    else if(netWorth.value < 0){
        todayValue.value = goalAmount.value + liabilities.value 
    }
    else{
        todayValue.value = goalAmount.value
    }
    
}

function getInvestmentPeriod(){
    var age_date = DOB.value
    var dob = new Date(age_date)
    var month_diff = Date.now() - dob.getTime();  
    var age_dt = new Date(month_diff); 
    var year = age_dt.getUTCFullYear();
    var age = Math.abs(year - 1970);
    investmentPeriod.value = (retirementAge.value - age).toString().concat(" Years")
    investmentPeriodnum.value = retirementAge.value - age
}

function getPlan(){
    FV.value = todayValue.value*Math.pow((1+(inflation.value/100)), investmentPeriodnum.value) 
    FV.value = Math.floor(FV.value)

    var i = ROI.value/100/12
    var periodInMonth = investmentPeriodnum.value * 12
    var a = Math.pow(1+i,periodInMonth)
    var b = (1 + i)/i
    monthlyInvestment.value = FV.value/((a-1)*b)
    investedAmount.value = monthlyInvestment.value * periodInMonth
    wealthGained.value = FV.value - investedAmount.value
    console.log("a = "+ a)
    console.log("b = "+ b)
    console.log("rhs"+((a-1)*b))
    console.log(Math.round(monthlyInvestment.value))
}

</script>

<style>
.display-5{
    font-size: 1.3rem;
}
.display-6{
    font-size: 2rem;
}

.text-justify{
    text-align: justify;
}
.heading{
      font-size: 3.5rem;
}

@media screen and (max-width: 500px){
  .heading{
    font-size: 2.8rem;
  }
  .display-5{
    font-size: 1rem;
    text-align:justify ;
}
}
</style>