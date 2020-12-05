<template>
    <div class="container mb-5 mt-4">

        <div class="row">
            <div v-for="(category,index) in categories" :key="index" class="col-md-2 col-sm-6 mb-3">
                <router-link :to="{name: 'detail_category', params:{slug: category.slug}}">
                    <div class="card h-100 border-0 rounded shadow" data-aos="fade-in" :data-aos-delay="index * 100" >
                        <div class="card-body text-center">
                            <img :src="category.image" alt="image" style="width:100px;">
                            <hr>
                            <label class="font-weight-bold">{{ category.name }}</label>
                        </div>
                    </div>
                </router-link>
            </div>
        </div>

    </div>
</template>

<script>
// Hook Vue
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
export default {

    setup(){
        //store vuex
        const store = useStore()

        // onMounted akan menjalankan action "getCategories" di module "category"
        onMounted(() => {
            store.dispatch('category/getCategories')
        })

        // computed properti digunakan mendapatkan data dari state categories di module "category"
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