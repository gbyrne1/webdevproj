<script setup lang="ts">
import { ref } from 'vue';
import { useSession, getUsers } from '@/model/session';
import { getWorkouts} from '@/model/workouts';
const session = useSession();


const sampleusers = ref(getUsers());
let input = ref("");

const workouts = ref(getWorkouts().filter(w => w.id === session.user?.id)); // update the workouts value
  
function selectuserworkouts(){
 
const inp=input.value.toLowerCase();
if(inp){
  const filteredUsers = getUsers().filter(u => u.handle===inp);//input.value?
  if(filteredUsers.length===0){
    return null;
  }else{
const sid=filteredUsers[0].id;  
  return getWorkouts().filter(w => w.id === sid);}}
  else{
    return null;
  }

}

</script>

<template>
    
        
    <div class="is-align-items-center">
            <h1 class="title">
           People Search
        </h1>

        <input type="text" v-model="input" placeholder="Search handles..." />
  <div class="item firstname" v-for="activity in selectuserworkouts()">
    <div class="workout-container">
            <button class="delete-btn" @click="">X</button>
            <p>@{{ activity.handle }}</p>
<p>Distance: {{ activity.distance }} feet</p>
  <p>Duration: {{ activity.duration }} min</p>

  <p><img class="workout-pic" :src="activity.picture" alt="Workout picture" /></p>
  <p>Hours Ago: {{ activity.date }}</p>
  <p v-if="activity.comment">Comment: {{ activity.comment }}</p>
        </div>
  </div>
  <div class="item error" v-if="input&&null">
     <p>No results found!</p>
  </div>
 
         


   </div>

        
</template>


<style scoped>
.workout-container{
  width: relative;
  height: relative;
  border: 1px solid #ccc;
  padding: 10px;
  margin: 10px;
  position: relative; 
}

.workout-pic {
  width: 200px;
  height: 200px;
  object-fit: contain;
  margin-bottom: 0px;
}
.delete-btn {
  position: absolute;
  top: 5px;
  right: 5px;
  width: 20px;
  height: 20px;
  border: none;
  background-color: #fff;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
}

/* Style the "x" button on hover */
.delete-btn:hover {
  color: #f00;
}
</style>