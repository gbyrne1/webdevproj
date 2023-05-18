
import type {  DataEnvelope, DataListEnvelope } from "./myFetch";
import { useSession } from "./session";
import { api } from "./session";
const session = useSession();


export interface Workout {
    id: number;
    _id: string;
    handle: string;
    distance: number;
    duration: number;
    picture: string;
    date: string;
    comment: string;
}

export function getWorkouts():Promise<DataListEnvelope<Workout>>{
  return api('workouts');
}

export function seed(): Promise<number>  {
    return api('workouts/seed/');
}

export function addworkout(workout: Workout): Promise<void> {
  return api("workouts/", workout, "POST")
    .then(response => {
      const { data, isSuccess } = response;
      if (isSuccess) {
        session.messages.push({
          msg: "User added successfully!",
          type: "success",
        });
      } else {
        session.messages.push({
          msg: "Failed to add user.",
          type: "error",
        });
      }
    })
    .catch(error => {
      console.error("Error in addworkout function: ", error);
      session.messages.push({
        msg: error.message ?? JSON.stringify(error),
        type: "error",
      });
      throw error;
    });
}

export function deleteworkout(_id: string): Promise<void> {
 
  return api(`workouts/${_id}`, {}, "DELETE")
    .then(response => {
      const { data, isSuccess } = response;
      if (isSuccess) {
        session.messages.push({
          msg: "Workout deleted successfully!",
          type: "success",
        });
      } else {
        session.messages.push({
          msg: "Failed to delete workout.",
          type: "error",
        });
      }
    })
    .catch(error => {
      console.error("Error in deleteworkout function: ", error);
      session.messages.push({
        msg: error.message ?? JSON.stringify(error),
        type: "error",
      });
      throw error;
    });
}

export function getWorkoutsbyHandleorEmail(query: string): Promise<DataListEnvelope<Workout>> {
  return api(`workouts/search/${query}`)
  .then(response => {
    const { data, total } = response;
    return { data, total, isSuccess: true };
  });
}


export function getWorkoutsbyID(id:string): Promise<DataEnvelope<Workout>>{
  return api('workouts/${id}');
}


export function totaldist(workoutsData: Workout[]): number {
  if (workoutsData.length === 0) {
    return 0;
  }
  const totalDistance = workoutsData.reduce((total, workout) => total + workout.distance, 0);
  return totalDistance;
}

export function totalduration(workoutsData: Workout[]): number {
  if (workoutsData.length === 0) {
    return 0;
  }
  const totaldur = workoutsData.reduce((total, workout) => total + workout.duration, 0);
  
  return totaldur;
}

export function avgpace(workoutsData: Workout[]): number {
  if (workoutsData.length === 0) {
    return 0;
  }
  const dist = workoutsData.reduce((total, workout) => total + workout.distance, 0);
  const totaldur = workoutsData.reduce((total, workout) => total + workout.duration, 0);
  let round=(dist/5280)/(totaldur/60);
  round = Math.round(round * 100) / 100;
  return round;
}

export function totalcalories(workoutsData: Workout[]): number {
  if (workoutsData.length === 0) {
    return 0;
  }
  let totalcal = (workoutsData.reduce((total, workout) => total + workout.distance, 0));
  totalcal = totalcal * 0.621371;
  let round = Math.round(totalcal * 100) / 100;
  return round;
}

