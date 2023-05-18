<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
import LoginBadge from './Loginbadge.vue';

   
</script>

<template>
    <nav class="navbar is-primary">
        <div class="container">
        
          <div class="navbar-start">

            <RouterLink to="/" class="navbar-item">
              <img alt="Home" class="logo" src="@/assets/logo.svg" width="22" height="22" />
            </RouterLink>


            <RouterLink to="/myactivity" class="navbar-item">
              <span class="icon">
                      <i class="fa fa-heartbeat"></i>
                    </span>
              My Activity</RouterLink>

              <RouterLink to="/friendsactivity" class="navbar-item">
              <span class="icon">
                      <i class="fa fa-users"></i>
                    </span>
              Friend's Activity</RouterLink>

              <RouterLink to="/peoplesearch" class="navbar-item">
              <span class="icon">
                      <i class="fa fa-search"></i>
                    </span>
              People Search</RouterLink>

              <div class="navbar-item">
              <div class="navbar-item has-dropdown is-hoverable">
                <span class="icon">
                        <i class="fas fa-user"></i>
                    </span>
                    Admin <i class="fas fa-angle-down"></i>
                   
                <div class="navbar-dropdown">
            <RouterLink to="/users" class="navbar-item">Users</RouterLink>
            </div>
          </div></div>

            
          </div>
      
          <div class="navbar-end">

            <LoginBadge />

           
          </div>
        
    </div>
      </nav>
</template>


<style scoped>
</style>