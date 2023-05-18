import { createRouter, createWebHistory, type NavigationGuardNext, type RouteLocationNormalized } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
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
    { path: '/users', name: 'admin', component: AdminVue, beforeEnter: secureRoute },
    { path: '/myactivity', name: 'myactivity', component: MyActivity, beforeEnter: secureRoute },
    { path: '/friendsactivity', name: 'friendsactivity', component: FriendsActivity, beforeEnter: secureRoute },
    { path: '/peoplesearch', name: 'peoplesearch', component: PeopleSearch, beforeEnter: secureRoute }
   
  ]
})

export default router

function secureRoute (to : RouteLocationNormalized, from : RouteLocationNormalized, next : NavigationGuardNext ) {
  const session = useSession();
  if (session.user) {
      next()
  } else { 
    if(!session.redirectUrl && to.path != '/login') {
      session.redirectUrl = to.fullPath;
  }
  next('/login')
  }
}

