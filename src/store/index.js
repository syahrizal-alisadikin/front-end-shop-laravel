//import vuex
import { createStore } from 'vuex'

//import module auth
import auth from './module/auth'
//import module order
import order from './module/order'

//import module category
import category from './module/category'

//import module slider
import slider from './module/slider'

//import module cart
import cart from './module/cart'

//import module product
import product from './module/product'
//create store vuex
export default createStore({

    modules: {
        auth, //Module Auth
        order, //Module order
        category, //Module Category
        slider, //Module Slider
        product, //Module Product
        cart,       // <-- module cart
    }

})