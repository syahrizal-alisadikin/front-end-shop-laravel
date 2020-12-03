//import vue router
import { createRouter, createWebHistory } from 'vue-router'
import store from '../store'


//define a routes
const routes = [
    {
        path: '/register',
        name: 'register',
        component: () => import( /* webpackChunkName: "register" */ '@/view/auth/Register.vue')
    },
    {
        path: '/login',
        name: 'login',
        component: () => import( /* webpackChunkName: "login" */ '@/view/auth/Login.vue')
    },
    {
        path: '/customer/dashboard',
        name: 'dashboard',
        component: () => import( /* webpackChunkName: "login" */ '@/view/dashboard/Index.vue'),
        //chek is loggedIn
        meta: {
            requiresAuth: true
        }
    },
     {
        path: '/customer/order',
        name: 'order',
        component: () => import(/* webpackChunkName: "order" */ '../view/order/Index.vue'),
        meta: {
          //chek is loggedIn
          requiresAuth: true
        }
      },
    {
        path: '/customer/order/:snap_token',
        name: 'detail_order',
        component: () => import(/* webpackChunkName: "detail_order" */ '../view/order/Show.vue'),
        meta: {
          //chek is loggedIn
          requiresAuth: true
        }
    },
]

//create router
const router = createRouter({
    history: createWebHistory(),
    routes // <-- routes
})

// Define route for Handle Authentication
router.beforeEach((to, from,next) => {
    if(to.matched.some(record => record.meta.requiresAuth)){
        // Cek Nilai dari getters isLoggedIn di module auth
        if(store.getters['auth/isLoggedIn']){
            next()
            return
        }
        next('login')
    } else {
        next()
    }
})

export default router