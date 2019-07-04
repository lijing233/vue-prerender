<template>
  <div class="about">
    <h1 @click="jump">
      This is an about page
    </h1>
  </div>
</template>
<script>

export default {
  name: 'About',
  methods: {
    jump () {
      this.$router.push({
        name: 'ad'
      })
    }
  }
}
</script>
