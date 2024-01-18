<script setup lang="tsx">
import { useRoute } from 'vue-router'

const route = useRoute()

</script>

<template>
  <template v-if="route.fullPath === '/'">
    <div><router-link to="/table">table</router-link></div>
    <div><router-link to="/form">form</router-link></div>
  </template>
  <router-view></router-view>
</template>

<style scoped>

</style>
