<script setup>
import { ref, reactive, computed } from 'vue';
import api from '@/api';
import cookieHelper from '@/cookieHelper';

const isLoading = ref(false);
const errorMsg = ref('');
const formData = reactive({
  email: '',
  password: '',
});

const isDisabled = computed(() => isLoading.value || !formData.email || !formData.password);
const loginHandler = async () => {
  try {
    isLoading.value = true;
    errorMsg.value = '';
    const res = await api.login({
      username: formData.email,
      password: formData.password,
    });
    console.log('res', res);
    const { token, expired } = res.data;
    cookieHelper.setCookie('token', token, { expired });

    alert('登入成功 !');
    window.location.reload();
    formData.email = '';
    formData.password = '';
  } catch (e) {
    console.log(e);
    errorMsg.value = e?.response?.data.message;
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="container">
    <div class="row justify-content-center">
      <h1 class="h3 mb-3 font-weight-normal">請先登入</h1>
      <div class="col-8">
        <form id="form" class="form-signin" @submit.prevent="loginHandler">
          <div class="form-floating mb-3">
            <input
              type="email"
              class="form-control"
              id="username"
              placeholder="name@example.com"
              required
              autofocus
              v-model="formData.email"
            />
            <label for="username">Email address</label>
          </div>
          <div class="form-floating">
            <input
              type="password"
              class="form-control"
              id="password"
              placeholder="Password"
              required
              v-model="formData.password"
            />
            <label for="password">Password</label>
          </div>
          <button class="btn btn-lg btn-primary w-100 mt-3" type="submit" :disabled="isDisabled">登入</button>
        </form>
      </div>
    </div>
    <p class="mt-5 mb-3 text-muted">&copy; 2021~∞ - 六角學院</p>
  </div>
</template>

<style scoped>
.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}
</style>
