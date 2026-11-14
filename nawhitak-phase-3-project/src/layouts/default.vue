<template>
  <AppHeader v-if="!hideHeader" />
  <v-main class="main-content">
    <router-view />
  </v-main>

  <AppFooter />
</template>

<script>
  export default {
    name: 'DefaultLayout',
    data () {
      return {
        hideHeader: false,
      }
    },
    watch: {
      '$route' (to, from) {
        this.updateHeaderVisibility()
      },
    },
    mounted () {
      this.updateHeaderVisibility()
    },
    methods: {
      updateHeaderVisibility () {
        this.hideHeader = this.$route.meta.hideHeader || false
      },
    },
  }
</script>

<style>
.v-main {
  background-color: white;
}

.main-content {
  min-height: calc(80vh - 50px) !important;
  padding-bottom: 35% !important;
}
</style>
