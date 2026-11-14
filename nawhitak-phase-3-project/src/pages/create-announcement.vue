<script>
  export default {
    data () {
      return {
        clubID: '',
        eventID: '',
        clubs: [],
        events: [],
        name: '',
        description: '',
        location: '',
        date: null,
        pfpUrl: '',
        currentUser: '',
        currentClub: null,
        clubIndex: null,
        users: [],
        affiliatedClubs: [],
        affiliatedClubNames: [],
        attendees: [],
        dateOpen: false,
        clubName: '',
        clubTags: [],
        paid: null,
        post: '',
      }
    },
    mounted () {
      if (localStorage.getItem('users') !== null) {
        const userData = JSON.parse(localStorage.getItem('users'))
        this.users = userData.users || []
      }
      if (localStorage.getItem('current-user')) {
        this.currentUser = localStorage.getItem('current-user')
      }
      if (localStorage.getItem('clubs') !== null) {
        const clubData = JSON.parse(localStorage.getItem('clubs'))
        this.clubs = clubData.clubs || []
      }

      for (let i = 0; i < this.clubs.length; i++) {
        for (let k = 0; k < this.clubs[i].members.length; k++) {
          if (this.currentUser === this.clubs[i].members[k].username) {
            this.affiliatedClubs.push(this.clubs[i])
          }
        }
      }
      for (let i = 0; i < this.affiliatedClubs.length; i++) {
        this.affiliatedClubNames.push(this.affiliatedClubs[i].name)
      }
    },
    methods: {
      clubSelected () {
        for (let i = 0; i < this.clubs.length; i++) {
          if (this.clubs[i].name === this.clubName) {
            this.currentClub = this.clubs[i]
            this.clubIndex = i
          }
        }
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
      createPost () {
        this.clubs[this.clubIndex].bulletinPosts.push(this.post)
        localStorage.setItem('clubs', JSON.stringify({ clubs: this.clubs }))
        this.$router.push('/club-viewer')
      },
    },
  }
</script>

<template>
  <v-app class="create-event-app">
    <v-main>
      <v-container class="club-btns" fluid />
      <v-container class="club-home-grid-container">
        <v-row>
          <v-col class="event-home-body">
            <div class="club-home-grid-header">
              <span class="club-home-club-home-grid-club-home-header-text"> Create Announcement </span>
            </div>
            <div class="club-home-grid-body">
              <v-container class="account-information-grid-body">
                <v-row align="center" dense>
                  <v-col cols="1">
                    <span>Club: </span>
                  </v-col>
                  <v-col cols="2">
                    <v-select
                      v-model="clubName"
                      density="compact"
                      :items="affiliatedClubNames"
                      label="Select Club"
                      min-width="100px"
                      variant="outlined"
                      @update:model-value="clubSelected"
                    />
                  </v-col>
                </v-row>
                <v-row align="center" dense>
                  <v-col>
                    <v-text-field
                      v-model="post"
                      class="account-information-text"
                      label="Enter Announcement"
                      max-width="350px"

                      variant="underlined"
                    />
                  </v-col>

                </v-row>

                <v-row>
                  <v-col>
                    <v-btn
                      class="edit-button"
                      color="#8C1D40"
                      variant="flat"
                      @click="createPost"
                    >Submit
                    </v-btn>
                  </v-col>
                </v-row>

              </v-container>
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

.create-event-app {
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
