<script>
  export default {
    data () {
      return {
        username: '',
        admin: '',
        clubOwner: '',
        users: [],
      }
    },
    mounted () {
      if (localStorage.getItem('current-user')) {
        this.username = localStorage.getItem('current-user')
      }
      if (localStorage.getItem('users')) {
        this.users = JSON.parse(localStorage.getItem('users')).users
      }
      for (let i = 0; i < this.users.length; i++) {
        if (this.username === this.users[i].username) {
          this.clubOwner = this.users[i].clubOwner
          this.admin = this.users[i].admin
        }
      }
    },
    methods: {
      homePage () {
        this.$router.push('/')
      },
      logout () {
        this.username = ''
        localStorage.setItem('current-user', '')
        window.location.reload()
      },
      login () {
        this.$router.push('/login')
      },
      createAccount () {
        this.$router.push('/create-account')
      },
    },
  }
</script>

<template>
  <div class="top-navbar">

    <span
      v-if="!username"
      class="authentication-controls-login"
      @click="login"
    >Login
    </span>
    <span
      v-if="!username"
      class="authentication-controls-create-account"
      @click="createAccount"
    >Create Account
    </span>

    <span
      v-if="username"
      class="authentication-controls-label"
      @click=""
    >Hello, {{ username }}
    </span>

    <span
      v-if="username"
      class="authentication-controls-log-out"
      @click="logout"
    >Log Out
    </span>
  </div>
  <div class="account-information-header-container">
    <img alt="logo" class="asu_logo" src="@/assets/arizona-state-university-logo-vertical.png" @click="homePage">
    <h1 class="account-information-header-text">My ASU Connect</h1>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

.authentication-controls-create-account, .authentication-controls-log-out {
  padding-right: 20px;
}

.top-navbar {
  background-color: #e8e8e8;
  display: flex;
  justify-content: flex-end;

}

.authentication-controls-create-account, .authentication-controls-label, .authentication-controls-log-out, .authentication-controls-login {
  padding-left: 20px;
  cursor: pointer;
  color: black;
  font-size: 12px;
  font-weight: lighter;
  font-family: 'Inter', Arial, sans-serif;
}

.account-information-header-text {
  align-self: center;

  color: black;
  font-family: 'Inter', Arial, sans-serif;
  font-weight: lighter;
}

.account-information-header-container {
  display: flex;
  flex-direction: row;
  background-color: white;
  border-bottom: 1px solid #cccccc;
}

.asu_logo {
  padding: 20px;
  height: 100%;
  width: 15%;
}
</style>
