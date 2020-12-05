import Api from '../../api/Api'
const product = {

    //set namespace true
    namespaced: true,

    //state
    state: {

        // index Products
        products: [],
    
    },

    //mutations
    mutations: {
        // Set state products dengan data dari response
        GET_PRODUCTS(state,products){
            state.products = products
        }
        
    },
    
    //actions
    actions: {

        // action getProduct
        getProducts({ commit }) {

            // get data product ke server
            Api.get('/products')
            .then(response => {
                // commit ke mutation GET_PRODUCTS dengan response data
                commit('GET_PRODUCTS', response.data.products)
                
            }).catch(error => {
                // Show error log dari response
                console.log(error)
            })
        }
        
    },

    //getters
    getters: {

    }

}

export default product