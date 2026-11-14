<script>
  export default {
    data () {
      return {
        clubID: '',
        clubs: [],
        clubQueue: [],
        name: '',
        description: '',
        pfpUrl: '',
        currentUser: '',
        users: [],
      }
    },
    mounted () {
      if (localStorage.getItem('clubQueue') !== null) {
        const clubQueueData = JSON.parse(localStorage.getItem('clubQueue'))
        this.clubQueue = clubQueueData.clubs || []
      }
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
      addClub () {
        this.clubID = this.clubs.length + 1
        const club = {
          clubID: this.clubID,
          name: this.name,
          description: this.description,
          pfpUrl: this.pfpUrl,
          clubOwner: this.currentUser,
          members: [],
          events: [],
          membersQueue: [],
          bulletinPosts: [],
        }
        const member = {
          username: this.currentUser,
          status: 'Pending',
        }
        club.members.push(member)
        this.clubQueue.push(club)
        localStorage.setItem('clubQueue', JSON.stringify({ clubs: this.clubQueue }))
        this.$router.push('/manage-clubs')
      },
    },
  }
</script>

<template>
  <v-app class="create-club-app">
    <v-main>
      <v-container class="club-btns" fluid />
      <v-container class="club-home-grid-container">
        <v-row>
          <v-col class="event-home-body">
            <div class="club-home-grid-header">
              <span class="club-home-club-home-grid-club-home-header-text"> Create Club </span>

            </div>
            <div class="club-home-grid-body">
              <v-container class="account-information-grid-body">
                <v-row align="center" dense>
                  <v-col cols="2">
                    <span>Name: </span>
                  </v-col>
                  <v-col>
                    <v-text-field
                      v-model="name"
                      class="account-information-text"
                      label="Enter Club Name"
                      max-width="350px"
                      variant="underlined"
                    />
                  </v-col>

                </v-row>

                <v-row align="center" dense>
                  <v-col cols="2">
                    <span>Description: </span>
                  </v-col>
                  <v-col>
                    <v-text-field
                      v-model="description"
                      class="account-information-text"
                      label="Enter Club Description"
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
                      to="update-information"
                      variant="flat"
                      @click="addClub"
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
  height: 330px;
  border: 1px solid #cccccc;
  border-top: none;
  color: black;
  background-color: #ffffff;
  font-family: 'Inter', Arial, sans-serif;
  font-weight: lighter;
}

</style>
