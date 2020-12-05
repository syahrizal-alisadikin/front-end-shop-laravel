import Api from "../../api/Api"

const category = {

    //set namespace true
    namespaced: true,

    //state
    state: {

        // index categories
        categories: [],

        // product in Category
        productInCategory: []
    
    },

    //mutations
    mutations: {

        // set state categories dengan data dari response
        GET_CATEGORIES(state,categories) {
            state.categories = categories
        },

        // set state prductInCategory dengan data dari response
        PRODUCT_IN_CATEGORY(state,CategoryIn){
            state.productInCategory = CategoryIn
        }

    },

    //actions
    actions: {

        // action getCategories
        getCategories({ commit }){
            Api.get('/categories')
            .then(response => {
                console.log(response)
                // commit ke mutattion GET_CATEGORIES dengan response data
                commit('GET_CATEGORIES', response.data.categories)
            }).catch(error => {
                // show error log dari response
                console.log(error)
            })
        },

        // action get data product berdasarkan category
        getProductInCategory({commit},slug){

            // get data product by category ke server
            Api.get(`/category/${ slug }`)
            .then(response => {
                console.log(response)
                // commit ke mutation PRODUCT_INCATEGORY dengan response data
                commit('PRODUCT_IN_CATEGORY', response.data.product)
            }).catch(error => {

                console.log(error)

            })
        }
    },

    //getters
    getters: {

    }

}

export default category