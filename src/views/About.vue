<template>
<div>
{{this.user}}
</div>
</template>

<script>
// @ is an alias to /src
import Login from '@/components/Login.vue' 

export default {
  name: 'home',
  data() {
    return {
      user: 'big ass titties'
    }
  },
  components: {
    Login
  },
  async created() {
    const data = await this.axios.get('http://localhost:3000/user')
    console.log(data)
    this.user = data;
  }, 
     
}
</script>
