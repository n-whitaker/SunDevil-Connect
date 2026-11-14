<script>
import {useAppStore} from '@/stores/app.js'

export default {
  data() {
    return {
      username: '',
      clubOwner: false,
      clubs: [],
      affiliatedClubs: [],
      currentClub: null,
      currentEvent: null,
      store: null,
      clubID: null,
      eventName: '',
      clubName: '',
      member: false,
      description: '',
      clubIndex: null,
      eventIndex: null,
      eventID: null,
      attendees: [],
      tags: [],
      flaggedEvents: [],
      date: '',
      location: '',
      paid: '',
    }
  },
  mounted() {
    this.clubOwner = false
    this.member = false
    this.store = useAppStore()
    this.eventID = Number(this.store.getEventID)

    if (localStorage.getItem('current-user')) {
      this.username = localStorage.getItem('current-user')
    }
    if (localStorage.getItem('clubs') !== null) {
      const clubData = JSON.parse(localStorage.getItem('clubs'))
      this.clubs = clubData.clubs || []
    }
    if (localStorage.getItem('flagged-events') !== null) {
      const flaggedEventsData = JSON.parse(localStorage.getItem('flagged-events'))
      this.flaggedEvents = flaggedEventsData.flaggedEvents || []
    }

    for (let i = 0; i < this.clubs.length; i++) {
      for (let k = 0; k < this.clubs[i].events.length; k++) {
        const event = this.clubs[i].events[k]
        if (event.eventID === this.eventID) {
          this.currentClub = this.clubs[i]
          this.clubIndex = i
          this.eventIndex = k
          this.clubID = this.clubs[i].clubID
          this.currentEvent = event
        }
      }
    }
    this.member = this.currentEvent.attendees.includes(this.username)
    this.description = this.currentEvent.description
    this.eventName = this.currentEvent.name
    this.attendees = this.currentEvent.attendees
    this.location = this.currentEvent.location
    this.date = this.currentEvent.date
    this.paid = this.currentEvent.paid
    this.clubName = this.currentClub.name
    this.tags = this.currentEvent.tags
  },
  methods: {
    flagEvent() {
      this.flaggedEvents.push(this.currentEvent)
      localStorage.setItem('flagged-events', JSON.stringify({flaggedEvents: this.flaggedEvents}))
      this.$router.push('/view-events')
    },
    createEvent() {
      this.$router.push('/create-event')
    },
    manageMembers() {
      this.$router.push('/club-viewer-manage-members')
    },
    memberApplication() {
      this.$router.push('/club-viewer-member-applications')
    },
    homeViewer() {
      this.$router.push('/event-viewer')
    },
    showAttending() {
      this.$router.push('/event-viewer-attending')
    },
    homePage() {
      this.$router.push('/')
    },
    logout() {
      this.username = ''
      localStorage.setItem('current-user', '')
    },
    login() {
      this.$router.push('/login')
    },
    createAccount() {
      this.$router.push('/create-account')
    },
    joinClub() {
      if (!this.attendees.includes(this.username)) {
        this.clubs[this.clubIndex].events[this.eventIndex].attendees.push(this.username)

        const newClubData = {
          clubs: [],
        }
        newClubData.clubs = this.clubs
        localStorage.setItem('clubs', JSON.stringify(newClubData))
        this.$router.push('/view-events')
      }
    },
    leaveClub() {
      for (let i = 0; i < this.clubs[this.clubIndex].events[this.eventIndex].attendees.length; i++) {
        if (this.clubs[this.clubIndex].events[this.eventIndex].attendees[i] === this.username) {
          this.clubs[this.clubIndex].events[this.eventIndex].attendees.splice(i, 1)
          break
        }
      }
      const newClubData = {
        clubs: [],
      }
      newClubData.clubs = this.clubs
      localStorage.setItem('clubs', JSON.stringify(newClubData))
      this.$router.push('/view-events')
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
              v-if="!member && username"
              class="club-btn"
              rounded="xl"
              size="small"
              to="/view-clubs"
              variant="outlined"
              @click="joinClub"
            >
              Join Event
            </v-btn>
            <v-btn
              v-if="member"
              class="club-btn"
              rounded="xl"
              size="small"
              variant="outlined"
              @click="leaveClub"
            >
              Leave Event
            </v-btn>
            <v-btn
              class="club-btn"
              rounded="xl"
              size="small"
              variant="outlined"
              @click="flagEvent"
            >
              Flag Event
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
      <v-container class="club-home-grid-container">
        <v-row>
          <v-col class="event-home-body">
            <div class="club-home-grid-header">
              <span class="club-home-club-home-grid-club-home-header-text"> {{ eventName }} </span>
            </div>
            <v-container class="club-home-grid-body">
              <div class="club-viewer-side-nav-bar">
                <div class="club-viewer-side-nav-bar-btn" @click="homeViewer">Home</div>
                <div class="club-viewer-side-nav-bar-btn" @click="showAttending">Attendees</div>
              </div>
              <v-container>
                <v-row>
                  <v-col>
                    <div class="index-grid-header">
                      <span class="index-index-grid-index-header-text"> Host </span>
                    </div>
                    <div class="index-grid-body">
                      <span class="index-index-grid-body-card"> {{ clubName }} </span>
                    </div>
                  </v-col>
                  <v-col>
                    <div class="index-grid-header">
                      <span class="index-index-grid-index-header-text"> Event Description </span>
                    </div>
                    <div class="index-grid-body">
                      <span class="index-index-grid-body-card"> {{ description }} </span>
                    </div>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <div class="index-grid-header">
                      <span class="index-index-grid-index-header-text"> Extra Information </span>
                    </div>
                    <div class="index-grid-body">
                      <span class="index-index-grid-body-card">Location: {{ location }} <br> </span>
                      <span class="index-index-grid-body-card">Date: {{ date }} <br> </span>
                      <span class="index-index-grid-body-card">Paid: {{ paid }} <br> </span>
                      <span class="index-index-grid-body-card">Event ID: {{ eventID }} </span>
                    </div>
                  </v-col>
                </v-row>
              </v-container>
            </v-container>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>

</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

.index-grid-header {
  border: 1px solid #cccccc;
  color: black;
  background-color: #fafafa;
  font-family: 'Inter', Arial, sans-serif;
  font-weight: bold;
}

.index-index-grid-index-header-text {
  padding: 10px;
  font-size: 13px;
}

.index-index-grid-body-card {
  padding: 10px;
  font-size: 13px;
}

.index-grid-body {
  border: 1px solid #cccccc;
  border-top: none;
  color: black;
  background-color: #ffffff;
  font-family: 'Inter', Arial, sans-serif;
  font-weight: lighter;
}

.club-home-grid-body {
  display: flex;
  flex-direction: row;
}

.club-viewer-side-nav-bar-btn {
  padding-right: 10px;
  font-size: 14px;
  text-wrap: nowrap;
  font-family: 'Inter', Arial, sans-serif;
  cursor: pointer;
  color: #8C1D40;
}

.club-viewer-side-nav-bar {
  border-right: 1px solid #cccccc;
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
  height: 250px;
  border: 1px solid #cccccc;
  border-top: none;
  color: black;
  background-color: #ffffff;
  font-family: 'Inter', Arial, sans-serif;
  font-weight: lighter;
}

</style>
