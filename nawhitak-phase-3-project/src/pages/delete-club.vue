<script>
  export default {
    data () {
      return {
        clubID: '',
        clubs: [],
        name: '',
        description: '',
        pfpUrl: '',
        currentUser: '',
      }
    },
    mounted () {
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
      deleteClub () {
        for (let i = 0; i < this.clubs.length; i++) {
          if (this.clubs[i].clubID === Number(this.clubID)) {
            this.clubs.splice(i, 1)
          }
        }
        const newClubData = {
          clubs: [],
        }

        newClubData.clubs = this.clubs
        localStorage.setItem('clubs', JSON.stringify(newClubData))
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
              <span class="club-home-club-home-grid-club-home-header-text"> Delete Club </span>

            </div>
            <div class="club-home-grid-body">
              <v-container class="account-information-grid-body">
                <v-row align="center" dense>
                  <v-col cols="1">
                    <span>ID: </span>
                  </v-col>
                  <v-col cols="3">
                    <v-text-field
                      v-model="clubID"
                      class="account-information-text"
                      label="Enter ID of club to be deleted"
                      min-width="250px"
                      variant="underlined"
                    />
                  </v-col>

                  <v-col>
                    <v-btn
                      class="edit-button"
                      color="#8C1D40"
                      to="/manage-clubs"
                      variant="flat"
                      @click="deleteClub"
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
  height: 100px;
  border: 1px solid #cccccc;
  border-top: none;
  color: black;
  background-color: #ffffff;
  font-family: 'Inter', Arial, sans-serif;
  font-weight: lighter;
}

</style>
