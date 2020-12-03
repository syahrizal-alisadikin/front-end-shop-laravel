<template>
    <div class="container-fluid mb-5 mt-4">
        <div class="row">
            <div class="col-md-3 mb-4">
                <CustomerMenu/>
            </div>
            <div class="col-md-9 mb-4">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h5 class="font-weight-bold">
                            <i class="fas fa-tachometer-alt">DASBOARD</i>
                        </h5>
                        <hr>
                        Selamat Datang <strong>{{ user.name }}</strong>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// import Customer menu componen
import CustomerMenu from '@/components/CustomerMenu'
import { computed, onMounted, reactive} from 'vue'
import { useStore } from 'vuex'

import { log } from 'util'

export default {
    components: {
        // Customer Menu
        CustomerMenu,
    },

    setup() {
    
        //store Vuex
        const store = useStore()

        

        // Mounted
        onMounted(() => {
            // panggil action "GetUser" dari module "Auth vuex"
            store.dispatch('auth/getUser')
        })

        // computed
       

        const user = computed(() => {
                return store.getters['auth/currentUser']
        })

        return {
            store,
            user,
           
        }
    }
}
</script>