<script setup lang="ts">
import { useSession } from '@/model/session';
import workoutbox from '@/components/workoutbox.vue';
import type { DataListEnvelope } from '@/model/myFetch';
import { getWorkoutsbyHandleorEmail,addworkout,type Workout } from '@/model/workouts';
const session = useSession();
import { ref, onMounted, reactive } from 'vue';

const workouts = reactive<DataListEnvelope<Workout>>({ data: [], total: 0, isSuccess: false });
  const showModal = ref(false);
  const newWorkout = reactive<Workout>({
  id: 0,
  _id: '',
  handle: '',
  distance: 0,
  duration: 0,
  picture: '',
  date: '',
  comment: '',
});
  onMounted(async () => {
  if (session.user) {
    try {
      const response = await getWorkoutsbyHandleorEmail(session.user.handle);
      workouts.data = response.data;
      workouts.total = response.total;
      workouts.data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      workouts.isSuccess = true;
    } catch (error) {
      console.error(error);
      workouts.total = 0;
      workouts.isSuccess = false;
    }
  }
});

const openModal = () => {
  showModal.value = true;
  newWorkout.id = session.user?.id || 0;
  newWorkout.handle = session.user?.handle || '';
  newWorkout.distance = 0;
  newWorkout.duration = 0;
  newWorkout.picture = '';
  newWorkout.date = new Date().toISOString();
  newWorkout.comment = '';
};

const submitWorkout = () => {
  addworkout(newWorkout);
  console.log(newWorkout);
  // Reset the form and close the modal
  newWorkout.id = 0;
  newWorkout.handle = '';
  newWorkout.distance = 0;
  newWorkout.duration = 0;
  newWorkout.picture = '';
  newWorkout.date = '';
  newWorkout.comment = '';
  showModal.value = false;
};
</script>

<template>
  <div class="is-align-items-center">
    <h1 class="title has-text-centered">My Workouts</h1>
    <button class="button is-primary" @click="openModal">Add Workout</button>
    <div v-if="workouts.isSuccess">
      {{ workouts.total }} results found
      <br /><br />
      <div v-for="workout in workouts.data" :key="workout.id">
        <workoutbox :Workout="workout" />
      </div>
    </div>
        <!-- Modal for adding a new workout -->
        <div class="modal" :class="{ 'is-active': showModal }">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Add Workout</p>
          <button class="delete" aria-label="close" @click="showModal = false"></button>
        </header>
       

 <section class="modal-card-body">
          <div class="field">
            <label class="label">Distance</label>
            <div class="control">
              <input class="input" type="text" v-model="newWorkout.distance" />
            </div>
          </div>
          <div class="field">
            <label class="label">Duration</label>
            <div class="control">
              <input class="input" type="text" v-model="newWorkout.duration" />
            </div>
          </div>
          <div class="field">
            <label class="label">Picture Link</label>
            <div class="control">
              <input class="input" type="text" v-model="newWorkout.picture" />
            </div>
          </div>
          <div class="field">
            <label class="label">Comment</label>
            <div class="control">
              <input class="input" type="text" v-model="newWorkout.comment" />
            </div>
          </div>
        </section>
        <footer class="modal-card-foot">
          <button class="button is-primary" @click="submitWorkout">Submit</button>
          <button class="button" @click="showModal = false">Cancel</button>
        </footer>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
