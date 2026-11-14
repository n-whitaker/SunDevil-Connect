<script>
  export default {
    data () {
      return {
        users: [],
        username: '',
        password: '',
      }
    },
    methods: {
      homePage () {
        this.$router.push('/')
      },
      getCredentials () {
        if (localStorage.getItem('users') !== null) {
          const userData = JSON.parse(localStorage.getItem('users'))
          this.users = userData.users || []
        }
      },
      addUser () {
        this.getCredentials()
        const newUserData = {
          users: [],
        }
        const user = {
          username: this.username,
          password: this.password,
          name: '',
          email: '',
          studentID: '',
          major: '',
          clubOwner: 'No',
          admin: 'No',

        }
        this.users.push(user)
        newUserData.users = this.users
        localStorage.setItem('users', JSON.stringify(newUserData))
        this.$router.push('/')
      },
    },
  }
</script>

<template>
  <v-app class="create-account-app">
    <v-main>
      <div class="create-account-header-container">
        <img alt="logo" class="asu_logo" src="@/assets/ASU_LOGO.png" @click="homePage">
      </div>
      <h1 class="create-account-header">Create Account</h1>
      <v-form class="create-account-login-form">
        <div class="create-account-user-input">
          <span>Username</span>
          <v-text-field v-model="username" class="id-text-field" variant="outlined" />

        </div>

        <div class="create-account-user-input">
          <span>Password</span>
          <v-text-field v-model="password" class="password-text-field" variant="outlined" />
        </div>

        <v-btn
          class="create-account-sign-in-btn"
          color="#8C1D40"
          text-color="white"
          variant="flat"
          @click="addUser"
        >Submit
        </v-btn>
      </v-form>
    </v-main>
  </v-app>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

.create-account-app {
  background-color: white;
}

.create-account-user-input {
  display: flex;
  flex-direction: column;
  padding: 20px 20px 0px;
}

.create-account-sign-in-btn {
  margin-left: 20px;
  margin-top: 20px;
  text-transform: none !important;
}

.create-account-header {
  text-align: center;
  background-color: white;
  color: black;
  font-family: 'Inter', Arial, sans-serif;
  font-weight: lighter;
}

.create-account-login-form {
  background-color: white;
  color: black;
  font-weight: bold;
  font-family: 'Inter', Arial, sans-serif;

}

.create-account-header-container {
  background-color: #FFC627;
}

.asu_logo {
  width: 10%;
  height: 10%;
}
</style>
