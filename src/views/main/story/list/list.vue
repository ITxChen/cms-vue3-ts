<template>
  <div class="menu">
    <PageContent :content-config="contentConfig" ref="contentRef" />
  </div>
</template>

<script setup lang="ts" name="menu">
import PageContent from './c-cpns/Spage-content.vue'
import contentConfig from './config/content.config'
</script>

<style scoped>
.menu {
}
</style>
