// import Global Api
import { reject } from 'core-js/fn/promise'
import Api from '../../api/Api'

const auth = {

    //set namespace true
    namespaced: true,

    //state
    state: {

        // state untuk token, pakai Localstorage, untuk menyimpan informasi tentang JWT
        token: localStorage.getItem('token') || '',

        // state user ,pakai localstorage, untuk menyimpan data user yang sedang login
        user: JSON.parse(localStorage.getItem('user')) || {},

    
    },

    //mutations
    mutations: {

        // update state token dan state user dari hasil response
        AUTH_SUCCESS(state,token,user){
            state.token = token  //Asiign state token dengan response token
            state.user = user // asign state user dengan response data user
        },

        //update state user dari hasil response register / login
        GET_USER(state, user) {
        state.user = user // <-- assign state user dengan response data user
        },

        //fungsi logout
        AUTH_LOGOUT(state) {
        state.token = '' // <-- set state token ke empty
        state.user  = {} // <-- set state user ke empty array
        }
    },

    //actions
    actions: {
        // Action register
        register({ commit }, user){

            // define callback promise
            return new Promise((resolve, reject) => {

                // Send data ke server
                Api.post('/register',{

                    // Data yang dikirim ke server untuk proses register
                    name:user.name,
                    email:user.email,
                    password:user.password,
                    password_confirmation: user.password_confirmation
                })
                .then(response => {

                    // define variabel dengan isi hasil response dari server
                    const token = response.data.token
                    const user = response.data.user

                    // set Localstorage untuk menyimpan token dan data user
                    localStorage.setItem('token', token)
                    localStorage.setItem('user',JSON.stringify(user))

                    // set default header Axios dengan Token
                    Api.defaults.headers.common['Authorization'] = "Bearer" + token

                    // Commit auth success ke mutation
                    commit('AUTH_SUCCESS', token, user)

                    // resolve ke component dengan hasil response
                    resolve(response)
                }).catch(error => {

                    // Jika Gagal, remove localstorage dengan key token
                    localStorage.removeItem('token')

                    // Reject ke component dengan hasil response
                    reject(error.response.data)
                })
            })
            
        },

          // action Get User
        getUser({ commit }){

            // ambil data token dari localstorage
            const token = localStorage.getItem('token')

            Api.defaults.headers.common['Authorization'] = "Bearer" + token

            Api.get('/user')
            .then(response  => {
                // commit ke mutation GET_USER dengan hasil response
                commit('GET_USER', response.data.user)
            })
        },
        //action logout
        logout({ commit }) {
            
            //define callback promise
            return new Promise((resolve) => {
            
                //commit ke mutation AUTH_LOGOUT
                commit('AUTH_LOGOUT')
                
                //remove value dari localStorage
                localStorage.removeItem('token')
                localStorage.removeItem('user')

                //delete header axios
                delete Api.defaults.headers.common['Authorization']
                
                //return resolve ke component 
                resolve()

            })
        },
        //action login
        login({ commit }, user) {

            //define callback promise
            return new Promise((resolve, reject) => {
            
                Api.post('/login', {
                    
                    //data yang dikirim ke server
                    email: user.email,
                    password: user.password,
          
                  })
                    
                  .then(response => {
          
                    //define variable dengan isi hasil response dari server
                    const token = response.data.token
                    const user  = response.data.user
          
                    //set localStorage untuk menyimpan token dan data user
                    localStorage.setItem('token', token)
                    localStorage.setItem('user', JSON.stringify(user))
          
                    //set default header axios dengan token
                    Api.defaults.headers.common['Authorization'] = "Bearer " + token

                    //commit auth success ke mutation
                    commit('AUTH_SUCCESS', token, user)

                    //commit get user ke mutation
                    commit('GET_USER', user)

                    //resolve ke component dengan hasil response
                    resolve(response)
          
                  }).catch(error => { 
          
                      //jika gagal, remove localStorage dengan key token
                      localStorage.removeItem('token')

                      //reject ke component dengan hasil response
                      reject(error.response.data)
          
                  })

            })

        }
    },

    

  
    

    //getters
    getters: {

        // Get Current user
        currentUser(state){
            return state.user //return dengan data user

        },

        // Login
        isLoggedIn(state){
            return state.token //token dengan data token
        }

    }

}

export default auth