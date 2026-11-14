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
        membersQueue: [],
        clubQueue: [],
        users: [],
        updated: 0,
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
      if (localStorage.getItem('clubQueue') !== null) {
        const clubQueueData = JSON.parse(localStorage.getItem('clubQueue'))
        this.clubQueue = clubQueueData.clubs || []
      }
      if (localStorage.getItem('users') !== null) {
        const userData = JSON.parse(localStorage.getItem('users'))
        this.users = userData.users || []
      }
    },
    methods: {
      flaggedEvents () {
        this.$router.push('/admin-panel-manage-flagged-events')
      },
      manageUsers () {
        this.$router.push('/admin-panel-manage-users')
      },
      manageClubs () {
        this.$router.push('/admin-panel-manage-clubs')
      },
      createEvent () {
        this.$router.push('/create-event')
      },
      clubEvents () {
        this.$router.push('/club-viewer-events')
      },
      manageEvents () {
        this.$router.push('/club-viewer-manage-events')
      },
      acceptClub (club) {
        for (let i = 0; i < this.users.length; i++) {
          if (this.users[i].username === club.members[0].username) {
            club.members[0].status = 'Owner'
            this.users[i].clubOwner = 'Yes'
          }
        }
        this.clubs.unshift(club)
        localStorage.setItem('clubs', JSON.stringify({ clubs: this.clubs }))
        localStorage.setItem('users', JSON.stringify({ users: this.users }))
        this.rejectClub(club)
        this.updated++
      },
      rejectClub (club) {
        for (let i = 0; i < this.clubQueue.length; i++) {
          if (this.clubQueue[i].clubID === club.clubID) {
            this.clubQueue.splice(i, 1)
            localStorage.setItem('clubQueue', JSON.stringify({ clubs: this.clubQueue }))
            this.updated++
          }
        }
      },
      manageMembers () {
        this.$router.push('/club-viewer-manage-members')
      },
      memberApplication () {
        this.$router.push('/club-viewer-member-applications')
      },
      homeViewer () {
        this.$router.push('/admin-panel')
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
        <v-row />
      </v-container>
      <v-container class="club-home-grid-container">
        <v-row>
          <v-col class="event-home-body">
            <div class="club-home-grid-header">
              <span class="club-home-club-home-grid-club-home-header-text"> Admin Panel </span>
            </div>
            <v-container :key="updated" class="club-home-grid-body">
              <div class="club-viewer-side-nav-bar">
                <div class="club-viewer-side-nav-bar-btn" @click="homeViewer">Home</div>
                <div class="club-viewer-side-nav-bar-btn" @click="manageUsers">Manage Users</div>
                <div class="club-viewer-side-nav-bar-btn" @click="manageClubs">Manage Clubs</div>
                <div class="club-viewer-side-nav-bar-btn" @click="flaggedEvents">Manage Flagged Events</div>
                <div class="club-viewer-side-nav-bar-btn">Approve Clubs</div>
              </div>
              <v-container>
                <v-row
                  v-for="(club, index) in clubQueue"
                  :key="index"
                  class="club-entry"
                >
                  <div class="member-inner-container">
                    <div class="icon-container">
                      <v-icon icon="mdi-check" @click="acceptClub(club)" />
                      <v-icon icon="mdi-close" @click="rejectClub(club)" />
                    </div>
                    <v-col class="member-text">
                      <span class="club-entry-text">{{ club.name }}</span> <br>
                      <span class="club-entry-text">{{ club.description }}</span> <br>
                    </v-col>
                  </div>
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

.icon-container {
  display: flex;
  flex-direction: column;
}

.member-inner-container {
  display: flex;
  flex-direction: row;
}

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
