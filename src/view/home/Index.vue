<template>
    <div class="container-fluid mt-3">
        <div class="row">
           
            <div class="col-md-12 mb-4">
                <Slider /> <!-- component Slider -->
            </div>

             <div class="col-md-12 mb-4">
                <Category /> <!-- component Category -->
            </div>
        </div>

         <!-- data product -->

       
            <div class="container">
                <h4  class="font-weight-bold">Product Terbaru</h4>
                <div class="row" >
                <!-- <hr style="border-top: 5px solid rgb(154 155 156);border-radius:.5rem"> -->
                    <div v-for="(product, index) in products" :key="index" class="col-md-3 col-sm-12 mb-3">
                        <div class="card h-100 border-0 shadow rounded-md" data-aos="zoom-in" :data-aos-delay="index * 200" data-aos-duration="500">
                            <div class="card-body">
                                <img :src="product.image"
                                    class="w-100"
                                    style="height: 15em;object-fit:cover;border-top-left-radius: .25rem;border-top-right-radius: .25rem;">
                                <router-link :to="{name: 'detail_product', params:{slug: product.slug }}" class="card-title font-weight-bold text-decoration-none text-dark" style="font-size:20px">
                                    {{ product.title }} 
                                </router-link>

                                <div class="discount mt-2" style="color: #999"><s>Rp. {{ moneyFormat(product.price) }}</s> <span
                                        style="background-color: darkorange" class="badge badge-pill badge-success text-white">DISKON
                                        {{ product.discount }} %</span>
                                </div>

                                <div class="price font-weight-bold mt-3" style="color: #47b04b;font-size:20px">
                                    Rp. {{ moneyFormat(calculateDiscount(product)) }}</div>
                                <router-link :to="{name: 'detail_product', params:{slug: product.slug}}" class="btn btn-primary btn-md mt-3 btn-block shadow-md">LIHAT PRODUK</router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
       


    </div>

    
</template>

<script>
import Category from '@/components/Category' // <-- component Category
import Slider from '@/components/Slider' // <-- component Slider
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
export default {

    components: {
        Category,       // <-- register component Category
        Slider          // <-- register component slider
    },

    setup() {
        
        // store Vuex
        const store = useStore()

        // onMounted akan menjalankan action "getProduct" di module "product"
        onMounted(() => {
            store.dispatch('product/getProducts')
        })

        // computed properti digunakan untuk get data product dari state di module product
        const products = computed(() => {
            return store.state.product.products
        })
        return {
            store,
            products
        }
    }

}
</script>

<style scope>
    
</style>