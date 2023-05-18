<script setup lang="ts">
  import { defineComponent, ref } from 'vue';
 import type { Workout } from '@/model/workouts';
 import { deleteworkout } from '@/model/workouts';
  import { useSession } from '@/model/session';
  const session = useSession();
 const props = defineProps({
  Workout: {
    type: Object as () => Workout,
    required: true
  }
});
const showTooltip = ref(false);
const deleteWorkout = () => {
  if (session.user?.id === props.Workout.id) {
    deleteworkout(props.Workout._id);
  }
  else {
    alert("You can only delete your own workouts!");
  }
};

</script>
<template>
  <div class="workout-container">
    <button class="delete-btn" @click="deleteWorkout()" @mouseover="showTooltip = true" @mouseleave="showTooltip = false">X
      <span class="tooltip" v-if="showTooltip">Delete your workout!</span></button>
    <p>@{{ props.Workout.handle }}</p>
    <p>Distance: {{ props.Workout.distance }} feet</p>
    <p>Duration: {{ props.Workout.duration }} min</p>
    <p><img class="workout-pic" :src="props.Workout.picture" alt="Workout picture" /></p>
    <p>{{ new Date(props.Workout.date).toLocaleString()  }}</p>
    <p v-if="props.Workout.comment">Comment: {{ props.Workout.comment }}</p>
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
