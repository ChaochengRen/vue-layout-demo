<template>
  <div id="app">
    <demo></demo>
  </div>
</template>

<script>
import Demo from './components/demo.vue'

export default {
  name: 'app',
  components: {
    Demo
  }
}
</script>

<style>
html, body, #app {
  height: 100%;
}
</style>
