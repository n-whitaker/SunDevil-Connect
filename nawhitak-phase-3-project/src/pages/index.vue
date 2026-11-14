<template>
  <v-container class="body-container">
    <v-row>
      <v-col>
        <v-container v-if="username" class="index-btns" fluid>
          <v-row>
            <v-col>
              <v-btn
                v-if="clubOwner === 'Yes'"
                class="
                    index-btn"
                rounded="xl"
                size="small"
                to="view-clubs"
                variant="outlined"
              >
                Club Dashboard
              </v-btn>
              <v-btn
                v-if="admin === 'Yes'"
                class="index-btn"
                rounded="xl"
                size="small"
                to="admin-panel"
                variant="outlined"
              >
                Admin Panel
              </v-btn>
              <v-btn
                class="index-btn"
                rounded="xl"
                size="small"
                to="/account-information"
                variant="outlined"
              >
                Account Information
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-container class="index-grid-container">
          <v-row>
            <v-col>
              <div class="index-grid-header">
                <span class="index-index-grid-index-header-text"> My Clubs </span>
              </div>
              <div class="index-grid-body">
                <span
                  v-for="(club, index) in affiliatedClubs.slice(0,5)"
                  v-if="username"
                  :key="index"
                  class="index-index-grid-body-card"
                  @click="viewClub(club.clubID)"
                > {{ club.name }} <br></span>
                <span v-if="!username" class="index-index-grid-body-card">Sign In To View</span>
              </div>
            </v-col>

            <v-col>
              <div class="index-grid-header">
                <span class="index-index-grid-index-header-text"> My Events </span>
              </div>
              <div class="index-grid-body">
                <span
                  v-for="(event, index) in affiliatedEvents.slice(0,5)"
                  v-if="username"
                  :key="index"
                  class="index-index-grid-body-card"
                  @click="viewEvent(event.eventID)"
                > {{ event.name }} <br></span>
                <span v-if="!username" class="index-index-grid-body-card">Sign In To View</span>
              </div>
            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <div class="index-grid-header">
                <span class="index-index-grid-index-header-text"> New Clubs </span>
              </div>
              <div class="index-grid-body">
                <div
                  v-for="(club, i) in clubs.slice(0,5)"
                  :key="i"
                  class="index-index-grid-body-card"
                  @click="viewClub(club.clubID)"
                > {{
                  club.name
                }}
                </div>
              </div>
            </v-col>

          </v-row>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import { useAppStore } from '@/stores/app.js'

  export default {
    data () {
      return {
        username: '',
        admin: '',
        clubOwner: '',
        users: [],
        clubs: [],
        affiliatedClubs: [],
        affiliatedEvents: [],
        membershipStatus: [],
      }
    },
    mounted () {
      if (localStorage.getItem('current-user')) {
        this.username = localStorage.getItem('current-user')
      }
      if (localStorage.getItem('users')) {
        this.users = JSON.parse(localStorage.getItem('users')).users
      } else {
        const newUserData = {
          users: [],
        }
        const user = {
          username: 'admin',
          password: 'admin',
          name: '',
          email: '',
          studentID: '',
          major: '',
          clubOwner: 'Yes',
          admin: 'Yes',
        }
        this.users.push(user)
        newUserData.users = this.users
        localStorage.setItem('users', JSON.stringify(newUserData))
      }

      for (let i = 0; i < this.users.length; i++) {
        if (this.username === this.users[i].username) {
          this.clubOwner = this.users[i].clubOwner
          this.admin = this.users[i].admin
        }
      }

      if (localStorage.getItem('clubs') !== null) {
        const clubData = JSON.parse(localStorage.getItem('clubs'))
        this.clubs = clubData.clubs || []
      }
      for (let i = 0; i < this.clubs.length; i++) {
        for (let k = 0; k < this.clubs[i].members.length; k++) {
          if (this.username === this.clubs[i].members[k].username) {
            this.affiliatedClubs.push(this.clubs[i])
          }
        }
      }
      for (let i = 0; i < this.clubs.length; i++) {
        for (let k = 0; k < this.clubs[i].events.length; k++) {
          const event = this.clubs[i].events[k]
          if (event.attendees.includes(this.username)) {
            this.affiliatedEvents.push(event)
          }
        }
      }
    },
    methods: {
      viewClub (clubID) {
        useAppStore().setClubID(clubID)
        this.$router.push(`/club-viewer`)
      },
      viewEvent (eventID) {
        useAppStore().setEventID(eventID)
        this.$router.push(`/event-viewer`)
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

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

.body-container {
  transform: translateY(-20px);
}

.index-btn {

  margin-left: 10px !important;
  text-transform: none !important;
  color: black !important;
  font-weight: normal !important;
  background-color: #f6f6f6 !important;
  border-color: #d2d2d2 !important;
}

.index-index-grid-index-header-text {
  padding: 10px;
  font-size: 13px;
}

.index-index-grid-body-card {
  padding: 10px;
  font-size: 13px;
  cursor: pointer;
}

.index-grid-container {
  transform: translateY(-20px);
  background-color: white;

}

.index-grid-header {
  border: 1px solid #cccccc;
  color: black;
  background-color: #fafafa;
  font-family: 'Inter', Arial, sans-serif;
  font-weight: bold;
}

.index-grid-body {
  border: 1px solid #cccccc;
  border-top: none;
  color: black;
  background-color: #ffffff;
  font-family: 'Inter', Arial, sans-serif;
  font-weight: lighter;
}

</style>
