<script>
  import { useAppStore } from '@/stores/app.js'

  export default {
    data () {
      return {
        username: '',
        clubOwner: '',
        searchText: '',
        clubs: [],
        affiliatedClubs: [],
        searchResults: [],
        store: null,
        clubName: '',
        searchTags: [],
        filterBy: [],
        searchSubmitted: false,
        searchUpdated: 0,
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
      eventViewer (eventID) {
        this.store.setEventID(eventID)
        this.$router.push(`/event-viewer`)
      },
      search () {
        this.searchResults = []
        for (let i = 0; i < this.clubs.length; i++) {
          for (let k = 0; k < this.clubs[i].events.length; k++) {
            const event = this.clubs[i].events[k]
            const searchTest = !this.searchText || event.name === this.searchText
            const tagTest = this.searchTags.every(tag => event.tags.includes(tag))
            if (searchTest && tagTest) {
              this.searchResults.push(event)
            }
          }
        }
        if (this.filterBy === 'Popularity') {
          this.searchResults.sort((a, b) => b.attendees.length - a.attendees.length)
        }
        if (this.filterBy === 'Paid') {
          this.searchResults.sort((a, b) => {
            if (a.paid === 'Yes' && b.paid === 'No') {
              return -1
            }
            if (a.paid === 'No' && b.paid === 'Yes') {
              return -1
            }
            return 0
          })
        }
        if (this.filterBy === 'Date') {
          this.searchResults.sort((a, b) => new Date(b.date) - new Date(a.date))
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
              <span class="club-home-club-home-grid-club-home-header-text"> Events </span>
            </div>
            <v-container class="club-home-grid-body">
              <v-row>
                <v-col>
                  <v-text-field
                    v-model="searchText"
                    density="compact"
                    hint="all search filters are optional"
                    label="Search Here"
                    persistent-hint
                    variant="outlined"
                  />
                </v-col>
                <v-col>
                  <v-btn

                    class="edit-button"
                    color="#8C1D40"
                    style="transform: translateY(3px)"
                    variant="flat"
                    @click="search"
                  >Submit
                  </v-btn>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="4">
                  <v-select
                    v-model="searchTags"
                    chips
                    density="compact"
                    :items="['Music', 'Tech', 'Sport', 'Social', 'Career']"
                    label="Search Tags"
                    min-width="150px"
                    multiple
                    variant="outlined"
                  />
                </v-col>
                <v-col>
                  <v-select
                    v-model="filterBy"
                    density="compact"
                    :items="['Date', 'Paid/Free', 'Popularity']"
                    label="Sort By"
                    max-width="150px"
                    variant="outlined"
                  />
                </v-col>
              </v-row>
              <v-row
                v-for="(event, index) in searchResults"
                :key="index"
                class="club-entry"
                @click="eventViewer(event.eventID)"
              >
                <v-col cols="1" />
                <v-col>
                  <span class="club-entry-text">{{ event.name }}</span> <br>
                  <span class="club-entry-text">Date: {{ event.date }}</span> <br>
                  <span class="club-entry-text">Paid:{{ event.paid }}</span> <br>
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
  background-color: #fafafa;

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
  height: 500px;
  border: 1px solid #cccccc;
  border-top: none;
  color: black;
  background-color: #ffffff;
  font-family: 'Inter', Arial, sans-serif;
  font-weight: lighter;
}

</style>
