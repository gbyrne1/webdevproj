import workoutdata from "../data/workouts.json";
import { reactive,computed } from "vue";
import { useSession } from "./session";
const session = useSession();
const activity = reactive({
    workout: null as Workout | null,
})

interface Workout {
    id: number;
    handle: string;
    distance: number;
    duration: number;
    picture: string;
    date: number;
    comment: string;
}

export function getWorkouts():Workout[]{
    return workoutdata.workouts;
}

export function useWorkout() {
    return activity;
}


//const workouts = ref(getWorkouts().filter(w => w.id === session.user?.id));
export function totaldist(): number {
  const workouts = getWorkouts().filter((w => w.id === session.user?.id));
  if (workouts.length === 0) {
    return 0;
  }
  const totalDistance = workouts.reduce((total, workout) => total + workout.distance, 0);
  return totalDistance;
}

export function totalduration(): number {
    const workouts = getWorkouts().filter((w => w.id === session.user?.id));
    if (workouts.length === 0) {
      return 0;
    }
    const totaldur = workouts.reduce((total, workout) => total + workout.duration, 0);
    
    return totaldur;
  }
  export function avgpace(): number {
    const workouts = getWorkouts().filter((w => w.id === session.user?.id));
    if (workouts.length === 0) {
      return 0;
    }
    const dist = workouts.reduce((total, workout) => total + workout.distance, 0);
    const totaldur = workouts.reduce((total, workout) => total + workout.duration, 0);
    let round=(dist/5280)/(totaldur/60);
    round = Math.round(round * 100) / 100;
    return round;
  }
  export function totalcalories(): number {
    const workouts = getWorkouts().filter((w => w.id === session.user?.id));
    if (workouts.length === 0) {
      return 0;
    }
    let totalcal = (workouts.reduce((total, workout) => total + workout.distance, 0));
    totalcal = totalcal * 0.621371;
    let round = Math.round(totalcal * 100) / 100;
    return round;
  }