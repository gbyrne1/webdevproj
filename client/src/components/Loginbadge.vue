<script setup lang="ts">
import { ref } from 'vue';
import { useSession, login } from '@/model/session';
const session = useSession();
const email = ref('');
const password = ref('');

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
                    <form class="navbar-item" id="login-form" @submit.prevent="login?.(email,password)()">
                        <div class="field">
        <label class="label">Email</label>
        <div class="control is-flex-direction-column">
              <input class="input" type="email" placeholder="Email" v-model="email">
            </div>
          </div>
          <div class="field">
            <label class="label">Password</label>
            <div class="control is-flex-direction-column">
          <input class="input" type="password" placeholder="Password" v-model="password">
        </div>
      </div>
                <div class="field is-grouped">
                <div class="control">
                    <button class="button is-link">Submit</button>
                </div>
                <div class="control">
                    <button class="button is-link is-light">Cancel</button>
                </div>
                </div>
            </form>
                     </div></div> 
                
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