<script>
  export default {
    data () {
      return {
        users: [],
        username: '',
        password: '',
        name: '',
        email: '',
        studentID: '',
        major: '',
        clubOwner: '',
        admin: '',
      }
    },
    mounted () {
      if (localStorage.getItem('current-user')) {
        this.username = localStorage.getItem('current-user')
      }
      if (localStorage.getItem('users') !== null) {
        const userData = JSON.parse(localStorage.getItem('users'))
        this.users = userData.users || []
      }

      for (let i = 0; i < this.users.length; i++) {
        if (this.username === this.users[i].username) {
          this.username = this.users[i].username
          this.password = this.users[i].password
          this.name = this.users[i].name
          this.email = this.users[i].email
          this.studentID = this.users[i].studentID
          this.major = this.users[i].major
          this.clubOwner = this.users[i].clubOwner
          this.admin = this.users[i].admin
          return
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
      editInformation () {},
    },
  }
</script>

<template>
  <v-app class="club-home-app">
    <v-main>
      <v-container class="club-btns" fluid />
      <v-container class="club-home-grid-container">
        <v-row>
          <v-col class="event-home-body">
            <div class="club-home-grid-header">
              <span class="club-home-club-home-grid-club-home-header-text"> Account Information </span>
              <v-btn
                class="edit-button"
                color="#8C1D40"
                to="update-information"
                variant="flat"
                @click="editInformation"
              >Edit
              </v-btn>
            </div>
            <div class="club-home-grid-body">
              <v-container class="account-information-grid-body">
                <v-row align="center" dense>
                  <v-col cols="2">
                    <span>Username: </span>
                  </v-col>
                  <v-col>
                    <v-text-field class="account-information-text" max-width="350px" readonly variant="underlined">{{
                      username
                    }}
                    </v-text-field>
                  </v-col>

                </v-row>

                <v-row align="center" dense>
                  <v-col cols="2">
                    <span>Name: </span>
                  </v-col>
                  <v-col>
                    <v-text-field class="account-information-text" max-width="350px" readonly variant="underlined">{{
                      name
                    }}
                    </v-text-field>
                  </v-col>

                </v-row>

                <v-row align="center" dense>
                  <v-col cols="2">
                    <span>Email: </span>
                  </v-col>
                  <v-col>
                    <v-text-field class="account-information-text" max-width="350px" readonly variant="underlined">{{
                      email
                    }}
                    </v-text-field>
                  </v-col>
                </v-row>

                <v-row align="center" dense>
                  <v-col cols="2">
                    <span>Student ID: </span>
                  </v-col>
                  <v-col>
                    <v-text-field class="account-information-text" max-width="350px" readonly variant="underlined">{{
                      studentID
                    }}
                    </v-text-field>
                  </v-col>
                </v-row>

                <v-row align="center" dense>
                  <v-col cols="2">
                    <span>Major: </span>
                  </v-col>
                  <v-col>
                    <v-text-field class="account-information-text" max-width="350px" readonly variant="underlined">{{
                      major
                    }}
                    </v-text-field>
                  </v-col>
                </v-row>
                <v-row v-row align="center" dense>
                  <v-col cols="2">
                    <span>Club Owner: </span>
                  </v-col>
                  <v-col>
                    <v-text-field class="account-information-text" max-width="350px" readonly variant="underlined">{{
                      clubOwner
                    }}
                    </v-text-field>
                  </v-col>
                </v-row>

                <v-row align="center" dense>
                  <v-col cols="2">
                    <span>Admin: </span>
                  </v-col>
                  <v-col>
                    <v-text-field class="account-information-text" max-width="350px" readonly variant="underlined">{{
                      admin
                    }}
                    </v-text-field>
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
  height: 550px;
  border: 1px solid #cccccc;
  border-top: none;
  color: black;
  background-color: #ffffff;
  font-family: 'Inter', Arial, sans-serif;
  font-weight: lighter;
}
</style>
