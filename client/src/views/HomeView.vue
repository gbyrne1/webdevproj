<script setup lang="ts">
import { ref } from 'vue';
import { useSession } from '@/model/session';
import { avgpace, getWorkouts,totaldist, totalcalories,totalduration} from '@/model/workouts';
const session = useSession();
const distance=ref(totaldist());
const pace=ref(avgpace());
const calories=ref(totalcalories());
const duration=ref(totalduration());
//filters workouts by users id
const workouts = ref(getWorkouts().filter(w => w.id === session.user?.id));


</script>

<template>
    <div class="is-align-items-center">
      
     

     <div class="box">
      <h1>ALL TIME</h1>
  <li class="quadrant1">Distance: {{distance}} Feet</li>
  <li class="quadrant2">Pace:{{pace}} MPH</li>
  <li class="quadrant3">Calories burned:{{calories}}</li>
  <li class="quadrant4">Time: {{duration}} Minutes</li>
</div>

 

    </div>
  </template>

  <style scoped>
.box {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 500px;
  height: 200px;
  background-color: #f1f1f1;
  border: 1px solid #ccc;
  padding: 20px;
  position: relative;
  margin-top: 10px
}

.box h1 {
  position: absolute; 
  top: 0; 
  left: 50%; 
  transform: translateX(-50%); 
  margin-bottom: 10px; 
}
.box li {
  width: 50%;
  height: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  text-align: center;
  border: 1px solid #ccc;
  padding: 10px;
}

.box .quadrant1 {
  background-color: #66c2a5;
  color: #fff;
}

.box .quadrant2 {
  background-color: #fc8d62;
  color: #fff;
}

.box .quadrant3 {
  background-color: #be4242;
  color: #fff;
}

.box .quadrant4 {
  background-color: #2863a2;
  color: #fff;
}
</style>