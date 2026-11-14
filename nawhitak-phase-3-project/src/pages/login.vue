<script>
  export default {
    data () {
      return {
        users: [],
        username: '',
        password: '',
        credentialsIncorrect: false,
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
          if (this.username === this.users[i].username && this.password === this.users[i].password) {
            localStorage.setItem('current-user', this.username)
            this.$router.push('/')
            return
          }
        }
        this.credentialsIncorrect = true
      },
      createAccount () {
        this.$router.push('/create-account')
      },
      resetPassword () {
        this.$router.push('/reset-password')
      },
      homePage () {
        this.$router.push('/')
      },
    },
  }
</script>

<template>
  <v-app class="login-app">
    <v-main>
      <div class="login-header-container">
        <img alt="logo" class="asu_logo" src="@/assets/ASU_LOGO.png" @click="homePage">
      </div>
      <h1 class="login-header">Sign In</h1>
      <v-form class="login-form">
        <div class="login-user-input">
          <span>Username</span>
          <v-text-field v-model="username" class="id-text-field" variant="outlined" />
          <span class="login-sub-text" @click="createAccount">Create Account</span>
        </div>

        <div class="login-user-input">
          <span>Password</span>
          <v-text-field v-model="password" class="password-text-field" variant="outlined" />
          <span class="login-sub-text" @click="resetPassword">Forgot ID / password?</span>
        </div>

        <v-btn
          class="login-sign-in-btn"
          color="#8C1D40"
          variant="flat"
          @click="verifyCredentials"
        >Sign In
        </v-btn>
        <div v-if="credentialsIncorrect" class="warning-message">Credentials Incorrect</div>
      </v-form>
    </v-main>
  </v-app>
</template>

<style scoped>

@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

.warning-message {
  border: 1px solid #cccccc;
  background-color: #fafafa;
  padding: 20px;
  font-size: 14px;
  font-weight: lighter;
  font-family: 'Inter', Arial, sans-serif;
}

.login-app {
  background-color: white;
}

.login-user-input {
  display: flex;
  flex-direction: column;
  padding: 20px;
}

.login-sign-in-btn {
  margin-left: 20px;
  margin-bottom: 20px;
  transform: translateY(-20px);
  text-transform: none !important;
}

.login-sub-text {
  transform: translateY(-20px);
  cursor: pointer;
  color: #8C1D40;
  font-size: 14px;
  font-weight: lighter;
  align-self: flex-end;
  font-family: 'Inter', Arial, sans-serif;
}

.login-header {
  text-align: center;
  background-color: white;
  color: black;
  font-family: 'Inter', Arial, sans-serif;
  font-weight: lighter;
}

.login-form {
  background-color: white;
  color: black;
  font-weight: bold;
  font-family: 'Inter', Arial, sans-serif;

}

.login-header-container {
  background-color: #FFC627;
}

.asu_logo {
  width: 10%;
  height: 10%;
}
</style>
