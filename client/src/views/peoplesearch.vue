<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue';
import { getWorkoutsbyHandleorEmail, type Workout} from '@/model/workouts';
import workoutbox from '@/components/workoutbox.vue';
import type { DataListEnvelope } from '@/model/myFetch';

const query = ref(''); // the search query
const isLoading = ref(false); // loading status
const workouts = reactive<DataListEnvelope<Workout>>({ data: [], total: 0, isSuccess: false }); 

async function search() {
  if (query.value === '') {
    // clear the workouts if the query is empty
    workouts.data = [];
    workouts.total = 0;
    workouts.isSuccess = false;
  } else {
    try {
      isLoading.value = true; // set the loading status
      workouts.isSuccess = false; // reset the success status
      const response = await getWorkoutsbyHandleorEmail(query.value); // fetch the data
      workouts.data = response.data;
      workouts.data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      workouts.total = response.total;
      workouts.isSuccess = true; // update the success status
    } catch (error) {
      console.error(error); // handle errors
    } finally {
      isLoading.value = false; // unset the loading status
    }
  }
}


onMounted(search);
</script>

<template>
    
        
    <div class="is-align-items-center">
            <h1 class="title"> People Search</h1>
          
            <input type="text" v-model="query" @input="search()" placeholder="Search by handle...">
    <div v-if="isLoading">Loading...</div>
    <div v-else-if="workouts.isSuccess">{{ workouts.total }} results found
    <br><br>
    <div v-for="workout in workouts.data" :key="workout._id">
      <workoutbox :Workout="workout" />
    </div>
    </div>
   </div>

        
</template>


<style scoped>

</style>