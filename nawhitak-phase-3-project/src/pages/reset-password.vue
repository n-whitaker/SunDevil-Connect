<script>
  export default {
    data () {
      return {
        users: [],
        username: '',
        oldPassword: '',
        newPassword: '',
      }
    },
    methods: {
      getCredentials () {
        if (localStorage.getItem('users') !== null) {
          const userData = JSON.parse(localStorage.getItem('users'))
          this.users = userData.users || []
        }
      },
      verifyCredentials () {
        this.getCredentials()
        for (let i = 0; i < this.users.length; i++) {
          if (this.username === this.users[i].username && this.oldPassword === this.users[i].password) {
            this.users[i].password = this.newPassword
            const newUserData = {
              users: [],
            }
            newUserData.users = this.users
            localStorage.setItem('users', JSON.stringify(newUserData))
            this.$router.push('/')
            return
          }
        }
      },
      homePage () {
        this.$router.push('/')
      },
    },
  }
</script>

<template>
  <v-app class="reset-password-app">
    <v-main>
      <div class="reset-password-header-container">
        <img alt="logo" class="asu_logo" src="@/assets/ASU_LOGO.png" @click="homePage">
      </div>
      <h1 class="reset-password-header">Sign In</h1>
      <v-form class="reset-password-login-form">
        <div class="reset-password-user-input">
          <span>Username</span>
          <v-text-field v-model="username" class="id-text-field" variant="outlined" />
        </div>

        <div class="reset-password-user-input">
          <span>Old Password</span>
          <v-text-field v-model="oldPassword" class="id-text-field" variant="outlined" />
        </div>

        <div class="reset-password-user-input">
          <span>New Password</span>
          <v-text-field v-model="newPassword" class="password-text-field" variant="outlined" />
        </div>

        <v-btn
          class="reset-password-sign-in-btn"
          color="#8C1D40"
          text-color="white"
          variant="flat"
          @click="verifyCredentials"
        >Sign In
        </v-btn>
      </v-form>
    </v-main>
  </v-app>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

.reset-password-app {
  background-color: white;
}

.reset-password-user-input {
  display: flex;
  flex-direction: column;
  padding: 20px;
}

.reset-password-sign-in-btn {
  margin-left: 20px;
  margin-bottom: 20px;
  transform: translateY(-20px);
  text-transform: none !important;
}

.reset-password-header {
  text-align: center;
  background-color: white;
  color: black;
  font-family: 'Inter', Arial, sans-serif;
  font-weight: lighter;
}

.reset-password-login-form {
  background-color: white;
  color: black;
  font-weight: bold;
  font-family: 'Inter', Arial, sans-serif;

}

.reset-password-header-container {
  background-color: #FFC627;
}

.asu_logo {
  width: 10%;
  height: 10%;
}
</style>
