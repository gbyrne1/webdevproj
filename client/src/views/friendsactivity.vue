<script setup lang="ts">
import { useSession } from '@/model/session';
import workoutbox from '@/components/workoutbox.vue';
import type { DataListEnvelope } from '@/model/myFetch';
import { getWorkouts, getWorkoutsbyHandleorEmail,type Workout } from '@/model/workouts';
const session = useSession();
import { ref, onMounted, reactive } from 'vue';

const workouts = reactive<DataListEnvelope<Workout>>({ data: [], total: 0, isSuccess: false });
onMounted(async () => {
  if (session.user) {
    try {
      const response = await getWorkouts();
      workouts.data = response.data.filter(workout => workout.id !== session.user!.id);
      workouts.data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      workouts.total = response.total;
      workouts.isSuccess = true;
    } catch (error) {
      console.error(error);
      workouts.total = 0;
      workouts.isSuccess = false;
    }
  }
});
</script>

<template>
  <div class="is-align-items-center">
    <h1 class="title has-text-centered">Friend's Workouts</h1>
    <div v-if="workouts.isSuccess">
      {{ workouts.total }} results found
      <br /><br />
      <div v-for="workout in workouts.data" :key="workout._id">
        <workoutbox :Workout="workout" />
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
