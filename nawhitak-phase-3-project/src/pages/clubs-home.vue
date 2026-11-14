<script>
  export default {
    data () {
      return {
        username: '',
        clubOwner: '',
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
  <v-app class="club-home-app">
    <v-main>
      <v-container class="club-btns" fluid>
        <v-row>
          <v-col>
            <v-btn
              class="club-btn"
              rounded="xl"
              size="small"
              to="/view-clubs"
              variant="outlined"
            >
              View Clubs
            </v-btn>
            <v-btn
              v-if="clubOwner === 'Yes' || username"
              class="club-btn"
              rounded="xl"
              size="small"
              to="/manage-clubs"
              variant="outlined"
            >
              Manage Clubs
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
      <v-container class="club-home-grid-container">
        <v-row>
          <v-col class="event-home-body">
            <div class="club-home-grid-header">
              <span class="club-home-club-home-grid-club-home-header-text"> Clubs </span>
            </div>
            <div class="club-home-grid-body">
              <span
                class="club-home-club-home-grid-body-card"
              > Handle club related functions here! </span>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>

</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

.event-home-body {
  transform: translateY(-20px);
}

.club-btn {
  margin-left: 10px !important;
  text-transform: none !important;
  font-weight: normal !important;
  background-color: #f6f6f6 !important;
  border-color: #d2d2d2 !important;
  color: black !important;

}

.club-home-app {
  background-color: white;
}

.club-home-club-home-grid-club-home-header-text {
  padding: 10px;
  font-size: 25px;
}

.club-home-club-home-grid-body-card {
  padding: 10px;
  font-size: 13px;
}

.club-home-grid-container {
  margin: 0 !important;
  background-color: white;
}

.club-home-grid-header {
  height: 50px;
  color: black;
  background-color: #FFC627;
  font-family: 'Inter', Arial, sans-serif;
  font-weight: bold;
}

.club-home-grid-body {
  height: 250px;
  border: 1px solid #cccccc;
  border-top: none;
  color: black;
  background-color: #ffffff;
  font-family: 'Inter', Arial, sans-serif;
  font-weight: lighter;
}

</style>
