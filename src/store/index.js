import { createStore } from "vuex";
import {
  ref,
  set,
  onValue,
  remove,
  update,
  child,
  get,
} from "firebase/database";
import { auth, db } from "../firebase/config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";

const store = createStore({
  state: {
    user: null,
    authIsReady: false,
    totalInvestment: 0,
    totalExpense: 0,
    totalIncome: 0,
    dailyData: null,
    thisMonthExpense: 0,
    thisMonthIncome: 0,
    thisMonthInvestment: 0,
    graphIncome: [],
    graphExpense: [],
    graphLabel: [],
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
      console.log("user state changed:", state.user);
    },
    setAuthIsReady(state, payload) {
      state.authIsReady = payload;
    },
    setTotalInvestment(state, payload) {
      state.totalInvestment = payload;
    },
    setTotalExpense(state, payload) {
      state.totalExpense = payload;
    },
    setTotalIncome(state, payload) {
      state.totalIncome = payload;
    },
    setDailyData(state, payload) {
      state.dailyData = payload;
    },
    setThisMonthIncome(state, payload) {
      state.thisMonthIncome = payload;
    },
    setThisMonthInvestment(state, payload) {
      state.thisMonthInvestment = payload;
    },
    setThisMonthExpense(state, payload) {
      state.thisMonthExpense = payload;
    },
    setGraphIncome(state, payload) {
      state.graphIncome = payload.reverse();
    },
    setGraphExpense(state, payload) {
      state.graphExpense = payload.reverse();
    },
    setGraphLabel(state, payload) {
      state.graphLabel = payload.reverse();
    },
  },
  actions: {
    async signup(context, { email, password }) {
      var months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      var date = new Date();
      const val = months[date.getMonth()] + "" + date.getFullYear();
      // create user
      const res = await createUserWithEmailAndPassword(auth, email, password);
      if (res) {
        //commit user
        context.commit("setUser", res.user);

        //create basic structure of database for newly created user
        const uid = res.user.uid;
        set(ref(db, "users/" + uid), {
          dailyData: "",
          investment: {
            investmentwallet: 0,
          },
          monthlydata: {
            [val]: {
              expense: 0,
              income: 0,
              investment: 0,
              label: val,
            },
          },
          totalinvestment: 0,
          totalincome: 0,
          totalexpense: 0,
        });
      } else {
        throw new Error("could not complete signup");
      }
    },

    async update(context, { name }) {
      console.log(name);
      await updateProfile(auth.currentUser, {
        displayName: name,
      })
        .then(() => {
          console.log("Profile updated!", auth.currentUser);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    async login(context, { email, password }) {
      const res = await signInWithEmailAndPassword(auth, email, password);
      if (res) {
        context.commit("setUser", res.user);
      } else {
        throw new Error("could not complete login");
      }
    },

    async logout(context) {
      await signOut(auth);
      context.commit("setUser", null);
    },

    async getInfo(context) {
      const info = ref(db, "users/" + this.state.user.uid);
      onValue(info, (snapshot) => {
        const data = snapshot.val();
        context.commit("setTotalInvestment", data.totalinvestment);
        context.commit("setTotalExpense", data.totalexpense);
        context.commit("setTotalIncome", data.totalincome);
      });
      var months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      var date = new Date();
      const val = months[date.getMonth()] + "" + date.getFullYear();
      // const info2 = ref(db, "users/"+this.state.user.uid+"/monthlyda")
      const dbRef = ref(db);
      get(child(dbRef, "users/" + this.state.user.uid + "/monthlydata/" + val))
        .then((snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.val();
            context.commit("setThisMonthExpense", data.expense);
            context.commit("setThisMonthIncome", data.income);
            context.commit("setThisMonthInvestment", data.investment);
          } else {
            console.log("no data found of " + val);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },

    async addData(context, { type, desc, price, tstamp }) {
      // Add data to daily item
      set(ref(db, "users/" + this.state.user.uid + "/dailyData/" + tstamp), {
        id: tstamp,
        desc: desc,
        price: price,
        type: type,
      });

      var months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      var date = new Date();
      const val = months[date.getMonth()] + "" + date.getFullYear();

      // Update total income
      if (type === "Income") {
        update(ref(db, "users/" + this.state.user.uid), {
          totalincome: this.state.totalIncome + price,
        });
        update(
          ref(db, "users/" + this.state.user.uid + "/monthlydata/" + val),
          {
            income: this.state.thisMonthIncome + price,
          }
        );
        const data = this.state.thisMonthIncome + price;
        context.commit("setThisMonthIncome", data);
      } else {
        // Update total expense
        update(ref(db, "users/" + this.state.user.uid), {
          totalexpense: this.state.totalExpense + price,
        });
        update(
          ref(db, "users/" + this.state.user.uid + "/monthlydata/" + val),
          {
            expense: this.state.thisMonthExpense + price,
          }
        );
        const data = this.state.thisMonthExpense + price;
        context.commit("setThisMonthExpense", data);
      }
      console.log("data added successfully");
    },

    async fetchDailydata(context) {
      var months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      var date = new Date();
      const val = months[date.getMonth()] + "" + date.getFullYear();
      console.log(val);
      const dbRef = ref(db);
      get(child(dbRef, "users/" + this.state.user.uid + "/monthlydata/" + val))
        .then((snapshot) => {
          if (snapshot.exists()) {
            const path = ref(db, "users/" + this.state.user.uid + "/dailyData");
            onValue(path, (snapshot) => {
              const data = snapshot.val();
              context.commit("setDailyData", data);
            });
          } else {
            const path = ref(db, "users/" + this.state.user.uid + "/dailyData");
            remove(path);
            set(
              ref(db, "users/" + this.state.user.uid + "/monthlydata/" + val),
              {
                expense: 0,
                income: 0,
                investment: 0,
                label: val,
              }
            );
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },

    async removeDailyDataItem(context, { id }) {
      var months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      var date = new Date();
      const val = months[date.getMonth()] + "" + date.getFullYear();
      const path = ref(db, "users/" + this.state.user.uid + "/dailyData/" + id);
      let obj;
      onValue(path, (snapshot) => {
        obj = snapshot.val();
      });
      // Update total income
      if (obj.type === "Income") {
        update(ref(db, "users/" + this.state.user.uid), {
          totalincome: this.state.totalIncome - obj.price,
        });
        // console.log(this.state.thisMonthIncome);
        update(
          ref(db, "users/" + this.state.user.uid + "/monthlydata/" + val),
          {
            income: this.state.thisMonthIncome - obj.price,
          }
        );
      } else {
        // Update total expense
        update(ref(db, "users/" + this.state.user.uid), {
          totalexpense: this.state.totalExpense - obj.price,
        });
        update(
          ref(db, "users/" + this.state.user.uid + "/monthlydata/" + val),
          {
            expense: this.state.thisMonthExpense - obj.price,
          }
        );
      }
      remove(path);
    },
    async getGraphInfo(context) {
      const info = ref(db, "users/" + this.state.user.uid + "/monthlydata/");
      onValue(info, (snapshot) => {
        const data = snapshot.val();
        console.log(data);
        let income = [];
        let expense = [];
        let label = [];
        for (const item of Object.entries(data)) {
          income.push(item[1].income);
          expense.push(item[1].expense);
          label.push(item[1].label);
        }
        context.commit("setGraphIncome", income);
        context.commit("setGraphExpense", expense);
        context.commit("setGraphLabel", label);
        // context.commit("setTotalInvestment", data.totalinvestment);
        // context.commit("setTotalExpense", data.totalexpense);
        // context.commit("setTotalIncome", data.totalincome);
      });
    },
  },
});

const unsub = onAuthStateChanged(auth, (user) => {
  store.commit("setAuthIsReady", true);
  store.commit("setUser", user);
  unsub();
});

// export the store
export default store;
