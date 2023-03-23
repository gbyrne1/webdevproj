<script setup lang="ts">
import { ref } from 'vue';
import { useSession, login, getUsers } from '@/model/session';
const session = useSession();
const sampleusers=ref(getUsers());

</script>

<template>
            <div class="navbar-item" v-if="session.user">
                <div class="user-info">
                         <img :src="session.user.photo" alt="User Photo" class="user-photo">
                            <span class="user-name">{{ session.user.firstname }} {{ session.user.lastname }}</span>
                         </div>
                (<a @click=" session.user = null">logout</a>)
            </div>


            <div class="navbar-item" v-else>
                <div class="navbar-item has-dropdown is-hoverable">              
                    <span class="icon">
                        <i class="fas fa-user"></i>
                    </span>
                    <strong>Login</strong>
                    <i class="fas fa-angle-down"></i>
                
                <div class="navbar-dropdown">
                    <a class="navbar-item" v-for="user in sampleusers" :key="user.id" @click="login(user)">
                        <div class="user-info">
                         <img :src="user.photo" alt="User Photo" class="user-photo">
                            <span class="user-name">{{ user.firstname }} {{ user.lastname }}</span>
                         </div>
                    </a>

                </div></div>


                <a class="button is-info">
                    <span class="icon">
                        <i class="fas fa-user-plus"></i>
                    </span>
                    <strong>Sign up</strong>
                </a>
            </div>



</template>

<style scoped>
.button is-info{
    padding-left: 10px;
}
.user-photo {
    max-width: 40px;
    max-height: 40px;
    padding-right: 5px;
  }
</style>