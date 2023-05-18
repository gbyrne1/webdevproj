<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import { useSession } from '@/model/session';
import type { Workout } from '@/model/workouts';
import type { DataListEnvelope } from '@/model/myFetch';
import { avgpace,totaldist, totalcalories,totalduration} from '@/model/workouts';
const session = useSession();

  const props = defineProps({
    title: {
      type: String,
      required: true
    },
    Workout: {
    type: Array as () => Workout[],
    required: true
  }

});
 /* onMounted(async () => {
  if (session.user) {
    try {
      const response = await getWorkoutsbyHandleorEmail(session.user.handle);
      workouts.data = response.data;
      workouts.total = response.total;
      workouts.isSuccess = true;
      dist.value = totaldist(workouts.data);
  pace.value = avgpace(workouts.data);
  calories.value = totalcalories(workouts.data);
  duration.value = totalduration(workouts.data);
      console.log(workouts.total);
    } catch (error) {
      console.error(error);
      workouts.total = 0;
      workouts.isSuccess = false;
    }
  }
});*/



</script>

<template>
    <div class="is-align-items-center">
      
     

     <div class="box">
      <h1>{{props.title}}</h1>
  <li class="quadrant1">Distance: {{totaldist(props.Workout)}} Feet</li>
  <li class="quadrant2">Pace:{{avgpace(props.Workout)}} MPH</li>
  <li class="quadrant3">Calories burned:{{totalcalories(props.Workout)}}</li>
  <li class="quadrant4">Time: {{totalduration(props.Workout)}} Minutes</li>
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
  position: absolute; /* make it absolute to position it */
  top: 0; /* position it at the top */
  left: 50%; /* position it in the horizontal center */
  transform: translateX(-50%); /* translate it to the left by half of its width to center it */
  margin-bottom: 10px; /* add some margin to create space between the title and the box border */
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