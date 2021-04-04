<template>
  <div
  class="fixed-top d-flex align-items-center justify-content-center"
  style="bottom: 0; overflow-y: auto">
  <Login msg="Welcome to Your Vue.js App"/>
</div>
</template>

<script>
// @ is an alias to /src
import Login from '@/components/Login.vue'

export default {
  name: 'home',
  components: {
    Login
  }
}
</script>
