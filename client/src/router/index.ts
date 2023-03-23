import { createRouter, createWebHistory, type NavigationGuardNext, type RouteLocationNormalized } from 'vue-router'
import HomeView from '@/views/Homeview.vue'
import AdminVue from '@/views/users.vue'
import LoginVue from '@/views/login.vue'
import MyActivity from '@/views/myactivity.vue'
import FriendsActivity from '@/views/friendsactivity.vue'
import PeopleSearch from '@/views/peoplesearch.vue'
import { useSession } from '@/model/session'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/',name: 'home',component: HomeView },

    { path: '/login', name: 'login', component: LoginVue },
    { path: '/users', name: 'admin', component: AdminVue, beforeEnter: adminRoute },
    { path: '/myactivity', name: 'myactivity', component: MyActivity, beforeEnter: secureRoute },
    { path: '/friendsactivity', name: 'friendsactivity', component: FriendsActivity, beforeEnter: secureRoute },
    { path: '/peoplesearch', name: 'peoplesearch', component: PeopleSearch, beforeEnter: secureRoute }
   /* {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }*/
  ]
})

export default router

function secureRoute (to : RouteLocationNormalized, from : RouteLocationNormalized, next : NavigationGuardNext ) {
  const session = useSession();
  if (session.user) {
      next()
  } else { 
      next('/login')
  }
}

function adminRoute (to : RouteLocationNormalized, from : RouteLocationNormalized, next : NavigationGuardNext ) {
  const session = useSession();
  if (session.user?.isAdmin===true) {
      next()
  } else { 
      next('/login')
  }
}