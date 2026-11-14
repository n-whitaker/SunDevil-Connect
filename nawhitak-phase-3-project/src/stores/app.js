// Utilities
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    clubID: null,
    eventID: null,
  }),
  getters: {
    getClubID: state => state.clubID,
    getEventID: state => state.eventID,
  },
  actions: {
    setClubID (id) {
      this.clubID = id
    },
    setEventID (id) {
      this.eventID = id
    },
  },
})
