// import global API
import Api from '../../api/Api'
import product from './product'

const cart = {

    // set namespace true
    namespaced: true,

    // state
    state:{

        // cart
        cart:[],

        // total cart
        cartTotal:0,

    },

    // mutations
    mutations: {
        // Get data cart
        GET_CART(state,product){
            state.cart = product
        },

        // get total cart
        TOTAL_CART(state,total){
            state.cartTotal = total
        },

        // get cart weight
        CART_WEIGHT(state,weight){
            state.cartWeight = weight
        }
    },

    // actions
    actions: {

        // action addToCart
        addToCart({commit}, { fk_product_id, price,quantity, weight }){

            // get data token user
            const token = localStorage.getItem('token')
            const user  = JSON.parse(localStorage.getItem('user'))

            // set axios header dengan type authorization + Bearer token
            Api.defaults.headers.common['Authorization'] = "Bearer" + token

            // Send data cart ke server
            Api.post('/cart',{
                fk_product_id: fk_product_id,
                price:price,
                quantity: quantity,
                weight:weight,
                fk_customer_id: user.id
            }).then(()=> {

                // get data cart
                Api.get('/cart')
                .then(response => {

                    // Commit mutation GET_CART
                    commit('GET_CART', response.data.cart)
                })

                // get total cart
                Api.get('cart/total')
                .then(response => {

                    // commit mutation TOTAL_CART
                    commit('TOTAL_CART',response.data.total)
                })
            })
        }
    },

    // getters
    getters: {

        // get cart
        geCart(state){
            return state.cart
        },

         //count cart
        cartCount(state) {
            return state.cart.length
        }
    }
}

export default cart