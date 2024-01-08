<script setup>
import { ref } from 'vue';
import LoginView from './view/LoginView.vue';
import HomeView from './view/HomeView.vue';
import api from './api';
import cookieHelper from './cookieHelper';

const isLoading = ref(false);
const isAuth = ref(false);

const checkAuth = async () => {
  if (!cookieHelper.getCookie('token')) return;

  try {
    isLoading.value = true;
    const res = await api.checkToken();
    if ((res.status === 200) & res.data?.success) {
      isAuth.value = true;
    }
  } catch (e) {
    console.log(e);
  } finally {
    isLoading.value = false;
  }
};

checkAuth();
</script>

<template>
  <main>
    <template v-if="!isLoading">
      <template v-if="isAuth">
        <HomeView />
      </template>
      <template v-else>
        <LoginView />
      </template>
    </template>
    <template v-else>
      <div class="spinner-border mx-auto" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </template>
  </main>
</template>
