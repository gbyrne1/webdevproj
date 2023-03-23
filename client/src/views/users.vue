<script setup lang="ts">
import { ref } from 'vue';
import {getUsers } from '@/model/session';

const sampleusers=ref(getUsers());

</script>

<template>
    <button class="button is-primary">Add user</button>
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
          <tr v-for="user in sampleusers" :key="user.id">
            <td>{{ user.id }}</td>
            <td>{{ user.firstname }}</td>
            <td>{{ user.lastname }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.handle }}</td>
            <td>
              <img :src="user.photo" alt="User photo" v-if="user.photo" class="user-photo" />
            </td>
            <td>{{ user.isAdmin ? 'Yes' : 'No' }}</td>
            <td>
                <button class="button is-warning">Edit</button>
              <button class="button is-danger">Delete</button></td>
          </tr>
        </tbody>
      </table>
    </div>
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
  