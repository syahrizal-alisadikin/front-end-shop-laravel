import { createApp } from 'vue'
import App from './App.vue'

//import router
import router from './router'

//import store vuex
import store from './store'
const app = createApp(App)

//gunakan router di vue js dengan plugin "use"
app.use(router)
// Define Mixins for Global function

//gunakan store di vue js dengan plugin "use"
app.use(store)

app.mixin({

    methods:{

        // Money Thousands
        moneyFormat(number){
            let reverse = number.to.String().split('').reverse().join(''),
            thausands = reverse.match(/\d{1,3}/g)
            thausands = thausands.join('.').split('').reverse().join('')
            return thausands
        },

        // Calculate Diskon
        calculateDiscount(product){
            return product.price - (product.price * (product.discount)/100)
        }
    }
})

app.mount('#app')