import { defineStore } from 'pinia'
import axios from 'axios'

interface LaundryEntry {
  id: string, // 2022-08-17_time_washing-machine-number
  time: string, // 00:00-02:00
  wmn: number, // 1-6
  date: string, // 2022-08-17
  username: string, // Тимур Селин
  userId?: string //12345678
  status: "active" | "closed" | "passed"
}

export const useLaundryStore = defineStore('LaunryStore', {
  state: () => ({
    entries: [] as LaundryEntry[],
    entriesByDay: [] as LaundryEntry[]
  }),
  getters: {
  },
  actions: {
    getEntryAmount(username: string): number {
      return (this.entries.filter((entry: LaundryEntry) => entry.username === username)).length
    },
    async fill(date: string) {
      function computePassed(entriesByDay: LaundryEntry[]): LaundryEntry[] {
        const output = entriesByDay.forEach((entry: LaundryEntry) => {
          if (new Date(entry.date + ' ' + entry.time.split(' - ')[0]) <= new Date()) {
            entry.status = "passed"
          }
        })
        console.log(output);
        
      }
        // const entries = await axios.get("/api/entries")
        // .then(res => res.data)
        // .catch(e => console.error(e))
        
        this.entriesByDay = this.entries.filter((entry: LaundryEntry) => entry.date === date)
    },

    async addEntry(entry: LaundryEntry) {
      // this.entries = await axios.post("/api/entries", {
      //   ...entry
      // }, {
      //   headers: {
      //     'Content-Type': 'application/json'
      //   }
      // })
      // .then(res => res.data)
      // .catch(e => console.error(e))

      this.entries.push(entry)
      console.log(this.entries);
      
    },
    async deleteEntry(entry: LaundryEntry) {
      // this.entries = await axios.delete("/api/entries/" + id)
      // .then(res => res.data)
      // .catch(e => console.error(e))
      
      this.entries = this.entries.filter(obj => {return obj.id != entry.id})
    }
  }
})