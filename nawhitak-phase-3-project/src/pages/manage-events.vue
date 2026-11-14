<script>
  import { useAppStore } from '@/stores/app.js'

  export default {
    data () {
      return {
        username: '',
        clubOwner: '',
        clubs: [],
        affiliatedClubs: [],
        membershipStatus: [],
        users: [],
        events: [],
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
      if (localStorage.getItem('clubs') !== null) {
        const clubData = JSON.parse(localStorage.getItem('clubs'))
        this.clubs = clubData.clubs || []
      }
      for (let i = 0; i < this.clubs.length; i++) {
        for (let k = 0; k < this.clubs[i].members.length; k++) {
          if (this.username === this.clubs[i].members[k].username) {
            this.membershipStatus.push(this.clubs[i].members[k])
            this.affiliatedClubs.push(this.clubs[i])
          }
        }
      }
    },
    methods: {
      viewClub (clubID) {
        useAppStore().setClubID(clubID)
        this.$router.push(`/club-viewer`)
      },
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
              v-if="username"
              class="club-btn"
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
      <v-container class="club-home-grid-container">
        <v-row>
          <v-col class="event-home-body">
            <div class="club-home-grid-header">
              <span class="club-home-club-home-grid-club-home-header-text"> Upcoming Events </span>
            </div>
            <v-container class="club-home-grid-body">
              <v-row
                v-for="(club, index) in events"
                :key="index"
                class="club-entry"
                @click="viewClub(club.clubID)"
              >
                <v-col cols="1" />
                <v-col>
                  <div class="text-container">
                    <span class="club-entry-text">{{ club.name }}</span> <br>
                    <span class="club-entry-sub-text">{{ membershipStatus[index].status }} <br> ID: {{
                      club.clubID
                    }} </span>
                  </div>

                </v-col>

              </v-row>
            </v-container>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>

</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

.text-container {
  line-height: 1.1;
}

.club-entry {
  border: 1px solid #cccccc;
  border-top: none;
}

.club-entry-text {
  font-weight: bold;
  font-family: 'Inter', Arial, sans-serif;
  font-size: 15px;
}

.club-entry-sub-text {
  font-size: 14px;
  font-family: 'Inter', Arial, sans-serif;
}

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
  height: 300px;
  border: 1px solid #cccccc;
  border-top: none;
  color: black;
  background-color: #ffffff;
  font-family: 'Inter', Arial, sans-serif;
  font-weight: lighter;
}

</style>
