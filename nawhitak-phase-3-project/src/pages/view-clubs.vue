<script>
  import { useAppStore } from '@/stores/app.js'

  export default {
    data () {
      return {
        username: '',
        clubOwner: '',
        clubs: [],
        affiliatedClubs: [],
        store: null,
        clubName: '',
      }
    },
    mounted () {
      this.store = useAppStore()
      if (localStorage.getItem('current-user')) {
        this.username = localStorage.getItem('current-user')
      }
      if (localStorage.getItem('clubs') !== null) {
        const clubData = JSON.parse(localStorage.getItem('clubs'))
        this.clubs = clubData.clubs || []
      }
      for (let i = 0; i < this.clubs.length; i++) {
        for (let k = 0; k < this.clubs[i].members.length; k++) {
          this.affiliatedClubs.push(this.clubs[i])
        }
      }
    },
    methods: {
      viewClub (clubID) {
        this.store.setClubID(clubID)
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
          <v-col />
        </v-row>
      </v-container>
      <v-container class="club-home-grid-container">
        <v-row>
          <v-col class="event-home-body">
            <div class="club-home-grid-header">
              <span class="club-home-club-home-grid-club-home-header-text"> Clubs </span>
            </div>
            <v-container class="club-home-grid-body">
              <v-row
                v-for="(club, index) in clubs"
                :key="index"
                class="club-entry"
                @click="viewClub(club.clubID)"
              >
                <v-col cols="1" />
                <v-col>
                  <span class="club-entry-text">{{ club.name }}</span> <br>
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

.club-entry {
  border: 1px solid #cccccc;
  border-top: none;

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
  height: 300px;
  border: 1px solid #cccccc;
  border-top: none;
  color: black;
  background-color: #ffffff;
  font-family: 'Inter', Arial, sans-serif;
  font-weight: lighter;
}

</style>
