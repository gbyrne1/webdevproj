<script setup lang="ts">
import { ref } from 'vue';
import { useSession, login } from '@/model/session';
import { getWorkouts} from '@/model/workouts';
const session = useSession();

//filters workouts by users id
const workouts = ref(getWorkouts().filter(w => w.id === session.user?.id));


</script>

<template>
    <div class="is-align-items-center">
      
     

      <div v-for="activity in workouts.sort((a, b) => a.date - b.date)" :key="activity.id">
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
  margin: 0px;
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