<template>

  
    <div class="container">
        <h5 class="font-weight-bold">Category</h5>
        <div class="row">
        <div class="col-md-3 col-sm-6" v-for="category in categories" :key="category.id">
            <div class="card">
                
                <div class="card-body text-center">
                    <img :src="category.image" width="100" > 
                   <h5  >{{ category.name }}</h5>
                </div>
                
            </div>
        </div>
    </div>
    </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'

export default {
    setup(){

        // store vuex
        const store = useStore()

          //onMounted akan menjalankan action getCategories di module category, sebelum computed di atas dijalankan
            onMounted(() => {
                store.dispatch('category/getCategories')
            })

            //computed properti digunakan untuk get data categories dari state di module category 
            const categories = computed(() => {
                return store.state.category.categories
            })

            return {
                categories
            }

    }
}
</script>

<style scope>
    .card{
        border-radius: 10px ;
    }
</style>