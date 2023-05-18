<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import { login, useSession } from '@/model/session';
import Statbox from '@/components/Statbox.vue';
import type { DataListEnvelope } from '@/model/myFetch';
import { getWorkoutsbyHandleorEmail, type Workout } from '@/model/workouts';
const workouts = reactive<DataListEnvelope<Workout>>({ data: [], total: 0, isSuccess: false });
  let workoutData2: Workout[] = [];
  let workoutData3: Workout[] = [];
  let workoutData4: Workout[] = [];
  const fromDate = new Date();
const session = useSession();
onMounted(async () => {
  if (session.user) {
    try {
      const response = await getWorkoutsbyHandleorEmail(session.user.handle);
      workouts.data = response.data;
      workouts.total = response.total;
      workouts.isSuccess = true;
     workoutData2 =  response.data.filter(workout => new Date(workout.date).getTime() > fromDate.getTime()- 32 * 24 * 60 * 60 * 1000);;
     workoutData3 =  response.data.filter(workout => new Date(workout.date).getTime() > fromDate.getTime()- 7 * 24 * 60 * 60 * 1000);;
     workoutData4 =  response.data.filter(workout => new Date(workout.date).getTime() > fromDate.getTime()- 1 * 24 * 60 * 60 * 1000);;
    } catch (error) {
      console.error(error);
      workouts.total = 0;
      workouts.isSuccess = false;
    }
  }
});


</script>

<template>
    <div class="is-flex is-flex-direction-column is-align-items-center">
     
  
      <template v-if="workouts.isSuccess">
      <Statbox title="All Time" :Workout="workouts.data" />
    </template>

    <template v-if="workouts.isSuccess">
      <Statbox title="Past Month" :Workout="workoutData2" />
    </template>

    <template v-if="workouts.isSuccess">
      <Statbox title="Past Week" :Workout="workoutData3" />
    </template>
    
    <template v-if="workouts.isSuccess">
      <Statbox title="Past Day" :Workout="workoutData4" />
    </template>
    </div>
  </template>

  <style scoped>

</style>