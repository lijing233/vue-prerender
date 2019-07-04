<template>
  <div class="home">
    <img
      alt="Vue logo"
      src="../assets/logo.png"
      @click="showMsg"
    >
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  methods: {
    showMsg () {
      this.$message('sss')
      this.$router.push({
        name: 'about'
      })
    }
  }
}
</script>
