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
    </div>

    <!-- <div class="container-fluid mb-5 mt-4">
    </div> -->
</template>

<script>
import Category from '@/components/Category' // <-- component Category
import Slider from '@/components/Slider' // <-- component Slider
export default {

    components: {
        Category,       // <-- register component Category
        Slider          // <-- register component slider
    }

}
</script>