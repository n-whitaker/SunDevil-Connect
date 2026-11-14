<template>
  <v-footer
    app
    height="50"
  >
    <v-btn class="footer-btn" to="/events-home" variant="text">
      <v-icon icon="mdi-calendar" />
      <div>Events</div>
    </v-btn>
    <v-btn class="footer-btn" to="/" variant="text">
      <v-icon icon="mdi-home" />
      <div>Home</div>
    </v-btn>

    <v-btn class="footer-btn" to="/clubs-home" variant="text">
      <v-icon icon="mdi-account-group" />
      <div>Clubs</div>
    </v-btn>
  </v-footer>
</template>

<script>

</script>

<style>
.v-btn__content {
  display: flex;
  flex-direction: column;
}

.footer-btn {
  background-color: #e8e8e8 !important;
  color: black !important;
  font-family: 'Inter', Arial, sans-serif;
  font-weight: lighter !important;

}

.v-footer {
  border-top: 1px solid #cccccc !important;
  background-color: #e8e8e8 !important;
  display: flex;
  justify-content: center;
}
</style>
