<template>

  
    <div class="container">
        <h4  class="font-weight-bold">Category</h4>
        <div class="row">
            <div class="col-md-3 col-sm-6 my-2" v-for="(category,index) in categories" :key="index" >
                
                <router-link :to="{name: 'detail_category', params:{slug: category.slug}}" class="text-decoration-none text-dark">
                    <div class="card" data-aos="zoom-in" :data-aos-delay="index * 100" >
                        
                        <div class="card-body text-center"  >
                            <img :src="category.image" width="100" > 
                            <h5 >{{ category.name }}</h5>
                        </div>
                        
                    </div>
                </router-link>
            </div>
           
        </div>
        <div class="row justify-content-center" 
        data-aos="fade-up"
        data-aos-delay="50"
        data-aos-duration="1000"
       
        >
           <router-link :to="{name: 'categories'}" class="list-group-item text-center active shadow-sm font-weight-bold text-decoration-none">LIHAT KATEGORI LAINNYA <i class="fa fa-long-arrow-alt-right"></i></router-link>
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

             //computed properti digunakan untuk mendapatkan data dari state "categories" di module "category" 
            const categories = computed(() => {
                return store.state.category.categories
            })

            return {
                store,
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