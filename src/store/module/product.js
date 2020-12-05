import Api from '../../api/Api'
const product = {

    //set namespace true
    namespaced: true,

    //state
    state: {

        // index Products
        products: [],
        productDetail : {}
    
    },

    //mutations
    mutations: {
        // Set state products dengan data dari response
        GET_PRODUCTS(state,products){
            state.products = products
        },

        DETAIL_PRODUCT(state,productDetail){
            state.productDetail = productDetail
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
        },
        
        // getDetailProduct
        getDetailProduct({ commit }, slug){
            // get data sliders ke server
            Api.get(`/product/${slug}`)
            .then(response => {
                // commit ke mutation GET_PRODUCT dengan response data
                commit('DETAIL_PRODUCT',response.data.product)
            }).catch(error => {
                // show error log dari response
            })
        }
    },

    //getters
    getters: {

    }

}

export default product