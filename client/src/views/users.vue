<script setup lang="ts">
import { onMounted, reactive, ref, watch } from 'vue';
import {adduser, api,  deleteuser,  getusers,  type User } from '@/model/session';
import type { DataListEnvelope } from '@/model/myFetch';


const sampleusers = reactive<DataListEnvelope<User>>({ data: [], total: 0, isSuccess: false });
  const showModal = ref(false); // define showModal property
const newUser = reactive<User>({
firstname: '',
lastname: '',
email: '',
handle: '',
photo: '',
isAdmin: false,
id: (sampleusers.total+1)
});

onMounted(async () => {
  
    try {
      const response = await getusers();
      sampleusers.data = response.data;
      sampleusers.total = response.total;
      sampleusers.isSuccess = true;
    } catch (error) {
      console.error(error);
      sampleusers.total = 0;
      sampleusers.isSuccess = false;
    }
});


watch(sampleusers, () => {
  if(sampleusers.isSuccess){
  newUser.id = sampleusers.total + 1;
}});


const AddUser = () => {
  adduser(newUser);
  // Reset the form and close the modal
  newUser.id = 0;
  newUser.handle = '';
  newUser.firstname = '';
  newUser.lastname = '';
  newUser.email = '';
  newUser.photo = '';
  newUser.isAdmin = false;
  showModal.value = false;
};
</script>

<template>
     <button class="button is-primary" @click="showModal = true">Add user</button>

    <div class="table-container">
      <table class="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Handle</th>
            <th>Photo</th>
            <th>Is Admin</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in sampleusers.data" :key="user.id">
            <td>{{ user.id }}</td>
            <td>{{ user.firstname }}</td>
            <td>{{ user.lastname }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.handle }}</td>
            <td>
              <img :src="user.photo" alt="User photo" v-if="user.photo" class="user-photo" />
            </td>
            <td>{{ user.isAdmin }}</td>
            <td>
                
              <button class="button is-danger"  @click="deleteuser(user.id)">Delete</button></td>
          </tr>
        </tbody>
      </table>
    </div>

  <!-- Modal component -->
  <div class="modal" :class="{ 'is-active': showModal }">
      <div class="modal-background" @click="showModal = false"></div>
      <div class="modal-content">
        <div class="box">
          <h3 class="title is-3">Add user</h3>
          <form @submit.prevent="AddUser()">
            <div class="field">
              <label class="label">First name</label>
              <div class="control">
                <input class="input" type="text" v-model="newUser.firstname" required />
              </div>
            </div>
            <div class="field">
              <label class="label">Last name</label>
              <div class="control">
                <input class="input" type="text" v-model="newUser.lastname" required />
              </div>
            </div>
            <div class="field">
              <label class="label">Email</label>
              <div class="control">
                <input class="input" type="email" v-model="newUser.email" required />
              </div>
            </div>
            <div class="field">
              <label class="label">Handle</label>
              <div class="control">
                <input class="input" type="text" v-model="newUser.handle" required />
              </div>
            </div>
            <div class="field">
              <label class="label">Photo URL</label>
              <div class="control">
                <input class="input" type="url" v-model="newUser.photo" required/>
              </div>
            </div>
            <div class="field">
              <label class="checkbox">
                <input type="checkbox" v-model="newUser.isAdmin" />
                Is admin
              </label>
            </div>
            <div class="field">
              <div class="control">
                <button type="submit" class="button is-primary">Add</button>
                </div></div></form></div></div></div>


  </template>
  
  <style>
  .table-container {
    display: flex;
    justify-content: center;
  }
  
  .table {
    border-collapse: collapse;
    width: 100%;
  }

  .button{
    margin: 5px;}
  
  .table th,
  .table td {
    padding: 0.5rem;
    text-align: left;
    border: 1px solid #ddd;
  }
  
  .table th {
    background-color: #f2f2f2;
  }
  
  .user-photo {
    max-width: 100px;
    max-height: 100px;
  }
  </style>
  