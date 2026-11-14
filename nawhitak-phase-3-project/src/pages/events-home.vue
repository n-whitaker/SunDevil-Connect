<script>
  export default {
    data () {
      return {
        username: '',
        clubOwner: '',
        users: [],
      }
    },
    mounted () {
      if (localStorage.getItem('users') !== null) {
        const userData = JSON.parse(localStorage.getItem('users'))
        this.users = userData.users || []
      }
      if (localStorage.getItem('current-user')) {
        this.username = localStorage.getItem('current-user')
      }

      for (let i = 0; i < this.users.length; i++) {
        if (this.users[i].username === this.username && this.users[i].clubOwner === 'Yes') {
          this.clubOwner = this.users[i].clubOwner
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
  <v-app class="events-home-app">
    <v-main>
      <v-container class="event-btns" fluid>
        <v-row>
          <v-col>
            <v-btn
              class="event-btn"
              rounded="xl"
              size="small"
              to="view-events"
              variant="outlined"
            >
              View Events
            </v-btn>
            <v-btn
              v-if="clubOwner"
              class="event-btn"
              rounded="xl"
              size="small"
              to="/create-event"
              variant="outlined"
            >
              Create Event
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
      <v-container class="events-home-grid-container">
        <v-row>
          <v-col class="event-home-body">
            <div class="events-home-grid-header">
              <span class="events-home-events-home-grid-events-home-header-text"> Events </span>
            </div>
            <div class="events-home-grid-body">
              <span
                class="events-home-events-home-grid-body-card"
              > Manage everything relating to events starting here! </span>
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

.event-btn {
  margin-left: 10px !important;
  text-transform: none !important;
  color: black !important;
  font-weight: normal !important;
  background-color: #f6f6f6 !important;
  border-color: #d2d2d2 !important;
}

.events-home-app {
  background-color: white;
}

.events-home-events-home-grid-events-home-header-text {
  padding: 10px;
  font-size: 25px;
}

.events-home-events-home-grid-body-card {
  padding: 10px;
  font-size: 13px;
}

.events-home-grid-container {
  margin: 0 !important;
  background-color: white;
}

.events-home-grid-header {
  height: 50px;
  color: black;
  background-color: #FFC627;
  font-family: 'Inter', Arial, sans-serif;
  font-weight: bold;
}

.events-home-grid-body {
  height: 250px;
  border: 1px solid #cccccc;
  border-top: none;
  color: black;
  background-color: #ffffff;
  font-family: 'Inter', Arial, sans-serif;
  font-weight: lighter;
}

</style>
