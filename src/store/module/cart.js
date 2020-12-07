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
                  commit('cart/GET_CART', response.data.cart, { root: true }) 
                })

                // get total cart
                Api.get('cart/total')
                .then(response => {
                    console.log(response)
                    // commit mutation TOTAL_CART
                    commit('cart/TOTAL_CART', response.data.total, { root: true })
                })
                //resolve ke component dengan hasil response
                resolve(response)
                .catch(error => { 
            
                //jika gagal, remove localStorage dengan key token
                localStorage.removeItem('token')

                //reject ke component dengan hasil response
                reject(error.response.data)
            
                })
            })
        },
          // cart count 
    cartCount({ commit }){

        // get data token dan user
        const token = localStorage.getItem('token')
        // set axion header dengan type authorization + Bearer token
        Api.defaults.headers.common['Authorization'] = "Bearer" + token

        //console.log(token)

        // get data cart
        Api.get('/cart')
        .then(response => {

            //console.log(response.data)

            // commit mutation GET_CART
            commit('GET_CART', response.data.cart)
        })

      
    },
     //cart total
        cartTotal({ commit }) {

            //get data token dan user
            const token = localStorage.getItem('token')

            //set axios header dengan type Authorization + Bearer token
            Api.defaults.headers.common['Authorization'] = "Bearer " +token

            //get dat cart
            Api.get('/cart/total')
            .then(response => {
                
                //commit mutation GET_CART
                commit('TOTAL_CART', response.data.total)

            })
            

        },



    },

  
    // cart total
    cartTotal({ commit }){
        // get data token user
        const token = localStorage.getItem('token')

        // set axios header dengan type Authorization + Bearer token
        Api.defaults.headers.common['Authorization'] = "Bearer" + token

        // get data cart total
        Api.get('/cart/total')
        .then(response => {
            // commit mutation GET_CART
            commit('TOTAL_CART',response.data.total)
        })
    },

    // getters
    getters: {

        // get cart
        getCart(state){
            return state.cart
        },

         //count cart
        cartCount(state) {
            return state.cart.length
        },

        // cart total 
        cartTotal(state){
            return state.cartTotal
        }
    }
}

export default cart