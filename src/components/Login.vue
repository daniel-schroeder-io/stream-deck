<template> 
    <b-card class="align-items-center justify-content-center" style="width: 400px;"> 
        <a class="btn btn-lg" href="http://localhost:3000/auth/twitch" role="button" style="background-color: #6441a5; border-color: #2F1F4E; width: 250px; color: white;">
        <img src="https://cdn0.iconfinder.com/data/icons/social-network-7/50/16-512.png" height="30" alt="">
        Login With Twitch
        </a> 
  </b-card>
</template>

<script>
export default {
  name: 'Login',
  props: {
    msg: String
  },
  methods: {
    
  },
}
</script>

<style scoped lang="scss">

</style>
