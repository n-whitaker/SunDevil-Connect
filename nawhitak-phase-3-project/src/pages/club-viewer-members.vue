<script>
  import { useAppStore } from '@/stores/app.js'

  export default {
    data () {
      return {
        username: '',
        clubOwner: false,
        clubs: [],
        affiliatedClubs: [],
        currentClub: null,
        store: null,
        clubID: null,
        clubName: '',
        member: false,
        description: '',
        clubIndex: null,
        members: [],
      }
    },
    mounted () {
      this.clubOwner = false
      this.member = false
      this.store = useAppStore()
      this.clubID = Number(this.store.getClubID)
      if (localStorage.getItem('current-user')) {
        this.username = localStorage.getItem('current-user')
      }
      if (localStorage.getItem('clubs') !== null) {
        const clubData = JSON.parse(localStorage.getItem('clubs'))
        this.clubs = clubData.clubs || []
      }

      for (let i = 0; i < this.clubs.length; i++) {
        if (this.clubs[i].clubID === this.clubID) {
          this.currentClub = this.clubs[i]
          this.clubIndex = i
        }
      }
      this.description = this.currentClub.description
      this.clubName = this.currentClub.name
      this.member = this.currentClub.members.some(member => member.username === this.username)
      this.clubOwner = this.currentClub.members.some(member => (member.username === this.username && member.status === 'Owner'))
      this.members = this.currentClub.members
    },
    methods: {
      createEvent () {
        this.$router.push('/create-event')
      },
      clubEvents () {
        this.$router.push('/club-viewer-events')
      },
      manageEvents () {
        this.$router.push('/club-viewer-manage-events')
      },
      manageMembers () {
        this.$router.push('/club-viewer-manage-members')
      },
      memberApplication () {
        this.$router.push('/club-viewer-member-applications')
      },
      homeViewer () {
        this.$router.push('/club-viewer')
      },
      showMembers () {
        this.$router.push('/club-viewer-members')
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
      joinClub () {
        this.clubs[this.clubIndex].membersQueue.push(this.username)

        const newClubData = {
          clubs: [],
        }
        newClubData.clubs = this.clubs
        localStorage.setItem('clubs', JSON.stringify(newClubData))
        this.$router.push('/view-clubs')
      },
      leaveClub () {
        for (let i = 0; i < this.clubs[this.clubIndex].members.length; i++) {
          if (this.clubs[this.clubIndex].members[i].username === this.username) {
            this.clubs[this.clubIndex].members.splice(i, 1)
            break
          }
        }
        const newClubData = {
          clubs: [],
        }
        newClubData.clubs = this.clubs
        localStorage.setItem('clubs', JSON.stringify(newClubData))
        this.$router.push('/view-clubs')
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
              Apply To Join Club
            </v-btn>
            <v-btn
              v-if="member"
              class="club-btn"
              rounded="xl"
              size="small"
              variant="outlined"
              @click="leaveClub"
            >
              Leave Club
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
      <v-container class="club-home-grid-container">
        <v-row>
          <v-col class="event-home-body">
            <div class="club-home-grid-header">
              <span class="club-home-club-home-grid-club-home-header-text"> {{ clubName }} </span>
            </div>
            <v-container class="club-home-grid-body">
              <div class="club-viewer-side-nav-bar">
                <div class="club-viewer-side-nav-bar-btn" @click="homeViewer">Home</div>
                <div class="club-viewer-side-nav-bar-btn" @click="clubEvents">Events</div>
                <div class="club-viewer-side-nav-bar-btn" @click="showMembers">Members</div>
                <div v-if="clubOwner" class="club-viewer-side-nav-bar-btn" @click="manageMembers">Manage Members</div>
                <div v-if="clubOwner" class="club-viewer-side-nav-bar-btn" @click="memberApplication">Member
                  Applications
                </div>
                <div v-if="clubOwner" class="club-viewer-side-nav-bar-btn" @click="createEvent">Create Event</div>
                <div v-if="clubOwner" class="club-viewer-side-nav-bar-btn" @click="manageEvents">Manage Events</div>
              </div>
              <v-container>
                <v-row
                  v-for="(club_member, index) in members"
                  :key="index"
                  class="club-entry"
                >
                  <v-col class="member-text">
                    <span class="club-entry-text">{{ club_member.username }}</span> <br>
                    <span class="club-entry-text">{{ club_member.status }}</span> <br>
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

.member-text {
  line-height: 1.1;
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

.club-entry {
  border: 1px solid #cccccc;
  border-radius: 10px;
}

.club-entry-text {
  font-weight: bold;
  font-family: 'Inter', Arial, sans-serif;
  font-size: 15px;
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
  height: 350px;
  border: 1px solid #cccccc;
  border-top: none;
  color: black;
  background-color: #ffffff;
  font-family: 'Inter', Arial, sans-serif;
  font-weight: lighter;
}

</style>
