<template>
  <div>
    <a-button type="primary" @click="handleBack">
      <a-icon type="left" />
    </a-button>
    <div>
      Hello
    </div>
  </div>
</template>

<script>
export default {
  name: "PageEdit",
  components: {},
  methods: {
    handleBack() {
      this.$router.push('/')
    }
  }
};
</script>

<style scoped>
div {
  font: 2em sans-serif;
  color: brown;
}
</style>
