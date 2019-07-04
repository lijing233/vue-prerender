<!-- adpage -->
<template>
  <div @click="jump">
    广告页面
  </div>
</template>

<script>
export default {
  // 配置title和meta数据
  metaInfo: {
    title: 'lijing-test-adpage',
    meta: [
      {
        name: 'keywords',
        content: '关键字1,关键字2,关键字3'
      },
      {
        name: 'description',
        content: '这是一个广告营销页'
      }
    ]
  },
  name: '',
  data () {
    return {
    }
  },

  components: {},

  computed: {},

  mounted () {},

  methods: {
    jump () {
      this.$router.push({
        name: 'home'
      })
    }
  }
}

</script>
<style lang='scss' scoped>
</style>
