import { createApp } from 'vue'
import App from './App.vue'
import AOS from 'aos';
import 'aos/dist/aos.css';
AOS.init();
AOS.refresh();
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

     
          //money thousands
        moneyFormat(number) {
            let reverse = number.toString().split('').reverse().join(''),
            thousands   = reverse.match(/\d{1,3}/g)
            thousands   = thousands.join('.').split('').reverse().join('')
            return thousands
        },

        // Calculate Diskon
        calculateDiscount(product){
            return product.price - (product.price * (product.discount)/100)
        }
    }
})

app.mount('#app')