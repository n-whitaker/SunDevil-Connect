<script>
  export default {
    data () {
      return {
        currentUser: '',
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
        this.currentUser = localStorage.getItem('current-user')
      }
      if (localStorage.getItem('users') !== null) {
        const userData = JSON.parse(localStorage.getItem('users'))
        this.users = userData.users || []
      }

      for (let i = 0; i < this.users.length; i++) {
        if (this.currentUser === this.users[i].username) {
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
      editInformation () {
        const newUserData = {
          users: [],
        }
        const user = {
          username: this.username,
          password: this.password,
          name: this.name,
          email: this.email,
          studentID: this.studentID,
          major: this.major,
          clubOwner: this.clubOwner,
          admin: this.admin,

        }
        for (let i = 0; i < this.users.length; i++) {
          if (this.currentUser === this.users[i].username) {
            this.users[i] = user
          }
        }
        newUserData.users = this.users
        localStorage.setItem('users', JSON.stringify(newUserData))
        localStorage.setItem('current-user', this.username)
        this.$router.push('/account-information')
      },
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
              >Submit
              </v-btn>
            </div>
            <div class="club-home-grid-body">
              <v-container class="account-information-grid-body">
                <v-row align="center" dense>
                  <v-col cols="2">
                    <span>Username: </span>
                  </v-col>
                  <v-col>
                    <v-text-field
                      v-model="username"
                      class="account-information-text"
                      label="Enter Username"
                      max-width="350px"
                      variant="underlined"
                    />
                  </v-col>

                </v-row>

                <v-row align="center" dense>
                  <v-col cols="2">
                    <span>Name: </span>
                  </v-col>
                  <v-col>
                    <v-text-field
                      v-model="name"
                      class="account-information-text"
                      label="Enter Name"
                      max-width="350px"
                      variant="underlined"
                    />
                  </v-col>

                </v-row>

                <v-row align="center" dense>
                  <v-col cols="2">
                    <span>Email: </span>
                  </v-col>
                  <v-col>
                    <v-text-field
                      v-model="email"
                      class="account-information-text"
                      label="Enter Email"
                      max-width="350px"
                      variant="underlined"
                    />
                  </v-col>
                </v-row>

                <v-row align="center" dense>
                  <v-col cols="2">
                    <span>Student ID: </span>
                  </v-col>
                  <v-col>
                    <v-text-field
                      v-model="studentID"
                      class="account-information-text"
                      label="Enter Student ID"
                      max-width="350px"
                      variant="underlined"
                    />
                  </v-col>
                </v-row>

                <v-row align="center" dense>
                  <v-col cols="2">
                    <span>Major: </span>
                  </v-col>
                  <v-col>
                    <v-text-field
                      v-model="major"
                      class="account-information-text"
                      label="Enter Major"
                      max-width="350px"
                      variant="underlined"
                    />
                  </v-col>
                </v-row>
                <v-row v-row align="center" dense>
                  <v-col cols="2">
                    <span>Club Owner: </span>
                  </v-col>
                  <v-col>
                    <v-text-field
                      v-model="clubOwner"
                      class="account-information-text"
                      label="Club Status (Yes for Owner/No for Member)"
                      max-width="350px"
                      readonly
                      variant="underlined"
                    />
                  </v-col>
                </v-row>

                <v-row align="center" dense>
                  <v-col cols="2">
                    <span>Admin: </span>
                  </v-col>
                  <v-col>
                    <v-text-field
                      v-model="admin"
                      class="account-information-text"
                      label="Admin Status (Yes for Admin/No for Student)"
                      max-width="350px"
                      readonly
                      variant="underlined"
                    />
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
