import Api from "../../api/Api"

const category = {

    //set namespace true
    namespaced: true,

    //state
    state: {

        // index categories
        categories: [],
    
    },

    //mutations
    mutations: {

        // set state categories dengan data dari response
        GET_CATEGORIES(state,categories) {
            state.categories = categories
        }
    },

    //actions
    actions: {

        // action getCategories
        getCategories({ commit }){
            Api.get('/categories')
            .then(response => {

                // commit ke mutattion GET_CATEGORIES dengan response data
                commit('GET_CATEGORIES', response.data.categories)
            }).catch(error => {
                // show error log dari response
                console.log(error)
            })
        }
    },

    //getters
    getters: {

    }

}

export default category